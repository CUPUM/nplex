<script lang="ts">
	import { slide } from '$lib/transitions/slide';
	import { expoOut } from 'svelte/easing';

	let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<header
	in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
	out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
	style:transform="rotateX({Math.min(90, scrollY * 0.25)}deg)"
	style:opacity={Math.max(0, 1 - scrollY * 0.009)}
>
	<slot />
</header>

<style lang="postcss">
	header {
		grid-column: 1 / -1;
		border-radius: inherit;
		z-index: -1;
		transform-origin: center bottom;
		backface-visibility: hidden;
		background: red;
		transition: all 1s var(--ease-out-expo);
	}
</style>
