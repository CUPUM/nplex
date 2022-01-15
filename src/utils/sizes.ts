export const sizes = {
	xxs: 8,
	xs: 10,
	sm: 12,
	md: 15,
	lg: 19,
	xl: 23,
	xxl: 29,
	xxxl: 37
};

export const cssSizes =
	Object.entries(sizes)
		.map(([name, val]) => `--size-${name}: ${val}px`)
		.join('; ') + '; ';
