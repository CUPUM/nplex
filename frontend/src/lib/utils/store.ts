import { browser } from '$app/environment';
import { readable, writable, type Updater } from 'svelte/store';

/**
 * Writable store with a chronological cumulative memory of keyed values.
 *
 * ! Do not use for frequently updated values !
 */
export function writableLedger<T>(init: T, fallback?: T) {
	const store = writable<T | undefined>(init);
	/**
	 * First-in-last-out log of applied theme. Allows returning to previous value and prevents
	 * bindings from canceling one-another when reset/unset.
	 */
	const ledger = new Map<any, T | undefined>();
	function set(key: any, value: T | undefined) {
		ledger.set(key, value);
		store.set(value);
	}
	function unset(key: any) {
		if (ledger.has(key)) {
			ledger.delete(key);
			store.set(ledger.size ? [...ledger][ledger.size - 1][1] : fallback);
		}
	}
	function update(key: any, updater: Updater<T | undefined>) {
		store.update((prev) => {
			const next = updater(prev);
			ledger.set(key, next);
			return updater(next);
		});
	}
	return {
		subscribe: store.subscribe,
		set,
		update,
		unset,
	};
}

export type WritableLedger<T> = ReturnType<typeof writableLedger<T>>;

/**
 * Observe the target element's closest parent with given attribute and return its value.
 */
export function closest<
	A extends string,
	V = A extends keyof svelteHTML.HTMLAttributes
		? svelteHTML.HTMLAttributes[A]
		: string | undefined | null
>(element: Element, attribute: A) {
	const p = element.closest(`[${attribute}]`);
	const init = p?.getAttribute(attribute);
	return readable<V>((init as V) ?? undefined, function start(set) {
		if (!browser || !p) return;
		const observer = new MutationObserver(([m]) => {
			if (m.target instanceof Element) {
				set((m.target.getAttribute(attribute) ?? undefined) as V);
			}
		});
		observer.observe(p, { attributes: true, attributeFilter: [attribute] });
		return function stop() {
			observer.disconnect();
		};
	});
}

export type ClosestReadable<T extends string> = ReturnType<typeof closest<T>>;

// export function closest<A extends string>(element: Element, ...attributes: A[]) {
// 	type ClosestDict = Record<A, string | undefined>;
// 	const dict = attributes.reduce<ClosestDict>((acc, curr) => {
// 		acc[curr];
// 		return acc;
// 	}, {} as ClosestDict);
// 	return readable(dict, function start(set) {
// 		if (!browser) {
// 			return;
// 		}
// 		function getClosest(e: MutationRecord[]) {
// 			e.forEach(r => {
// 				if (r.attributeName && r.attributeName in dict) {
// 					const closest
// 					dict[r.attributeName as A] = element.closest
// 				}
// 			})
// 		}
// 		const observer = new MutationObserver(getClosest);
// 		observer.observe(document.documentElement, {
// 			attributes: true,
// 			subtree: true,
// 			attributeFilter: attributes,
// 		});
// 		return function stop() {};
// 	});
// }
