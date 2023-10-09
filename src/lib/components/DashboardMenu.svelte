<script lang="ts">
</script>

<menu>
	<slot />
</menu>

<style lang="postcss">
	menu {
		position: sticky;
		bottom: 2rem;
		display: flex;
		flex-direction: row;
		align-self: center;
		padding: var(--base-inset);
		border-radius: calc(var(--base-radius) + var(--base-inset));
		margin-inline: 2rem;
		align-items: flex-start;
		justify-content: center;
		gap: 0.5rem;
		font-size: var(--size-sm);
		background-color: color-mix(in srgb, var(--color-neutral-50) 50%, transparent);
		backdrop-filter: blur(8px);
		min-height: calc(var(--base-size) + 2 * var(--base-inset));
		transition: all var(--duration-medium) var(--ease-out-expo);

		:global(:--dark) & {
			background-color: color-mix(in srgb, var(--color-neutral-800) 50%, transparent);
		}

		&:empty {
			opacity: 0;
			transform: translateY(0.5em);
			pointer-events: none;
			transition: all var(--duration-fast) var(--ease-in-expo);
		}

		@container (width > 1200px) {
			margin-inline: 0;
			margin-right: var(--dashboard-navbar);
		}
	}
</style>
