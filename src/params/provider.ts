import { isSupportedOAuthProvider } from '$lib/auth/validation';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return isSupportedOAuthProvider(param);
}) satisfies ParamMatcher;
