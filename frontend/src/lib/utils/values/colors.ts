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
		100: 'hsl(157, 48%, 72%)',
		300: 'hsl(156, 50%, 63%)',
		500: 'hsl(155, 54%, 50%)',
		700: 'hsl(157, 66%, 42%)',
		900: 'hsl(158, 79%, 33%)',
	},
	secondary: {
		100: 'hsl(23, 86%, 81%)',
		300: 'hsl(22, 83%, 77%)',
		500: 'hsl(21, 77%, 72%)',
		700: 'hsl(20, 74%, 66%)',
		900: 'hsl(19, 66%, 58%)',
	},
	light: {
		100: 'hsl(80, 20%, 98%)',
		300: 'hsl(95, 18%, 95%)',
		500: 'hsl(110, 15%, 93%)',
		700: 'hsl(125, 12%, 90%)',
		900: 'hsl(140, 11%, 86%)',
	},
	dark: {
		100: 'hsl(49, 5%, 35%)',
		300: 'hsl(50, 6%, 29%)',
		500: 'hsl(51,7%, 21%)',
		700: 'hsl(52,8%, 15%)',
		900: 'hsl(53, 9%, 10%)',
	},
	success: {
		100: 'hsl(83, 71%, 74%)',
		300: 'hsl(83, 72%, 68%)',
		500: 'hsl(83, 73%, 60%)',
		700: 'hsl(83, 74%, 49%)',
		900: 'hsl(83, 80%, 44%)',
	},
	error: {
		100: 'hsl(2, 90%, 78%)',
		300: 'hsl(3, 88%, 72%)',
		500: 'hsl(3, 84%, 66%)',
		700: 'hsl(4, 76%, 59%)',
		900: 'hsl(5, 66%, 50%)',
	},
} as const;
