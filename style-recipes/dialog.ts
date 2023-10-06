import { defineSlotRecipe } from '@pandacss/dev';

export const dialogRecipe = defineSlotRecipe({
	slots: ['root', 'header', 'content', 'footer', 'background'],
	className: 'dialog',
	base: {},
	variants: {},
	defaultVariants: {},
});
