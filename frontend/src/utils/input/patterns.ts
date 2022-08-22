/**
 * Input validation patterns.
 */
export const patterns = {
	email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
	numberDot: /[0-9]+([\.][0-9]{1,2})?/,
} as const;

/**
 * Validatio pattern-related error messages.
 */
export const patternErrors: Partial<Record<keyof typeof patterns, string>> = {
	email: '',
} as const;
