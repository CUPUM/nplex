<script context="module" lang="ts">
	export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

	export type TooltipOptions = {
		message?: string;
		position: TooltipPosition;
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';

	export let message: TooltipOptions['message'];
</script>

<div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
	{message}
</div>

<style>
	div {
		background-color: red;
	}
</style>
