/**
 * For reference, try ColorBox:
 * https://colorbox.io/?c0=%26p%24s%24%3D5%26p%24h%24st%24%3D130%26p%24h%24e%24%3D165%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.4%26p%24sa%24e%24%3D0.9%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.4%26p%24b%24c%24%3Dl%26o%24n%24%3Dprimary%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c1=%26p%24s%24%3D5%26p%24h%24st%24%3D52%26p%24h%24e%24%3D45%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.6%26p%24sa%24e%24%3D0.9%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Dl%26p%24b%24st%24%3D0.98%26p%24b%24e%24%3D0.7%26p%24b%24c%24%3Deqi%26o%24n%24%3Dsecondary%26o%24ro%24%3Dccw%26o%24ms%24%3D%5B%5D&c2=%26p%24s%24%3D5%26p%24h%24st%24%3D222%26p%24h%24e%24%3D230%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.25%26p%24sa%24e%24%3D0.5%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqi%26p%24b%24st%24%3D0.35%26p%24b%24e%24%3D0.16%26p%24b%24c%24%3Dl%26o%24n%24%3Ddark%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c3=%26p%24s%24%3D5%26p%24h%24st%24%3D209%26p%24h%24e%24%3D244%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.58%26p%24sa%24e%24%3D0.66%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Decio%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.8%26p%24b%24c%24%3Dl%26o%24n%24%3Dlight%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c4=%26p%24s%24%3D3%26p%24h%24st%24%3D66%26p%24h%24e%24%3D69%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.01%26p%24sa%24e%24%3D0.96%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.07%26p%24b%24c%24%3Dl%26o%24n%24%3Dsuccess+Copy%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c5=%26p%24s%24%3D3%26p%24h%24st%24%3D66%26p%24h%24e%24%3D69%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.01%26p%24sa%24e%24%3D0.96%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.07%26p%24b%24c%24%3Dl%26o%24n%24%3Derror+Copy%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c6=%26p%24s%24%3D3%26p%24h%24st%24%3D66%26p%24h%24e%24%3D69%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.01%26p%24sa%24e%24%3D0.96%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.07%26p%24b%24c%24%3Dl%26o%24n%24%3Dnotice+Copy%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D.
 */

/**
 * Color theme of nplex:
 *
 * - `primary` is the main accent color;
 * - `secondary` is destined for miscellaneous use of secondary importance such as highlights, notification badges, etc.;
 * - `light` provides a light tones palette mostly used for backghrounds and subtle borders;
 * - `dark` provides a dark tones palette mostly used for foregrounds and texts;
 * - `success` is a semantic color used to highlight or indicate successful operations or events;
 * - `error` is a semantic color used to highlight or indicate erronous operations, warnings, etc.
 */
export const colors = {
	primary: {
		100: 'hsl(167, 59%, 69%)',
		300: 'hsl(168, 56%, 61%)',
		500: 'hsl(169, 50%, 53%)',
		700: 'hsl(170, 56%, 43%)',
		900: 'hsl(171, 59%, 34%)',
	},
	secondary: {
		100: 'hsl(18, 96%, 84%)',
		300: 'hsl(18, 93%, 79%)',
		500: 'hsl(18, 87%, 73%)',
		700: 'hsl(18, 84%, 67%)',
		900: 'hsl(18, 75%, 60%)',
	},
	light: {
		100: 'hsl(44, 34%, 98%)',
		300: 'hsl(43, 33%, 94%)',
		500: 'hsl(42, 32%, 90%)',
		700: 'hsl(41, 28%, 85%)',
		900: 'hsl(40, 24%, 80%)',
	},
	dark: {
		100: 'hsl(210, 13%, 49%)',
		300: 'hsl(211, 18%, 39%)',
		500: 'hsl(212, 20%, 31%)',
		700: 'hsl(213, 24%, 21%)',
		900: 'hsl(214, 28%, 14%)',
	},
	success: {
		100: 'hsl(113, 70%, 72%)',
		500: 'hsl(113, 63%, 61%)',
		900: 'hsl(113, 55%, 48%)',
	},
	error: {
		100: 'hsl(2, 76%, 69%)',
		500: 'hsl(2, 64%, 59%)',
		900: 'hsl(2, 60%, 49%)',
	},
};
