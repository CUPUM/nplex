import handleDatabase from '$lib/database/handle.server';
import { handlei18n } from '$lib/i18n/handle.server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handlei18n, handleDatabase);
