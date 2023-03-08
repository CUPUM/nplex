<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import type { LayoutData } from './$types';
	import EditorCrumbs from './EditorCrumbs.svelte';
	import EditorHeader from './EditorHeader.svelte';
	import EditorNavigationModal from './EditorNavigationModal.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	$: ({ crumbs } = $page.data as LayoutData);
</script>

<EditorCrumbs {crumbs} />
{#if $$slots.header}
	<EditorHeader>
		<slot name="header" />
	</EditorHeader>
{/if}
<div class="columns">
	<Sidebar>
		<slot name="sidebar" />
	</Sidebar>
	<article>
		<slot />
	</article>
</div>
<EditorToolbar />
<EditorNavigationModal />

<style lang="scss">
	.columns {
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		gap: 1.5rem;
		// padding-top: 1.5rem;
		// padding-top: var(--ui-nav-h);
		scroll-margin-top: calc(-1 * var(--ui-nav-h));

		@include tablet {
			gap: 0;
		}
	}

	article {
		flex: 1;
	}
</style>
