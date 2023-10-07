<script lang="ts">
	import Montreal from './partners-logos/Montreal.svelte';
</script>

<footer>
	<div class="inner">
		<a href="https://montreal.ca/unites/bureau-du-design" class="footer-link">
			<Montreal style="height: 2em" />
		</a>
	</div>
</footer>

<style lang="postcss">
	footer {
		position: relative;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		:global(:--dark) & {
			background-color: var(--color-neutral-950);
		}
	}

	.inner {
		font-size: var(--size-sm);
		padding: 2rem;
		width: 100%;
		max-width: var(--width-lg);
	}

	.footer-link {
		transition: all var(--duration-medium) ease-out;
		&:hover {
			color: var(--color-primary-500);
		}
	}
</style>
