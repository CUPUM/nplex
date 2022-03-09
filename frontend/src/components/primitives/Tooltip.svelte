<script lang="ts">
	import { fade } from 'svelte/transition';

	export let message: string;
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'top';
	export let distance: number = 10;
</script>

<div in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
	{message}
</div>

<style>
	div {
		background-color: red;
	}
</style>
