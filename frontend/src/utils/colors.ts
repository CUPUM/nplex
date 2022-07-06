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
		100: 'hsl(150, 48%, 76%)',
		300: 'hsl(154, 50%, 65%)',
		500: 'hsl(159, 54%, 52%)',
		700: 'hsl(161, 60%, 43%)',
		900: 'hsl(162, 69%, 35%)',
	},
	secondary: {
		100: 'hsl(19, 86%, 81%)',
		300: 'hsl(18, 83%, 77%)',
		500: 'hsl(17, 77%, 72%)',
		700: 'hsl(16, 74%, 66%)',
		900: 'hsl(15, 66%, 58%)',
	},
	light: {
		100: 'hsl(90, 18%, 98%)',
		300: 'hsl(90, 16%, 94%)',
		500: 'hsl(90, 14%, 89%)',
		700: 'hsl(90, 12%, 83%)',
		900: 'hsl(90, 10%, 76%)',
	},
	dark: {
		100: 'hsl(178, 10%, 38%)',
		300: 'hsl(180, 14%, 32%)',
		500: 'hsl(182,18%, 26%)',
		700: 'hsl(184,26%, 18%)',
		900: 'hsl(186, 35%, 12%)',
	},
	success: {
		100: 'hsl(113, 70%, 72%)',
		300: 'hsl(113, 70%, 72%)',
		500: 'hsl(113, 63%, 61%)',
		700: 'hsl(113, 63%, 61%)',
		900: 'hsl(113, 55%, 48%)',
	},
	error: {
		100: 'hsl(3, 90%, 75%)',
		300: 'hsl(3, 86%, 69%)',
		500: 'hsl(3, 80%, 62%)',
		700: 'hsl(3, 72%, 54%)',
		900: 'hsl(3, 64%, 45%)',
	},
};
