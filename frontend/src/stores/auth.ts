import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { SearchParamsKeys } from '$utils/url';
import { derived, get, writable } from 'svelte/store';

export const authModal = (function () {
	const { subscribe } = derived(page, ($page) => {
		return $page.url.searchParams.has(SearchParamsKeys.AuthModal);
	});

	return {
		subscribe,
		close: async () => {
			const params = get(page).url.searchParams;
			params.delete(SearchParamsKeys.AuthModal);
			return await goto(`?${params.toString()}`);
		},
	};
})();

export const authMessage = writable<string>(null);
