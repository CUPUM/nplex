<script lang="ts">
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';

	export let crumbs: { title: string; pathname: string }[];
</script>

<div>
	<Breadcrumbs>
		{#each crumbs as crumb, i}
			<BreadcrumbsItem href={crumb.pathname}>{crumb.title}</BreadcrumbsItem>
			{#if i < crumbs.length - 1}
				<BreadcrumbsSeparator />
			{/if}
		{/each}
	</Breadcrumbs>
</div>

<style lang="scss">
	div {
		--inset: var(--ui-inset);
		font-size: var(--ui-text-sm);
		position: sticky;
		top: 0;
		width: 100%;
		height: var(--ui-nav-h);
		padding-top: 1rem;
		padding-bottom: 1.5rem;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		z-index: 5;
		font-weight: 500;
		max-width: var(--ui-nav-center-w);
		// background: var(--editor-bg);
		// border-bottom: 1px solid col(fg, 500, 0.05);
	}
</style>
