import type { ValueOf } from 'type-fest';

export const VIEW_TYPES = {
	Editing: 'editing',
	Draft: 'draft'
} as const;

export type ViewType = ValueOf<typeof VIEW_TYPES>;

export const VIEW_TYPES_ARR = Object.values(VIEW_TYPES);