import type { Action } from 'svelte/action';

type ActionsArray<T extends [Action, unknown][] | [Action, unknown]> = T extends extends [] | [Action, unknown] ? 

export const useActions: Action<Node, [Action, Parameters<Action>][]> = (node, actions) => {
	let used = actions.map(a => a[0])
	return {
		update(parameter) {},
		destroy() {},
	};
};
