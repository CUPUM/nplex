<script lang="ts">
	import { page } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
</script>

<article>
	{#if $page.data.dashboard?.header}
		<header>Header</header>
	{/if}
	{#if $page.data.dashboard?.breadcrumbs}
		<div class="dashboard-breadcrumbs">Breadcrumbs</div>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<div class="dashboard-sidebar" in:slide={{ axis: 'x' }}>
			<svelte:component this={$page.data.dashboard.sidebar} />
		</div>
	{/if}
	<section in:fade>
		<slot />
	</section>
</article>

<style lang="scss">
	article {
		display: grid;
		grid-template-columns: fit-content(var(--dashboard-sidebar-width)) 1fr;
	}

	header {
		grid-column: 1 / -1;
	}

	.dashboard-breadcrumbs {
		grid-column: 1 / -1;
	}

	.dashboard-sidebar {
		width: var(--dashboard-sidebar-width);
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		@include md {
			align-self: flex-start;
			position: sticky;
			top: var(--navbar-height);
			overflow-x: hidden;
			overflow-y: auto;
			width: var(--sidebar-width);
			// padding: 1.5rem 0;
			flex-direction: column;
		}
	}

	section {
		// --db-bg: var(--color-neutral-50);
		grid-column: 2;
		border-radius: var(--radius-lg) 0 0 var(--radius-lg);
		// border-color: var(--color-neutral-200);
		// border-style: solid;
		// border-width: var(--border-size);
		// border-right: none;
		// background: radial-gradient(at 25% 0%, var(--db-bg) 0%, transparent),
		// 	radial-gradient(at 0% 100%, var(--db-bg) 0%, transparent 50%);
		background-color: var(--color-neutral-50);
		@include dark {
			// --db-bg: var(--color-neutral-800);
			// border-color: var(--color-neutral-800);
			background-color: var(--color-neutral-800);
		}
	}
</style>
