import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { SearchParam } from '$utils/keys';
import { derived } from 'svelte/store';

export const authModal = (function () {
	const { subscribe } = derived(page, ($page) => {
		if (browser) {
			return $page.url.searchParams.has(SearchParam.AuthModal);
		}
		return false;
	});

	return {
		subscribe,
		close: async () => {
			if (browser) {
				const params = new URLSearchParams(location.search);
				params.delete(SearchParam.AuthModal);
				return await goto(`?${params.toString()}`, { replaceState: true });
			}
		},
	};
})();
