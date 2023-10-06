import { defineSlotRecipe } from '@pandacss/dev';

export const toggleRecipe = defineSlotRecipe({
	slots: ['root', 'trigger', 'thumb', 'label'],
	className: 'toggle',
	base: {},
	variants: {},
	defaultVariants: {},
});
