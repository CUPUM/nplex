import { navigating, page } from '$app/stores';
import Loading from '$lib/components/Loading.svelte';
import { deriveLink } from '$lib/i18n/link';
import { outroAndDestroy } from '$lib/utils/outro-and-destroy';
import type { Navigation, NavigationTarget } from '@sveltejs/kit';
import { onDestroy, type ComponentProps } from 'svelte';
import type { Action } from 'svelte/action';
import { derived, writable, type Readable } from 'svelte/store';

type LoadableProps<T = { state?: boolean }> = ComponentProps<Loading> & { disable?: boolean } & T;

function createLoadableAction(state: Readable<boolean>, props: ComponentProps<Loading>) {
	const action: Action<HTMLElement, ComponentProps<Loading> | undefined> = (node, actionProps) => {
		let comp: Loading | undefined;
		const unsub = state.subscribe(($state) => {
			if ($state) {
				if (!comp) {
					comp = new Loading({
						intro: true,
						target: node,
						props: actionProps ?? props,
					});
				}
			} else {
				if (comp) {
					// comp.$destroy();
					outroAndDestroy(comp);
					comp = undefined;
				}
			}
		});
		return {
			update(newActionProps) {
				comp && newActionProps && comp.$set(newActionProps);
			},
			destroy() {
				unsub && unsub();
				// We do not use outroAndDestroy here to avoid creating additionnal delay
				// when clearing the host node from the DOM navigations (e.g. before navigations).
				comp && comp.$destroy();
			},
		};
	};
	return action;
}

function deriveLoadable($state: boolean, disable?: boolean) {
	return {
		'data-loading': $state || undefined,
		'disabled': (disable && $state) || undefined,
		'data-disabled': (disable && $state) || undefined,
	};
}

/**
 * Apply a loading state to the host node through data attributes and insert/remove a loading
 * component accordingly.
 */
export const createLoadable = ({ state, disable, ...props }: LoadableProps = {}) => {
	const _state = writable(state);
	/**
	 * Element attributes.
	 */
	const element = derived(_state, ($state) => {
		return deriveLoadable($state, disable);
	});
	const action = createLoadableAction(_state, props);
	return {
		state: _state,
		element: {
			...element,
			action,
		},
	};
};

/**
 * Loadable node based on a given form event submitter.
 *
 * Each instance should only be used with a single node.
 */
export function createLoadableSubmitter({
	submitter,
	...props
}: LoadableProps<{ submitter?: Element | null }> = {}) {
	const _submitter = writable(submitter);
	let _node: HTMLElement | undefined;
	const { state, ...loadable } = createLoadable(props);
	const unsub = _submitter.subscribe(($submitter) => {
		state.set($submitter === _node);
	});
	const action: Action<HTMLElement, ComponentProps<Loading> | undefined> = (node, actionProps) => {
		_node = node;
		return loadable.element.action(node, actionProps);
	};
	onDestroy(() => {
		unsub && unsub();
	});
	return {
		...loadable,
		element: {
			...loadable.element,
			action,
		},
		submitter: _submitter,
	};
}

function getNodeFormaction(node: HTMLElement) {
	if ('formaction' in node && node.formaction != null) {
		return String(node.formaction);
	}
	if (!('form' in node && node.form instanceof HTMLFormElement)) {
		return undefined;
	}
	return node.form.action;
}

function getFormactionString(formaction?: URL | string | null) {
	if (formaction instanceof URL) {
		return formaction.toString();
	}
	return formaction;
}

function matchFormactionString(formaction?: string | null, nodeFormaction?: string) {
	return nodeFormaction && formaction ? formaction.endsWith(nodeFormaction) : false;
}

/**
 * Apply loading state based on weather the host node's declared formaction corresponds to the
 * current loading formaction.
 *
 * @example <button type="submit" {...$attributes('?/deleteImage)} use:action />
 */
export function createLoadableFormaction({
	formaction,
	disable,
	...props
}: LoadableProps<{ formaction?: URL | string | null }> = {}) {
	const _formaction = writable(formaction);
	const _formactionString = derived(_formaction, ($formaction) => getFormactionString($formaction));
	const element = derived(_formactionString, ($formactionString) => {
		return function (nodeFormaction: string) {
			const _state = matchFormactionString($formactionString, nodeFormaction);
			return {
				formaction,
				...deriveLoadable(_state, disable),
			};
		};
	});
	const action: Action<HTMLElement, ComponentProps<Loading> | undefined> = (node, actionProps) => {
		const _state = derived(_formactionString, ($formactionString) => {
			const nodeFormaction = getNodeFormaction(node);
			return matchFormactionString($formactionString, nodeFormaction);
		});
		const _action = createLoadableAction(_state, props);
		return _action(node, actionProps);
	};
	return {
		element: {
			...element,
			action,
		},
		formaction: _formaction,
	};
}

type LoadableLinkMatcher = ({ href, to }: { href: string; to: NavigationTarget }) => boolean;

function matchLink(
	navigating: Navigation | null,
	matcher: LoadableLinkMatcher,
	href: Parameters<LoadableLinkMatcher>[0]['href']
) {
	if (!navigating?.to) {
		return false;
	}
	return matcher({ href, to: navigating.to });
}

/**
 * Apply loading state based on weather the host node's declared formaction corresponds to the
 * current loading formaction.
 *
 * @example <a {...$attributes('/about')} use:action />
 */
export function createLoadableLink({
	matcher = ({ href, to }) => to.url.pathname === href,
	disable,
	...props
}: LoadableProps<{ matcher?: LoadableLinkMatcher }> = {}) {
	const element = derived([navigating, page], ([$navigating, $page]) => {
		const _link = deriveLink($page);
		return function <H extends string>(...params: Parameters<typeof _link<H>>) {
			const _state = matchLink($navigating, matcher, params[0]);
			return {
				..._link(...params),
				...deriveLoadable(_state, disable),
			};
		};
	});
	const action: Action<HTMLAnchorElement, ComponentProps<Loading> | undefined> = (
		node,
		actionProps
	) => {
		const _state = derived(navigating, ($navigating) => {
			return matchLink($navigating, matcher, node.href);
		});
		const _action = createLoadableAction(_state, props);
		return _action(node, actionProps);
	};
	return {
		element: {
			...element,
			action,
		},
	};
}
