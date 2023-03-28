<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<div id="editor-crumbs" in:fly={{ y: 6, duration: 350, easing: cubicOut, delay: 150 }}>
	<!-- {#key $page.data.editorBreadcrumbs ?? 'crumbs'} -->
	<Breadcrumbs>
		{#each $page.data.editorBreadcrumbs ?? [] as crumb, i}
			<BreadcrumbsItem href={crumb.href} matcher={crumb.matcher} disabled={crumb.disabled}>
				{crumb.title}
			</BreadcrumbsItem>
			{#if i < ($page.data.editorBreadcrumbs ?? []).length - 1}
				<BreadcrumbsSeparator><Icon name="chevron-right" /></BreadcrumbsSeparator>
			{/if}
		{/each}
	</Breadcrumbs>
	<!-- {/key} -->
</div>

<style lang="scss">
	#editor-crumbs {
		--inset: var(--ui-inset);
		font-size: var(--ui-text-sm);
		position: sticky;
		top: 0;
		width: 100%;
		padding-block: var(--ui-nav-pad);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		z-index: 5;
		font-weight: 500;
		max-width: var(--ui-nav-center-w);
	}
</style>
