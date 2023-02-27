<script lang="ts">
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';
	import { fly } from 'svelte/transition';

	export let crumbs: { title: string; pathname: string }[];
</script>

<header>
	<div class:hidden={!crumbs.length} in:fly={{ y: 6, delay: 750 }}>
		<Breadcrumbs>
			{#each crumbs as crumb, i}
				<BreadcrumbsItem href={crumb.pathname}>{crumb.title}</BreadcrumbsItem>
				{#if i < crumbs.length - 1}
					<BreadcrumbsSeparator />
				{/if}
			{/each}
		</Breadcrumbs>
	</div>
</header>

<style lang="scss">
	header {
		--inset: var(--ui-inset);
		position: sticky;
		top: 0;
		width: 100%;
		padding-top: calc(1rem - var(--inset));
		padding-bottom: 1.5rem;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		z-index: 5;
		// background: var(--editor-bg);
		// border-bottom: 1px solid col(fg, 500, 0.05);
	}

	div {
		max-width: var(--ui-nav-center-w);
		width: 100%;
		display: flex;
		justify-content: center;

		&.hidden {
			pointer-events: none;
			visibility: hidden;
		}
	}
</style>
