import { browser } from '$app/environment';
import { debounce } from '$utils/modifiers';
import { get, readable, writable, type Updater } from 'svelte/store';
import type { Awaited } from 'ts-essentials';

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

// type FetchStore<Q, R> = Writable<{
// 	/**
// 	 * The input query.
// 	 */
// 	query: Q;
// 	/**
// 	 * Indicates if the store is currently awaiting data from a request.
// 	 */
// 	loading: boolean;
// 	/**
// 	 * Indicates if the request failed.
// 	 */
// 	error: boolean | any;
// 	/**
// 	 * Indicates if the request succeeded and new data was populated.
// 	 */
// 	success: boolean;
// 	/**
// 	 * Returned data kept up to date.
// 	 */
// 	data?: R | null;
// }> & {
// 	refresh: () => Promise<R> | PromiseLike<R>;
// };

/**
 * Create a writable that handles a given input query using a given fetching function.
 */
export function fetchStore<Q, F extends (query: Q) => Promise<any> | PromiseLike<any>>(
	/**
	 * Writable's initial query input, if any.
	 */
	init: Q,
	/**
	 * Use the query value and fetch data.
	 */
	fetcher: F,
	/**
	 * Debounce reactivity to query input changes to avoid request flood when bound to high frequency
	 * trigger such as an input element's value.
	 */
	debounceTime = 250,
	/**
	 * Should the data be cleared when a new request is initiated or should it be held onto until a
	 * response is received?
	 */
	staleWhileLoading = true,
	/**
	 * Should the stale data be cleared whenever a request fails?
	 */
	staleOnError = true
) {
	type FetchStoreValue = {
		/**
		 * The input query.
		 */
		query: Q;
		/**
		 * Indicates if the store is currently awaiting data from a request.
		 */
		loading: boolean;
		/**
		 * Indicates if the request failed.
		 */
		error: boolean | any;
		/**
		 * Indicates if the request succeeded and new data was populated.
		 */
		success: boolean;
		/**
		 * Returned data kept up to date.
		 */
		data: Awaited<ReturnType<F>> | null;
	};
	/**
	 * Base store used to keep track of request states and reactive query input value.
	 */
	const store = writable<FetchStoreValue>(
		{
			query: init,
			loading: false,
			error: false,
			success: false,
			data: null,
		},
		function start(set) {
			const q = get(store).query;
			if (q != null) {
				immediateFetcher(q);
			}
			return function stop() {
				// if (browser) {
				// 	cached = get(store);
				// }
			};
		}
	);
	/**
	 * Wrapped fetcher keeping the base store in sync.
	 */
	async function immediateFetcher(q: Q) {
		// Set the pending states.
		store.update((v) => {
			return {
				...v,
				loading: true,
				error: staleWhileLoading ? v.error : false,
				success: staleWhileLoading ? v.success : false,
				data: staleWhileLoading ? v.data : null,
			};
		});
		// Initiate the request and keep track of response.
		try {
			await fetcher(q).then((res) => {
				store.update((v) => {
					return {
						...v,
						loading: false,
						success: true,
						error: false,
						data: res ?? null,
					};
				});
			});
		} catch (err) {
			store.update((v) => {
				return {
					...v,
					loading: false,
					success: false,
					error: err ?? true,
					data: staleOnError ? v.data : null,
				};
			});
		}
	}
	/**
	 * Debounced fetcher wrapper.
	 */
	const debouncedFetcher = debounce((q: Q) => {
		immediateFetcher(q);
	}, debounceTime);
	/**
	 * Exposed store update method.
	 */
	function _update(updater: Updater<FetchStoreValue>) {
		// console.log('updating');
		store.update((v) => {
			debouncedFetcher(v.query);
			return updater(v);
		});
	}
	/**
	 * Exposed store set method.
	 */
	function _set(v: FetchStoreValue) {
		// console.log('setting');
		_update((prev) => {
			return {
				...prev,
				...v,
			};
		});
	}
	/**
	 * Manually force a refreshing of the store's data.
	 */
	function refresh() {
		const q = get(store).query;
		immediateFetcher(q);
	}
	return {
		subscribe: store.subscribe,
		update: _update,
		set: _set,
		refresh,
	};
}

export type WritableLedger<T> = ReturnType<typeof writableLedger<T>>;

/**
 * Observe the target element's closest DOM parent with given attribute and return its value.
 */
export function closest<
	A extends string,
	V = A extends keyof svelteHTML.HTMLAttributes
		? svelteHTML.HTMLAttributes[A]
		: string | undefined | null
>(element: Element, attribute: A, fromRoot = false) {
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
