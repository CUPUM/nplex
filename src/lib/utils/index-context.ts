import { defineContext } from './context';

/**
 * Helper to create a context allowing keeping track of a component's index in the scope of the
 * parent context setter. Useful for staggered transitions.
 */
export function defineChildIndexContext(key: unknown) {
	const [getChildIndex, setCtx] = defineContext<{ add: () => number; remove: () => void }>(key);
	function setChildIndex() {
		let index = 0; // Not using a store else updates are merged and all child end up with same index.
		setCtx({
			add: () => {
				return index++;
			},
			remove: () => {
				return index--;
			},
		});
	}
	return [getChildIndex, setChildIndex] as const;
}
