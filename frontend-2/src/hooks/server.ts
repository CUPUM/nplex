import handleDatabase from '$lib/database/handle';
import handlei18n from '$lib/i18n/handle';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handlei18n, handleDatabase);
