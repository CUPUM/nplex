import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USER } from '$env/static/private';
import { createTransport } from 'nodemailer';

/**
 * Nodemailer transporter singleton.
 */
export const transporter = createTransport({
	host: EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});
