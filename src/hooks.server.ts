import handleAuth from '$lib/auth/hook.server';
import handleAvailableLanguageTag from '$lib/i18n/handle.server';
import handleMode from '$lib/modes/handle.server';
import handleSetout from '$lib/setout/hook.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handleAvailableLanguageTag, handleMode, handleAuth, handleSetout);
