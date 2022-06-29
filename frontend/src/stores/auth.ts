import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { SearchParams } from '$utils/keys';
import { derived, writable } from 'svelte/store';

export const authModal = (function () {
	const { subscribe } = derived(page, ($page) => {
		if (browser) {
			return $page.url.searchParams.has(SearchParams.AuthModal);
		}
		return false;
	});

	return {
		subscribe,
		close: async () => {
			if (browser) {
				const params = new URLSearchParams(location.search);
				params.delete(SearchParams.AuthModal);
				return await goto(`?${params.toString()}`, { replaceState: true });
			}
		},
	};
})();

export const authMessage = writable<string>(null);
