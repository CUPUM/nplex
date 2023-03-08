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
		display: flex;
		aspect-ratio: 1;
		align-items: center;
		padding: 2rem;
		color: col(primary, 500);
		background-color: col(primary, 100, 0.1);
		font-weight: 500;
		font-size: var(--ui-text-lg);
		border-radius: var(--ui-radius-lg);
		transition: all 0.1s ease-out;

		&:hover {
			color: col(primary, 700);
			background-color: col(primary, 500, 0.1);
		}
	}
</style>
