import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { SearchParam } from '$utils/values/keys';
import { derived } from 'svelte/store';
import { mainScroll } from './scroll';

const lockKey = 'auth';

export const authModal = (function () {
	const { subscribe } = derived(page, ($page) => {
		if (browser) {
			const isModal = $page.url.searchParams.has(SearchParam.AuthModal);
			if (isModal) mainScroll.lock(lockKey);
			else mainScroll.unlock(lockKey);
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
				return goto(`?${params.toString()}`, { replaceState: true });
			}
		},
	};
})();
