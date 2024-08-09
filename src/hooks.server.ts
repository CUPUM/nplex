import handleAuth from '$lib/auth/handle.server';
import { i18n } from '$lib/i18n/adapter';
// import handleLang from '$lib/i18n/handle.server';
import handlePresentation from '$lib/presentation/handle.server';
import handleMode from '$lib/theme/handle.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
	i18n.handle({
		langPlaceholder: '%lang%',
		textDirectionPlaceholder: '%dir%',
	}),
	handlePresentation,
	handleMode,
	handleAuth
);
