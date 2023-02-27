<!-- 
	@component
	## Button Group
	Groups multiple buttons into a single, visually segmented, button.
	Useful for dropdown arrows, "More options" buttons, or functionally/semantically neighboring butons.
	
 -->
<script lang="ts" context="module">
	const CTX_KEY = 'button-group-context';

	interface ButtonGroupContext {
		variant: Readable<ComponentProps<Button>['variant']>;
		direction: 'row' | 'column';
	}

	export function getButtonGroupContext() {
		return getContext<ButtonGroupContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { VARIANTS } from '$utils/enums';
	import { getContext, setContext, type ComponentProps } from 'svelte';
	import { writable, type Readable } from 'svelte/store';
	import type Button from './Button.svelte';

	export let variant: ComponentProps<Button>['variant'] = VARIANTS.Default;
	export let direction: ButtonGroupContext['direction'] = 'row';

	const _variant = writable(variant);

	setContext<ButtonGroupContext>(CTX_KEY, {
		variant: { subscribe: _variant.subscribe },
		direction,
	});
</script>

<div class="button-group {direction}" role="button">
	<slot />
</div>

<style lang="scss">
	@use './ButtonGroup.scss';
</style>
