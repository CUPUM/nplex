interface Patterns {
	[key: string]: RegExp;
}

export const patterns: Patterns = {
	numberDot: /[0-9]+([\.][0-9]{1,2})?/,
};
