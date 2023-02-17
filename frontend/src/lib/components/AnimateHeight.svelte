<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let overflow: 'hidden' | 'visible' = 'visible';
	export let options: Parameters<typeof tweened<number>>[1] = {
		duration(from, to) {
			return Math.abs(to - from) / 5 + 150;
		},
		easing: expoOut,
	};

	const clientHeight = tweened<number>(0, options);
</script>

<div style:overflow-y={overflow} style:height="{$clientHeight}px">
	<div class="wrap" bind:clientHeight={$clientHeight}>
		<slot />
	</div>
</div>

<style lang="scss">
	div {
		position: relative;
	}
</style>
