// import { EMAIL_USER } from '$env/static/private';

const EMAIL_USER = 'nplex';

export const EMAIL_SENDERS = {
	NPLEX: `"Nplex" <${EMAIL_USER}>`,
} as const;

export const FONT_SANS =
	'"Outfit",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
export const FONT_WEIGHT_BOLD = '550';
export const FONT_WEIGHT_SEMIBOLD = '400';
export const FONT_WEIGHT_REGULAR = '350';
export const COLOR_FG = 'hsl(135,9%,9%)';
export const COLOR_FG_MUTED = 'hsl(135,3%,60%)';
export const COLOR_BG_MUTED = 'hsl(130,2%,85%)';
export const COLOR_BG = 'hsl(140,3%,96%)';
export const COLOR_PRIMARY = 'hsl(145, 96%, 23%)';

export const STYLE_BASE = {
	fontFamily: FONT_SANS,
	fontWeight: FONT_WEIGHT_REGULAR,
	color: COLOR_FG,
	maxWidth: '50ch',
	margin: '2em auto',
	fontSize: '14px',
	lineHeight: '1.333em',
} as const satisfies Partial<CSSStyleDeclaration>;

export const STYLE_H1 = {
	fontFamily: FONT_SANS,
	fontWeight: FONT_WEIGHT_BOLD,
	fontSize: '1.333rem',
	marginBlock: '3rem',
} as const satisfies Partial<CSSStyleDeclaration>;

export const STYLE_H2 = {
	fontFamily: FONT_SANS,
	fontWeight: FONT_WEIGHT_BOLD,
	color: COLOR_PRIMARY,
	marginBlock: '3rem',
} as const satisfies Partial<CSSStyleDeclaration>;

export const STYLE_BUTTON = {
	color: COLOR_FG,
	fontWeight: FONT_WEIGHT_SEMIBOLD,
	padding: '1em 1.25em 1.125em',
	fontSize: STYLE_BASE.fontSize,
	borderRadius: '0.8em',
	background: COLOR_BG_MUTED,
} as const satisfies Partial<CSSStyleDeclaration>;

export const STYLE_BUTTON_CTA = {
	...STYLE_BUTTON,
	background: COLOR_PRIMARY,
	letterSpacing: '0.005em',
	color: COLOR_BG,
} as const satisfies Partial<CSSStyleDeclaration>;
