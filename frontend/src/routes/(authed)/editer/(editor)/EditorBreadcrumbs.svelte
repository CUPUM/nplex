<script lang="ts">
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';
	import Icon from '$components/Icon.svelte';
	import type { ComponentProps } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let crumbs: {
		title: string;
		pathname: string;
		matcher?: ComponentProps<BreadcrumbsItem>['matcher'];
	}[];
</script>

<div in:fly={{ y: 6, duration: 350, easing: cubicOut, delay: 150 }}>
	<Breadcrumbs>
		{#each crumbs as crumb, i}
			<BreadcrumbsItem href={crumb.pathname} matcher={crumb.matcher}>{crumb.title}</BreadcrumbsItem>
			{#if i < crumbs.length - 1}
				<BreadcrumbsSeparator><Icon name="chevron-right" /></BreadcrumbsSeparator>
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
