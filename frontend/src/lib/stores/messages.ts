import type { ComponentProps } from 'svelte';
import { writable } from 'svelte/store';

type ContentComponent = {
	comp: any;
	props: ComponentProps<any>;
};

export type Message = {
	/**
	 * Text content or component (for more complex composition) to be included within the message box.
	 */
	content: string | ContentComponent;
	/**
	 * Message's lifespan, set to 0 for indefinite, i.e. would only close on user's command.
	 */
	timer?: number;
	/**
	 * Style of message.
	 */
	type?: 'error' | 'success' | 'default';
};

const messageDefault: Message = {
	content: null,
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

	function cancelTimer(message: Message) {
		if (message.timer) {
			update((curr) => {
				if (timeouts.has(message)) {
					clearTimeout(timeouts.get(message));
					const index = curr.indexOf(message);
					if (index > -1) {
						curr[index].timer = 0;
					}
				}
				return curr;
			});
		}
	}

	return {
		subscribe,
		dispatch,
		clear,
		clearAll,
		cancelTimer,
	};
})();
