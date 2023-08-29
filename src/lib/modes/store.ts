import { page } from '$app/stores';
import { writable, type Updater } from 'svelte/store';
import { MODES, MODE_ATTRIBUTE, type Mode } from './constants';
import { getModeCookie, setModeCookie } from './cookie';

/**
 * Client-side store to keep track of and update cookie value.
 */
export const mode = (function () {
	// Init with page.data.mode value
	const init = getModeCookie();

	// Keep an internal state
	const store = writable(init, function start(_set) {
		// Keeping track of server-side initiated mode change (who knows).
		const unsub = page.subscribe((d) => {
			_set(d.data.mode);
		});
		_set(getModeCookie());
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
		console.log('toggle mode!');
		update((v) => (v === MODES.DARK ? MODES.LIGHT : MODES.DARK));
	}

	return {
		subscribe: store.subscribe,
		set,
		update,
		toggle,
	};
})();
