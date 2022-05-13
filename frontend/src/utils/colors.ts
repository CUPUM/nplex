/**
 * For reference, try ColorBox:
 * https://colorbox.io/?c0=%26p%24s%24%3D5%26p%24h%24st%24%3D130%26p%24h%24e%24%3D165%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.4%26p%24sa%24e%24%3D0.9%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.4%26p%24b%24c%24%3Dl%26o%24n%24%3Dprimary%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c1=%26p%24s%24%3D5%26p%24h%24st%24%3D52%26p%24h%24e%24%3D45%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.6%26p%24sa%24e%24%3D0.9%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Dl%26p%24b%24st%24%3D0.98%26p%24b%24e%24%3D0.7%26p%24b%24c%24%3Deqi%26o%24n%24%3Dsecondary%26o%24ro%24%3Dccw%26o%24ms%24%3D%5B%5D&c2=%26p%24s%24%3D5%26p%24h%24st%24%3D222%26p%24h%24e%24%3D230%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.25%26p%24sa%24e%24%3D0.5%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqi%26p%24b%24st%24%3D0.35%26p%24b%24e%24%3D0.16%26p%24b%24c%24%3Dl%26o%24n%24%3Ddark%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c3=%26p%24s%24%3D5%26p%24h%24st%24%3D209%26p%24h%24e%24%3D244%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.58%26p%24sa%24e%24%3D0.66%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Decio%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.8%26p%24b%24c%24%3Dl%26o%24n%24%3Dlight%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c4=%26p%24s%24%3D3%26p%24h%24st%24%3D66%26p%24h%24e%24%3D69%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.01%26p%24sa%24e%24%3D0.96%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.07%26p%24b%24c%24%3Dl%26o%24n%24%3Dsuccess+Copy%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c5=%26p%24s%24%3D3%26p%24h%24st%24%3D66%26p%24h%24e%24%3D69%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.01%26p%24sa%24e%24%3D0.96%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.07%26p%24b%24c%24%3Dl%26o%24n%24%3Derror+Copy%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D&c6=%26p%24s%24%3D3%26p%24h%24st%24%3D66%26p%24h%24e%24%3D69%26p%24h%24c%24%3Deqo%26p%24sa%24st%24%3D0.01%26p%24sa%24e%24%3D0.96%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Deqo%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.07%26p%24b%24c%24%3Dl%26o%24n%24%3Dnotice+Copy%26o%24ro%24%3Dcw%26o%24ms%24%3D%5B%5D
 */

/**
 * Color theme of nplex:
 * - `primary` is the main accent color;
 * - `secondary` is destined for miscellaneous use of secondary importance such as highlights, notification badges, etc.;
 * - `light` provides a light tones palette mostly used for backghrounds and subtle borders;
 * - `dark` provides a dark tones palette mostly used for foregrounds and texts;
 * - `success` is a semantic color used to highlight or indicate successful operations or events;
 * - `error` is a semantic color used to highlight or indicate erronous operations, warnings, etc.
 */
export const colors = {
	primary: {
		100: 'hsl(175, 48%, 75%)',
		300: 'hsl(177, 48%, 63%)',
		500: 'hsl(179, 48%, 48%)',
		700: 'hsl(181, 48%, 38%)',
		900: 'hsl(183, 48%, 29%)'
	},
	secondary: {
		100: 'hsl(16, 76%, 78%)',
		300: 'hsl(16, 72%, 72%)',
		500: 'hsl(16, 68%, 66%)',
		700: 'hsl(16, 64%, 59%)',
		900: 'hsl(16, 58%, 52%)',
	},
	light: {
		100: 'hsl(174, 34%, 99%)',
		300: 'hsl(173, 32%, 95%)',
		500: 'hsl(172, 30%, 91%)',
		700: 'hsl(171, 28%, 86%)',
		900: 'hsl(170, 26%, 80%)'
	},
	dark: {
		100: 'hsl(220, 16%, 40%)',
		300: 'hsl(221, 18%, 34%)',
		500: 'hsl(222, 20%, 29%)',
		700: 'hsl(223, 23%, 23%)',
		900: 'hsl(224, 26%, 17%)'
	},
	success: {
		100: 'hsl(103, 70%, 67%)',
		500: 'hsl(103, 53%, 57%)',
		900: 'hsl(103, 45%, 45%)',
	},
	error: {
		100: 'hsl(2, 86%, 69%)',
		500: 'hsl(2, 74%, 59%)',
		900: 'hsl(2, 60%, 49%)',
	}
};
