import { navigating, page } from '$app/stores';
import Loading from '$lib/components/Spinner.svelte';
import { deriveLink } from '$lib/i18n/link';
import { outroAndDestroy } from '$lib/utils/outro-and-destroy';
import type { Navigation, NavigationTarget } from '@sveltejs/kit';
import type { ComponentProps } from 'svelte';
import type { Action } from 'svelte/action';
import { derived, writable, type Readable } from 'svelte/store';

// Here is a colleciton of custom builders following the basic principles of melt-ui to improve DX
// by ensuring minimal compatibility with melt's preprocessor.
//
// Some particularities include referencing the builder's action inside returned element stores when they are callable functions.
// See https://github.com/melt-ui/melt-ui/issues/100

type LoadableProps<T = { state?: boolean }> = ComponentProps<Loading> & {
	disable?: boolean;
} & T;

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

function deriveLoadable(
	$state: boolean,
	{ disable = true, disabled }: { disable?: boolean; disabled?: boolean } = {}
) {
	return {
		'data-loading': $state || undefined,
		'disabled': disabled || (disable && $state) || undefined,
		'data-disabled': disabled || (disable && $state) || undefined,
	};
}

/**
 * Apply a loading state to the host node through data attributes and insert/remove a loading
 * component accordingly.
 */
export const createLoadable = ({ state, disable, ...props }: LoadableProps = {}) => {
	const _state = writable(state);
	const action = createLoadableAction(_state, props);
	const element = derived(_state, ($state) => {
		return { action, ...deriveLoadable($state, { disable }) };
	});
	return {
		state: _state,
		elements: {
			root: {
				...element,
				action,
			},
		},
	};
};
export type Loadable = ReturnType<typeof createLoadable>;

/**
 * Loadable node based on a given form event submitter. Requires passing a ref to the current node
 * for the attributes. This allows using a single builder per form rather than a single builder per
 * button.
 *
 * @example <button bind:this={someButtonRef} {...$element(someButtonRef)} use:element.action />
 */
export function createLoadableSubmitter({
	submitter,
	disable,
	...props
}: LoadableProps<{ submitter?: Element }> = {}) {
	const _submitter = writable<Element | undefined>(submitter);
	const action: Action<HTMLElement, ComponentProps<Loading> | undefined> = (node, actionProps) => {
		const _state = derived(_submitter, ($submitter) => {
			return $submitter === node;
		});
		const _action = createLoadableAction(_state, props);
		return _action(node, actionProps);
	};
	const element = derived(_submitter, ($submitter) => {
		return function (ref: Element, { disabled }: { disabled?: boolean } = {}) {
			const _state = ref && $submitter === ref;
			return {
				action,
				...deriveLoadable(_state, { disable, disabled }),
			};
		};
	});
	return {
		submitter: _submitter,
		elements: {
			root: {
				...element,
				action,
			},
		},
	};
}
export type LoadableSubmitter = ReturnType<typeof createLoadableSubmitter>;

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
 * @example <button type="submit" {...$element('?/deleteImage)} use:element.action />
 */
export function createLoadableFormaction({
	formaction,
	disable,
	...props
}: LoadableProps<{ formaction?: URL | string }> = {}) {
	const _formaction = writable<URL | string | undefined>(formaction);
	const _formactionString = derived(_formaction, ($formaction) => getFormactionString($formaction));
	const action: Action<HTMLElement, ComponentProps<Loading> | undefined> = (node, actionProps) => {
		const _state = derived(_formactionString, ($formactionString) => {
			const nodeFormaction = getNodeFormaction(node);
			return matchFormactionString($formactionString, nodeFormaction);
		});
		const _action = createLoadableAction(_state, props);
		return _action(node, actionProps);
	};
	const element = derived(_formactionString, ($formactionString) => {
		return function (nodeFormaction: string, { disabled }: { disabled?: boolean } = {}) {
			const _state = matchFormactionString($formactionString, nodeFormaction);
			return {
				action,
				formaction,
				...deriveLoadable(_state, { disable, disabled }),
			};
		};
	});
	return {
		formaction: _formaction,
		elements: {
			root: {
				...element,
				action,
			},
		},
	};
}
export type LoadableFormaction = ReturnType<typeof createLoadableFormaction>;

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
	const element = derived([navigating, page], ([$navigating, $page]) => {
		const _link = deriveLink($page);
		return function <H extends string>(...params: Parameters<typeof _link<H>>) {
			const _state = matchLink($navigating, matcher, params[0]);
			return {
				action,
				..._link(...params),
				...deriveLoadable(_state, { disable }),
			};
		};
	});
	return {
		elements: {
			link: {
				...element,
				action,
			},
		},
	};
}
export type LoadableLink = ReturnType<typeof createLoadableLink>;
