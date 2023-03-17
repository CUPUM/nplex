<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import EditorBreadcrumbs from '../../EditorBreadcrumbs.svelte';
	import EditorToolbar from '../../EditorToolbar.svelte';
	import type { LayoutData } from './$types';
	import { PROJECT_DESCIPTORS_EDITOR_BASE, PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';

	const links = Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES);
	$: ({ crumbs } = $page.data as LayoutData);
</script>

<EditorBreadcrumbs {crumbs} />
<div class="layout">
	<section class="sidebar">
		<Sidebar variant="outlined">
			<SidebarButton i={0} href={PROJECT_DESCIPTORS_EDITOR_BASE.pathname}>
				<Icon slot="leading" name="home" />Descripteurs
			</SidebarButton>
			<hr />
			{#each links as link, i}
				<SidebarButton i={i + 1} href={link.pathname}>{link.label}</SidebarButton>
			{/each}
		</Sidebar>
	</section>
	<section class="main">
		<slot />
	</section>
</div>
<EditorToolbar />

<style lang="scss">
	.layout {
		align-self: stretch;
		display: flex;
		flex-direction: row;
		gap: var(--ui-gutter);
	}

	.sidebar {
		// grid-column: sidebar;
		flex: none;
	}

	.main {
		flex: 1;
	}
</style>
