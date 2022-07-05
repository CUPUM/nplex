import { writable } from 'svelte/store';

export interface Message {
	text: string;
	timer?: number;
	type?: 'error' | 'sucess' | 'default';
}

/**
 * Global app store containing a set of messages dispatched from anywhere in the app. This store's contents are
 * displayed in the root layout through the MessageOutlet component.
 */
export const messages = (function () {
	const { subscribe, set, update } = writable<Message[]>([]);

	const timeouts: Map<Message, ReturnType<typeof setTimeout>> = new Map();

	function clear(message: Message) {
		update((curr) => {
			if (message.timer && timeouts.has(message)) {
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
		if (!message.type) message.type = 'default';
		if (!message.timer) message.timer = 3500;
		timeouts.set(
			message,
			setTimeout(() => clear(message), message.timer)
		);
		update((curr) => [...curr, message]);
	}

	return {
		subscribe,
		dispatch,
		clear,
		clearAll,
	};
})();
