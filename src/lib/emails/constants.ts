import { EMAIL_USER } from '$env/static/private';

export const EMAIL_SENDERS = {
	NPLEX: `"Nplex" <${EMAIL_USER}>`,
} as const;

export const fontFamily =
	'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

export const ACCENT = 'hsl(145, 30%, 40%)';

export const ACCENT_DIM = 'hsla(145, 40%, 45%, 0.15)';
