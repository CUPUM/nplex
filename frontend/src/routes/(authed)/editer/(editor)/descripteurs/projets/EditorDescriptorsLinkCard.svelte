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
		align-items: flex-end;
		padding: 2.5rem 3rem;
		color: col(primary, 500);
		background-color: col(primary, 100, 0.1);
		font-weight: 500;
		line-height: 1.2;
		font-size: var(--ui-text-xl);
		border-radius: var(--ui-radius-lg);
		transition: all 0.1s ease-out;

		&:hover {
			color: col(primary, 700);
			background-color: col(primary, 500, 0.1);
		}
	}
</style>
