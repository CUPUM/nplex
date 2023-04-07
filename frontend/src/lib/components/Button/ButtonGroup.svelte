<!-- 
	@component
	## Button Group
	Groups multiple buttons into a single, visually segmented, button.
	Useful for dropdown arrows, "More options" buttons, or functionally/semantically neighboring butons.
	
 -->
<script lang="ts" context="module">
	const BUTTON_ATTRIBUTE = 'data-button-group';
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
	@mixin not-first-group-button {
		&,
		& > :global(*) {
			> :global(.button[data-button-group]:not([data-button-group*='start'])) {
				@content;
			}
		}
	}

	@mixin not-last-group-button {
		&,
		& > :global(*) {
			> :global(.button[data-button-group]:not([data-button-group*='end'])) {
				@content;
			}
		}
	}

	.button-group {
		display: flex;
		gap: 0;
		justify-content: inherit;
		// overflow: visible;

		&.row {
			flex-direction: row;

			@include not-first-group-button {
				border-start-start-radius: 0;
				border-end-start-radius: 0;
				&::before,
				&::after {
					border-inline-start: none;
				}
			}

			@include not-last-group-button {
				border-start-end-radius: 0;
				border-end-end-radius: 0;
			}
		}

		&.column {
			flex-direction: column;

			@include not-first-group-button {
				border-start-start-radius: 0;
				border-start-end-radius: 0;
				&::before,
				&::after {
					border-block-start: none;
				}
			}

			@include not-last-group-button {
				border-end-start-radius: 0;
				border-end-end-radius: 0;
			}
		}
	}
</style>
