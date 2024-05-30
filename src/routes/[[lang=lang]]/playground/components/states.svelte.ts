import type { ValueOf } from 'type-fest';

export const SIZE_MODS = {
	Compact: 'compact',
	Normal: '',
	Big: 'big',
} as const;

type SizeMod = ValueOf<typeof SIZE_MODS>;

export let options = $state<{ sizeMod: SizeMod }>({
	sizeMod: SIZE_MODS.Normal,
});
