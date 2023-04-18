import { defineContext } from '$utils/context';
import type { PageData } from './$types';

export const [getOrgContext, setOrgContext] =
	defineContext<PageData['organisation']>('organisation-context');
