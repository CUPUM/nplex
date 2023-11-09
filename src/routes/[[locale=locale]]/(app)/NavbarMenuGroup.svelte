<script lang="ts">
	export let legend: string | undefined = undefined;
</script>

<section class="navbar-menu-group">
	{#if legend}
		<span class="navbar-menu-legend">{legend}</span>
	{/if}
	<slot />
</section>

<style lang="postcss">
	.navbar-menu-group {
		position: relative;
		display: flex;
		flex-direction: column;
		padding-bottom: calc(2 * var(--menu-inset));
		padding-inline: var(--menu-inset);
		margin-block: var(--menu-inset);
		:global(:--dark) & {
		}

		&:not(:last-child) {
			&::after {
				content: '';
				position: absolute;
				left: calc(-1 * var(--menu-inset));
				right: calc(-1 * var(--menu-inset));
				bottom: 0;
				opacity: 0.1;
				border-bottom: var(--base-border-size) solid var(--color-neutral-500);
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
		/* margin-inline: 0.5rem; */
		margin-bottom: 1em;
		border-radius: var(--radius-full);
		background-color: color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
	}
</style>
