<script lang="ts">
	import { colors } from '$utils/colors';
	import { fade } from 'svelte/transition';

	export let type: 'logo' | 'default' = 'default';
	export let background: string = colors.light[500];
</script>

<div
	style:background-color={background}
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
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
