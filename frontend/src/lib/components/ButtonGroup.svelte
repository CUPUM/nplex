<!-- 
	@component
	## Button group
	Groups multiple buttons into a single, visually segmented, button.
	Useful for dropdown arrows, "More options" buttons, or functionally/semantically neighboring butons.
 -->
<script lang="ts" context="module">
	const CTX_KEY = 'button-group-context';

	interface ButtonGroupContext {
		variant: Writable<ComponentProps<Button>['variant']>;
	}

	export function getButtonGroupContext() {
		return getContext<ButtonGroupContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext, type ComponentProps } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type Button from './Button.svelte';

	export let direction: 'row' | 'column' = 'row';
	export let variant: ComponentProps<Button>['variant'] = undefined;

	const _variant = writable<typeof variant>();
	$: _variant.set(variant);

	setContext<ButtonGroupContext>(CTX_KEY, {
		variant: _variant,
	});
</script>

<div class="button-group {direction}">
	<slot />
</div>

<style lang="scss">
	.button-group {
		display: flex;
		gap: 0px;
		transition: transform 0.15s ease-out;

		& > :global(.button) {
			&:active,
			&.loading {
				transform: none;
			}
		}
	}

	.row {
		flex-direction: row;
		& > :global(.button) {
			&:not(:first-of-type) {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				margin-left: -1px;
			}
			&:not(:last-of-type) {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}

	.column {
		flex-direction: column;
		& > :global(.button) {
			&:not(:first-of-type) {
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				margin-top: -1px;
			}
			&:not(:last-of-type) {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}
</style>
