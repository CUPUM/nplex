import type { SelectUser } from '$lib/db/crud';
import { dbpool } from '$lib/db/db.server';
import {
	emailVerificationTokens,
	passwordResetTokens,
	type SelectEmailVerificationToken,
} from '$lib/db/schema/accounts';
import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { AUTH_TOKEN_ERRORS } from './constants';

const TOKEN_EXPIRY = 7_200_000; // 2 hours
const TOKEN_MIN_EXPIRY = 3_600_000; // 1hour

/**
 * " Will first check if a verification token already exists for the user. If it does, it will
 * re-use the token if the expiration is over 1 hour away (half the expiration of 2 hours). If not,
 * it will create a new token using generateRandomString() with a length of 63. The length is
 * arbitrary, and anything around or longer than 64 characters should be sufficient (recommend
 * minimum is 40)."
 *
 * @see https://lucia-auth.com/guidebook/email-verification-links/sveltekit
 */
export async function generateEmailVerificationToken(userId: SelectUser['id']) {
	const storedUserTokens = await dbpool
		.select()
		.from(emailVerificationTokens)
		.where(eq(emailVerificationTokens.userId, userId));
	if (storedUserTokens.length) {
		const reusableStoredToken = storedUserTokens.find((tkn) => {
			return isWithinExpiration(Number(tkn.expires) - TOKEN_MIN_EXPIRY);
		});
		if (reusableStoredToken) {
			return reusableStoredToken.id;
		}
	}
	const newToken = generateRandomString(63);
	await dbpool
		.insert(emailVerificationTokens)
		.values({ id: newToken, expires: BigInt(Date.now() + TOKEN_EXPIRY), userId });
	return newToken;
}

/**
 * "Will get the token and delete all tokens belonging to the user (which includes the used token).
 * We recommend handling this in a transaction or a batched query. It thens check the expiration
 * with isWithinExpiration(), provided by Lucia, which checks if the current time is within the
 * provided expiration time (in milliseconds).
 *
 * It will throw if the token is invalid."
 *
 * @see https://lucia-auth.com/guidebook/email-verification-links/sveltekit
 */
export async function validateEmailVerificationToken(token: SelectEmailVerificationToken['id']) {
	const storedToken = await dbpool.transaction(async (tx) => {
		const [stored] = await tx
			.select()
			.from(emailVerificationTokens)
			.where(eq(emailVerificationTokens.id, token));
		if (!stored) {
			throw new Error(AUTH_TOKEN_ERRORS.INVALID);
		}
		await tx
			.delete(emailVerificationTokens)
			.where(eq(emailVerificationTokens.userId, stored.userId));
		return stored;
	});
	const tokenExpires = Number(storedToken.expires);
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error(AUTH_TOKEN_ERRORS.EXPIRED);
	}
	return storedToken.userId;
}

/** @see https://lucia-auth.com/guidebook/password-reset-link/sveltekit */
export async function generatePasswordResetToken(userId: string) {
	const storedUserTokens = await dbpool
		.select()
		.from(passwordResetTokens)
		.where(eq(passwordResetTokens.id, userId));
	if (storedUserTokens.length) {
		const reusableStoredToken = storedUserTokens.find((tkn) => {
			return isWithinExpiration(Number(tkn.expires) - TOKEN_MIN_EXPIRY);
		});
		if (reusableStoredToken) {
			return reusableStoredToken.id;
		}
	}
	const newToken = generateRandomString(63);
	await dbpool.insert(passwordResetTokens).values({
		id: newToken,
		expires: BigInt(Date.now() + TOKEN_EXPIRY),
		userId,
	});
	return newToken;
}

/** @see https://lucia-auth.com/guidebook/password-reset-link/sveltekit */
export async function validatePasswordResetToken(token: string) {
	const storedToken = await dbpool.transaction(async (tx) => {
		const [stored] = await tx
			.select()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.id, token));
		if (!stored) {
			throw new Error('Invalid token');
		}
		await tx.delete(passwordResetTokens).where(eq(emailVerificationTokens.id, stored.id));
		return stored;
	});
	const tokenExpires = Number(storedToken.expires);
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.userId;
}
