<!--
	@component
	# Animate
	Tween the dimensions of a container with changing content to smooth out UI jumps.
-->
<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { tweened, type Spring, type Tweened } from 'svelte/motion';

	export let overflow: 'hidden' | 'visible' = 'visible';
	export let motion: Spring<number> | Tweened<number> = tweened<number>(undefined, {
		duration(from, to) {
			return Math.abs(to - from) / 5 + 150;
		},
		easing: expoOut,
	});
</script>

<div style:overflow-y={overflow} style:height="{$motion}px">
	<div class="wrap" bind:clientHeight={$motion}>
		<slot />
	</div>
</div>

<style lang="scss">
	div {
		position: relative;
	}
</style>
