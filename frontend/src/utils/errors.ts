const errorCodesMessages = {
	400: 'Impossible!',
	500: '',
} as const;

/**
 * Helper to get a customized (french) message associated with the request's error.code (mostly conceived for use with
 * supabase responses).
 */
export function getErrorMessage(code: keyof typeof errorCodesMessages) {
	return errorCodesMessages[code];
}
