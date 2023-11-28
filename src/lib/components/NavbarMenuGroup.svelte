<section class="navbar-menu-group">
	{#if $$slots.legend}
		<span class="navbar-menu-legend">
			<slot name="legend" />
		</span>
	{/if}
	<ul>
		<slot />
	</ul>
</section>

<style lang="postcss">
	.navbar-menu-group {
		position: relative;
		display: flex;
		flex-direction: column;
		padding-bottom: calc(2 * var(--menu-nesting));
		margin-block: var(--menu-nesting);
		:global(:--dark) & {
		}

		&:not(:last-child) {
			&::after {
				content: '';
				position: absolute;
				left: calc(-1 * var(--menu-nesting));
				right: calc(-1 * var(--menu-nesting));
				bottom: 0;
				opacity: 0.1;
				border-bottom: var(--base-border-width) solid var(--color-neutral-500);
			}
		}
	}

	.navbar-menu-legend {
		align-self: flex-start;
		font-size: var(--size-xs);
		font-weight: 350;
		letter-spacing: 0.05em;
		opacity: 0.5;
		padding: 0.5em 0.75em;
		margin-inline: var(--menu-nesting);
		margin-bottom: 1em;
		border-radius: var(--radius-full);
		background-color: color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
	}

	ul {
		position: relative;
		display: flex;
		flex-direction: column;
		padding-inline: var(--menu-nesting);

		&::before {
			content: '';
			opacity: 0.1;
			position: absolute;
			inset: 0.5em 0;
			border-left: var(--base-border-width) dashed var(--color-neutral-500);
		}
	}
</style>
