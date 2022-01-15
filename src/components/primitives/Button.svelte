<script context="module" lang="ts">
	export type Type = 'primary' | 'secondary' | 'misc';
	export type Size = 'small' | 'medium' | 'large';
</script>

<script lang="ts">
	export let type: Type = 'primary';
	export let size: Size = 'medium';
	export let icon: string = null;
	export let round: boolean = false;
</script>

<button class="{type} {size}">
	<slot />
	{#if !$$slots.default || round}
		<span>button should be round</span>
	{/if}
</button>

<style>
	button {
		background-color: palegreen;
	}

	/* Do postcss stuff to style different sizes and etc. */
</style>
