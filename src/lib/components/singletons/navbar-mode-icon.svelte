<script lang="ts">
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { transform } from '$lib/motion/transform';
	import { cubicIn, expoOut } from 'svelte/easing';
</script>

{#key $mode}
	<div
		id="mode-icon"
		in:transform={{
			scale: 0.75,
			rotate: [0, 0, -90],
			duration: 500,
			delay: 150,
			easing: expoOut,
			opacity: 0,
		}}
		out:transform={{
			scale: 0.5,
			rotate: [0, 0, 90],
			duration: 250,
			easing: cubicIn,
			opacity: 0,
		}}
	>
		<svelte:component this={MODES_DETAILS[$mode].icon} />
	</div>
{/key}

<style>
	#mode-icon {
		line-height: 0;
		position: absolute;
		transform-origin: center 200%;
	}
</style>
