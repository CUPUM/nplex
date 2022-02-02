export const sizes = {
	xxxsmall: 8,
	xxsmall: 10,
	xsmall: 12,
	small: 14,
	medium: 16,
	large: 20,
	xlarge: 28,
	xxlarge: 40,
	xxxlarge: 56
};

export const cssSizes =
	Object.entries(sizes)
		.map(([name, val]) => `--size-${name}: ${val}px`)
		.join('; ') + '; ';
