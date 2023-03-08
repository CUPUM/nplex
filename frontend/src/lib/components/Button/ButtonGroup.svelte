<!-- 
	@component
	## Button Group
	Groups multiple buttons into a single, visually segmented, button.
	Useful for dropdown arrows, "More options" buttons, or functionally/semantically neighboring butons.
	
 -->
<script lang="ts" context="module">
	const BUTTON_ATTRIBUTE = 'data-button-group';

	// interface ButtonGroupContext {
	// 	// variant: Readable<ComponentProps<Button>['variant']>;
	// 	// orientation: Orientation;
	// 	// direction: Direction;
	// 	// groupElement: (buttonElement: HTMLElement) => void;
	// }

	// export function getButtonGroupContext(key: Symbol) {
	// 	return getContext<ButtonGroupContext>(key);
	// }
</script>

<script lang="ts">
	import { DIRECTIONS, ORIENTATIONS, type Direction, type Orientation } from '$utils/enums';
	import { onDestroy, onMount } from 'svelte';

	export let orientation: Orientation = ORIENTATIONS.Row;
	export let direction: Direction = DIRECTIONS.Normal;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;

	// const _variant = writable(variant);
	// const key = Symbol('button-group-context');

	let buttonGroupRef: HTMLElement;
	let observer: MutationObserver;

	function updateAttributes(records?: MutationRecord[]) {
		let buttons = [...buttonGroupRef.querySelectorAll(':scope > .button, :scope > * > .button')];
		if (records) {
			// Possible to use record instead of querying?
		} else {
			// buttons.push(...buttonGroupRef.querySelectorAll(':scope > .button, :scope > * > .button'));
		}
		buttons.forEach((el, i) => {
			let attr = [];
			if (i === 0) {
				attr.push('start');
			}
			if (i === buttons.length - 1) {
				attr.push('end');
			}
			el.setAttribute(BUTTON_ATTRIBUTE, attr.join(' '));
		});
	}

	// setContext<ButtonGroupContext>(key, {
	// 	variant: { subscribe: _variant.subscribe },
	// 	orientation,
	// 	direction,
	// 	// groupElement,
	// });

	onMount(() => {
		observer = new MutationObserver(updateAttributes);
		observer.observe(buttonGroupRef, { childList: true });
		updateAttributes();
	});

	onDestroy(() => {
		observer?.disconnect();
	});
</script>

<div
	bind:this={buttonGroupRef}
	class="button-group {className} {orientation} {direction}"
	{style}
	role="button"
>
	<slot />
</div>

<style lang="scss">
	@use './ButtonGroup.scss';
</style>
