import { writable } from 'svelte/store';

export interface Message {
	text: string;
	/**
	 * Message's lifespan, set to 0 for indefinite.
	 */
	timer?: number;
	type?: 'error' | 'success' | 'default';
}

const messageDefault: Message = {
	text: null,
	timer: 4000,
	type: 'default',
};

/**
 * App-wide store containing a set of messages dispatched from anywhere in the app. This store's contents are displayed
 * in the root layout through the MessageOutlet component.
 */
export const messages = (function () {
	const { subscribe, set, update } = writable<Message[]>([]);
	const timeouts: Map<Message, ReturnType<typeof setTimeout>> = new Map();

	function clear(message: Message) {
		update((curr) => {
			if (timeouts.has(message)) {
				clearTimeout(timeouts.get(message));
			}
			return curr.filter((m) => m !== message);
		});
	}

	function clearAll() {
		timeouts.clear();
		set([]);
	}

	function dispatch(message: Message) {
		message = { ...messageDefault, ...message };
		if (message.timer) {
			timeouts.set(
				message,
				setTimeout(() => clear(message), message.timer)
			);
		}
		update((curr) => [...curr, message]);
	}

	return {
		subscribe,
		dispatch,
		clear,
		clearAll,
	};
})();
