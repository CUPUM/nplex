// /**
//  * Provide auto-completion / intellisens for global css variables.
//  */
// export function cssVar<T extends 'a'>(name: T extends 'a' ? TemplateStringsArray : never) {
// 	return `var(${name})` as const;
// }

// // AppCss.

// type CSSVariableName = 'color-primary' | 'color-secondary';

// export function cssvar<T extends Readonly<CSSVariableName>>(variable: T) {
// 	return `var(--${variable})` as const;
// }

// const colorPrimary = cssvar('color-primary');
