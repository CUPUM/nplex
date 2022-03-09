<script lang="ts">
	import { fade } from 'svelte/transition';

	export let type: 'logo' | 'default' = 'default';
</script>

<div
	in:fade={{
		duration: 150,
	}}
	out:fade={{
		duration: 100,
	}}
	{...$$restProps}
>
	Loading
</div>

<style>
	div {
		user-select: non;
		pointer-events: none;
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
