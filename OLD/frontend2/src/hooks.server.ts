import handleLocale from '$lib/i18n/hook.server';
import { handleTheme } from '$lib/theming/handle';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handleLocale, handleTheme);
