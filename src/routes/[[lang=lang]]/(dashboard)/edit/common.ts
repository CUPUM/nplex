import type { AvailableLanguageTag } from '$i18n/runtime';
import { defineContext } from '$lib/common/context';
import type { Writable } from 'svelte/store';

export const [getEditorLangCtx, setEditorLangCtx] = defineContext<Writable<AvailableLanguageTag>>(
	{}
);
