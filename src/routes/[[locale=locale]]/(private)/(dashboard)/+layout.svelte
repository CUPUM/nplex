<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
</script>

<article>
	{#if $page.data.dashboard?.header}
		<header>Header</header>
	{/if}
	{#if $page.data.dashboard?.breadcrumbs}
		<div class="dashboard-breadcrumbs">Breadcrumbs</div>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<div class="dashboard-sidebar">
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
		@include lg {
			padding-inline: 1rem;
		}
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
		top: var(--navbar-height);
		position: sticky;
		gap: 0.5rem;
		@include md {
			margin-right: 0.5rem;
			align-self: flex-start;
			overflow-x: hidden;
			overflow-y: auto;
			width: var(--dashboard-sidebar-width);
			flex-direction: column;
		}
	}

	section {
		grid-column: 2;
		border-radius: var(--radius-lg);
		background-color: var(--color-neutral-50);
		@include dark {
			background-color: var(--color-neutral-800);
		}
	}
</style>
