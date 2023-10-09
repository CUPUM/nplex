<script lang="ts">
	export let centered: boolean = false;
</script>

<section class:centered>
	<slot />
</section>

<style lang="postcss">
	section {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-self: stretch;
		border-bottom: var(--base-border-size) solid
			color-mix(in srgb, var(--color-neutral-500) 15%, transparent);
	}

	.centered {
		align-items: center;
	}
</style>
