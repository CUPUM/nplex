export const sizes = {
	xxsmall: 8,
	xsmall: 10,
	small: 12,
	medium: 14,
	large: 16,
	xlarge: 20,
	xxlarge: 28,
	xxxlarge: 40
};

export const cssSizes =
	Object.entries(sizes)
		.map(([name, val]) => `--size-${name}: ${val}px`)
		.join('; ') + '; ';
