<!-- 
	@component
	## Button group
	Groups multiple buttons into a single, visually segmented, button.
	Useful for dropdown arrows, "More options" buttons, etc.
 -->
<script lang="ts" context="module">
	const CTX_KEY = 'button-group-context';

	export function getButtonGroupContext() {
		return getContext(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, type ComponentProps } from 'svelte';
	import type Button from './Button.svelte';

	export let direction: 'row' | 'column' = 'row';
	export let variant: ComponentProps<Button>['variant'] = 'default';
</script>

<div class="group">
	<slot />
</div>

<style lang="scss">
	.group {
	}
</style>
