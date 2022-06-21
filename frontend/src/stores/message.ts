import { get, writable } from 'svelte/store';

export interface Message {
	text: string;
	timer?: number;
	type?: 'error' | 'sucess' | 'default';
}

const defaultTimer = 3500;

/**
 * Global app store containing a set of messages dispatched from anywhere in the app. This store's contents are
 * displayed in the root layout through the MessageOutlet component.
 */
export const messages = (function () {
	const { subscribe, set, update } = writable<Message[]>([]);

	const timeouts: Map<Message, ReturnType<typeof setTimeout>> = new Map();

	function clear(message: Message) {
		console.log('Index of stored message', get(messages).indexOf(message));
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
		message.type = message.type || 'default';
		timeouts.set(
			message,
			setTimeout(() => clear(message), message.timer || defaultTimer)
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
