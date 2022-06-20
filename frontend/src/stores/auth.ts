import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { SearchParamsKeys } from '$utils/url';
import { derived, writable } from 'svelte/store';

export const authModal = (function () {
	const { subscribe } = derived(page, ($page) => {
		if (browser) {
			return $page.url.searchParams.has(SearchParamsKeys.AuthModal);
		}
	});

	return {
		subscribe,
		close: async () => {
			if (browser) {
				const searchParams = new URLSearchParams(location.search);
				searchParams.delete(SearchParamsKeys.AuthModal);
				return await goto(`?${searchParams.toString()}`, { replaceState: true });
			}
		},
	};
})();

export const authMessage = writable<string>(null);
