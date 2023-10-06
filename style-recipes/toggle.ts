import { defineSlotRecipe } from '@pandacss/dev';

export const toggleRecipe = defineSlotRecipe({
	slots: ['root', 'trigger', 'thumb', 'label'],
	className: 'switch',
	base: {},
	variants: {},
	defaultVariants: {},
});
