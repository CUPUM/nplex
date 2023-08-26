import handleAuth from '$lib/auth/hook.server';
import handleLocale from '$lib/i18n/hook.server';
import handleMode from '$lib/modes/hook.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handleLocale, handleMode, handleAuth);
