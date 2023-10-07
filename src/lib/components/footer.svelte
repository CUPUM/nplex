<script lang="ts">
</script>

<footer>
	<div class="inner"></div>
</footer>

<style lang="postcss">
	footer {
		font-size: var(--size-sm);
		padding: 2rem;
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		border-radius: var(--radius-lg);
		margin: 1rem 0.75rem;
		max-width: 100%;
		:global(:--setout-normal) & {
			max-width: var(--width-lg);
		}
	}

	.inner {
	}
</style>
