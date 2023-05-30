import { browser } from '$app/environment';
import { debounce } from '$utils/modifiers';
import { derived, get, readable, writable, type Updater } from 'svelte/store';
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
export type WritableLedger<T> = ReturnType<typeof writableLedger<T>>;

/**
 * Instanciate two related stores used to track tainting of input fields.
 */
export function createDirtyStores() {
	/**
	 * Map of dirty fields, managed by each formgroup component.
	 */
	const dirtyValues = writable<Record<string, boolean>>({});
	/**
	 * Are there currently any dirty values?
	 */
	const isDirty = derived(dirtyValues, ($dirty) => {
		return !!Object.values($dirty).filter((v) => v).length;
	});
	return {
		dirtyValues,
		isDirty,
	};
}

// /**
//  * Async store
//  */
// export function asyncStore<T>(init: T) {
// 	const store = writable<T>(init);
// }

/**
 * Create a writable that reactively applies a given input query using to a given fetching function.
 * The fetcher doesn't necessarily have to be a window.fetch, it can be any async function that
 * returns data or throws when failing.
 */
export function writableQuery<Q, F extends (query: Q) => Promise<any> | PromiseLike<any>>(
	/**
	 * Writable's initial query input, if any.
	 */
	init: Q,
	/**
	 * Use the query value and pass it to an async handler, for example a data fetching function.
	 */
	handler: F,
	{
		rate = 250,
		limiter = debounce,
		staleWhileLoading = true,
		staleOnError = true,
	}: {
		/**
		 * Limiting the execution rate of the handler.
		 */
		rate?: 250;
		/**
		 * Debounce/throttle reactivity to query input changes based on rate value to avoid request
		 * flood when bound to high frequency trigger such as an input element's value. Accepts any
		 * limiting function.
		 */
		limiter?: (
			f: any,
			rate?: number
		) => {
			(...args: unknown[]): any;
			cancel?: () => void;
		};
		/**
		 * Should the data be cleared when a new request is initiated or should it be held onto until a
		 * response is received?
		 */
		staleWhileLoading?: boolean;
		/**
		 * Should the stale data be cleared whenever a request fails?
		 */
		staleOnError?: boolean;
	} = {}
) {
	type WritableQueryValue = {
		/**
		 * The input query.
		 */
		input: Q;
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
		res: Awaited<ReturnType<F>> | null;
	};
	/**
	 * Base store used to keep track of request states and reactive query input value.
	 */
	const store = writable<WritableQueryValue>(
		{
			input: init,
			loading: false,
			error: false,
			success: false,
			res: null,
		},
		function start(set) {
			const q = get(store).input;
			if (q != null) {
				immediateHandler(q);
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
	async function immediateHandler(q: Q) {
		// Set the pending states.
		store.update((v) => {
			return {
				...v,
				loading: true,
				error: staleWhileLoading ? v.error : false,
				success: staleWhileLoading ? v.success : false,
				res: staleWhileLoading ? v.res : null,
			};
		});
		// Initiate the request and keep track of response.
		try {
			await handler(q).then((res) => {
				store.update((v) => {
					return {
						...v,
						loading: false,
						success: true,
						error: false,
						res: res ?? null,
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
					res: staleOnError ? v.res : null,
				};
			});
		}
	}
	/**
	 * Debounced fetcher wrapper.
	 */
	const limitedHandler = limiter((q: Q) => {
		immediateHandler(q);
	}, rate);
	/**
	 * Exposed store update method.
	 */
	function _update(updater: Updater<WritableQueryValue>) {
		// console.log('updating');
		store.update((v) => {
			limitedHandler(v.input);
			return updater(v);
		});
	}
	/**
	 * Exposed store set method.
	 */
	function _set(v: WritableQueryValue) {
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
		const q = get(store).input;
		immediateHandler(q);
	}
	return {
		subscribe: store.subscribe,
		update: _update,
		set: _set,
		refresh,
	};
}

/**
 * A store to manage upload or download of files through XML Http Requests while keeping track of
 * progress states.
 */
export function writableXhr() {
	// Should return a store with the following shape:
	// {
	// 	data: input source being uploaded (full data) or being downloaded (progressively extended data)
	// 	uploading: boolean;
	// 	downloading: boolean;
	// 	progress: number (percent)
	// 	total: number (byte size)
	// 	loaded: number (byte size)
	// 	success: boolean;
	// 	error: boolean;
	// }
	// Along with following non reactive methods:
	// upload(destinationUrl: string, data?: File or whatever. If present will set store data to this and will upload this. Else will attempt to upload store's current data)
	// download(sourceUrl: string)
}

/**
 * Observe the target element's closest DOM parent with given attribute and return its value.
 */
export function closest<
	A extends string,
	V = A extends keyof svelteHTML.HTMLAttributes<any>
		? svelteHTML.HTMLAttributes<any>[A]
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

/**
 * Ready-to-use text-search store using fuse.js.
 */
export function writableSearch() {}
