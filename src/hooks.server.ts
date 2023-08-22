import handleLocale from '$lib/i18n/hook.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handleLocale);
