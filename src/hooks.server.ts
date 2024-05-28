import handleAuth from '$lib/auth/handle.server';
import handleAvailableLanguageTag from '$lib/i18n/handle.server';
import handleMode from '$lib/modes/handle.server';
import handlePresentation from '$lib/presentation/handle.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
	handleAvailableLanguageTag,
	handlePresentation,
	handleMode,
	handleAuth
);
