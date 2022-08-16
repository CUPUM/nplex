import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { SearchParam } from '$utils/values/keys';
import { derived } from 'svelte/store';
import { mainScroll } from './scroll';

export const authModal = (function () {
	const { subscribe } = derived(page, ($page) => {
		if (browser) {
			const isModal = $page.url.searchParams.has(SearchParam.AuthModal);
			if (isModal) mainScroll.lock();
			else mainScroll.unlock();
			return isModal;
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
