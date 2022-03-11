<script lang="ts" context="module">
	let introtimer;
	let outrotimer;
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let message: string;
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'top';
	export let distance: number = 10;

	onMount(() => {
		// Do stuff to delay intro on first trigger but not during almost-immediately-subsequent triggers
		// ... introtimer on mount and outro timer on destroy
	});

	onDestroy(() => {});
</script>

<div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
	{message}
</div>

<style>
	div {
		background-color: red;
	}
</style>
