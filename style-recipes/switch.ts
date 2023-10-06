import { defineSlotRecipe } from '@pandacss/dev';

export const switchRecipe = defineSlotRecipe({
	slots: ['root', 'trigger', 'thumb'],
	className: 'switch',
	base: {},
	variants: {},
	defaultVariants: {},
});
