<!-- 
	@component
	## Button Group
	Groups multiple buttons into a single, visually segmented, button.
	Useful for dropdown arrows, "More options" buttons, or functionally/semantically neighboring butons.
	
 -->
<script lang="ts" context="module">
	const BUTTON_GROUP_ITEM_ATTR = 'data-button-group';

	interface ButtonGroupContext {
		variant: Readable<ComponentProps<Button>['variant']>;
		orientation: Orientation;
		direction: Direction;
		groupElement: (buttonElement: HTMLElement) => void;
	}

	export function getButtonGroupContext(key: Symbol) {
		return getContext<ButtonGroupContext>(key);
	}
</script>

<script lang="ts">
	import {
		DIRECTIONS,
		ORIENTATIONS,
		VARIANTS,
		type Direction,
		type Orientation,
	} from '$utils/enums';
	import { getContext, setContext, type ComponentProps } from 'svelte';
	import { writable, type Readable } from 'svelte/store';
	import type Button from './Button.svelte';
	export let variant: ComponentProps<Button>['variant'] = VARIANTS.Outlined;
	export let orientation: ButtonGroupContext['orientation'] = ORIENTATIONS.Row;
	export let direction: ButtonGroupContext['direction'] = DIRECTIONS.Normal;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;

	const _variant = writable(variant);
	const key = Symbol('button-group-context');

	let buttonGroupRef: HTMLElement;

	function updateFirstAndLast() {
		if (buttonGroupRef) {
			const items = [...buttonGroupRef.querySelectorAll(`[${BUTTON_GROUP_ITEM_ATTR}]`)];
			items.forEach((el, i) => {
				let val = [];
				if (i === 0) {
					val.push('first');
				}
				if (i === items.length - 1) {
					val.push('last');
				}
				el.setAttribute(BUTTON_GROUP_ITEM_ATTR, val.join(' '));
			});
		}
	}

	function groupElement(element: HTMLElement) {
		element.setAttribute(BUTTON_GROUP_ITEM_ATTR, '');
		updateFirstAndLast();
		return {
			destroy() {
				element.removeAttribute(BUTTON_GROUP_ITEM_ATTR);
				updateFirstAndLast();
			},
		} satisfies SvelteActionReturnType;
	}

	setContext<ButtonGroupContext>(key, {
		variant: { subscribe: _variant.subscribe },
		orientation,
		direction,
		groupElement,
	});
</script>

<div
	bind:this={buttonGroupRef}
	class="button-group {className} {orientation} {direction}"
	{style}
	role="button"
>
	<slot {key} />
</div>

<style lang="scss">
	@use './ButtonGroup.scss';
</style>
