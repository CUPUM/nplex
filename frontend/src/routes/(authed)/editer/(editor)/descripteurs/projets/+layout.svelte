<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import EditorCrumbs from '../../EditorCrumbs.svelte';
	import type { LayoutData } from './$types';
	import { PROJECT_DESCIPTORS_EDITOR_BASE, PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';

	const links = Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES);
	$: ({ crumbs } = $page.data as LayoutData);
</script>

<EditorCrumbs {crumbs} />
<div class="layout">
	<section class="sidebar">
		<Sidebar>
			<SidebarButton href={PROJECT_DESCIPTORS_EDITOR_BASE.pathname}>
				<Icon slot="leading" name="home" />Descripteurs
			</SidebarButton>
			<hr />
			{#each links as link}
				<SidebarButton href={link.pathname}>{link.label}</SidebarButton>
			{/each}
		</Sidebar>
	</section>
	<section class="main">
		<slot />
	</section>
</div>

<style lang="scss">
	.layout {
		// display: grid;
		// grid-template-columns:
		// 	[full-start sidebar-start]
		// 	1fr
		// 	[sidebar-end main-start main-primary-start]
		// 	minmax(auto, var(--ui-width-main))
		// 	[main-primary-end main-secondary-start]
		// 	1fr
		// 	[main-secondary-end main-end full-end];
		align-self: stretch;
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
	}

	.sidebar {
		// grid-column: sidebar;
		flex: none;
	}

	.main {
		flex: 1;
	}
</style>
