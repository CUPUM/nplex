<script context="module" lang="ts">
	import type { ValueOf } from 'type-fest';

	/**
	 * Based on grid columns.
	 */
	export const DASHBOARD_CONTENT_ALIGN = {
		CENTER: 'center',
		FULL: 'full',
	} as const;

	type DashboardContentAlign = ValueOf<typeof DASHBOARD_CONTENT_ALIGN>;
</script>

<script lang="ts">
	export let title: string | undefined = undefined;
	export let align: DashboardContentAlign = DASHBOARD_CONTENT_ALIGN.CENTER;
</script>

<section>
	{#if title}
		<header>
			<h3 class="h4">{title}</h3>
		</header>
	{/if}
	<div class="content" style:grid-column={align}>
		<slot />
	</div>
</section>

<style lang="postcss">
	section {
		position: relative;
		display: inherit;
		grid-template-columns: inherit;
		gap: inherit;
		grid-column: full;

		&:not(:last-of-type) {
			border-bottom: var(--base-border-width) solid
				color-mix(in srgb, var(--base-border-color) 50%, transparent);
		}
	}

	header {
		padding: 1rem 2rem;
		grid-column: full;
	}

	.content {
		position: relative;
		display: flex;
		gap: 1.5rem;
		flex-direction: column;
		@media (--md) {
			gap: 1rem;
			padding: 1rem;
		}
		@media (--lg) {
			gap: 1rem;
			padding: 2rem;
		}
	}
</style>
