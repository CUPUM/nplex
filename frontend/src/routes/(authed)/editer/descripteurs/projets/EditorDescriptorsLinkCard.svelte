<script lang="ts">
	import Ripple from '$components/Ripple.svelte';

	export let href: string;
</script>

<a {href}>
	<Ripple />
	<slot />
</a>

<style lang="scss">
	a {
		position: relative;
		display: flex;
		aspect-ratio: 1;
		align-items: flex-start;
		padding: 2rem 3rem;
		color: col(fg, 100);
		background-color: col(bg, 900);
		font-weight: 400;
		line-height: 1.5;
		font-size: var(--ui-text-xl);
		border-radius: var(--ui-radius-xl);
		// border: var(--ui-border-size) dashed col(fg, 100, 0.1);
		transition: all 0.1s ease-out;

		&:hover {
			color: col(fg, 500);
			background-color: col(secondary, 100);
		}
	}
</style>
