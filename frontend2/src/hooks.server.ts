import { handleLocale } from '$lib/i18n/handle';
import { handleTheme } from '$lib/theming/handle';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handleLocale, handleTheme);
