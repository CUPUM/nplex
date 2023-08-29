import { dbpool } from '$lib/db/db.server';
import {
	emailVerificationTokens,
	type SelectEmailVerificationToken,
	type SelectUser,
} from '$lib/db/schema/auth';
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
		const [storedToken] = await tx
			.select()
			.from(emailVerificationTokens)
			.where(eq(emailVerificationTokens.id, token));
		if (!storedToken) {
			throw new Error(AUTH_TOKEN_ERRORS.INVALID);
		}
		await tx
			.delete(emailVerificationTokens)
			.where(eq(emailVerificationTokens.userId, storedToken.userId));
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires);
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error(AUTH_TOKEN_ERRORS.EXPIRED);
	}
	return storedToken.userId;
}
