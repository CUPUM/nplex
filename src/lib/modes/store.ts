import { page } from '$app/stores';
import { derived, writable, type Updater } from 'svelte/store';
import { MODES, MODE_ATTRIBUTE, type Mode } from './constants';
import { getModeCookie, setModeCookie } from './cookie';

function createMode() {
	const init = getModeCookie();

	const dataMode = derived(page, ($page) => {
		return $page.data.mode;
	});

	// Keep an internal state
	const store = writable(init, function start(_set) {
		const start = getModeCookie();
		_set(start);
		// Listening to page data (upstream) to keep track of server-side
		// (or universal load function) initiated mode change (who knows).
		const unsub = dataMode.subscribe((v) => {
			_set(v);
		});
		return function stop() {
			unsub();
		};
	});

	function set(mode: Mode) {
		setModeCookie(mode);
		document.documentElement.setAttribute(MODE_ATTRIBUTE, mode);
		store.set(mode);
	}

	function update(updater: Updater<Mode>) {
		store.update((prev) => {
			const mode = updater(prev);
			setModeCookie(mode);
			document.documentElement.setAttribute(MODE_ATTRIBUTE, mode);
			return mode;
		});
	}

	function toggle() {
		update((v) => (v === MODES.DARK ? MODES.LIGHT : MODES.DARK));
	}

	return {
		subscribe: store.subscribe,
		set,
		update,
		toggle,
	};
}

export const mode = createMode();
