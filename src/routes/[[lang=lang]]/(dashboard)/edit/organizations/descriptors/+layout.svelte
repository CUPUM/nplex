<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { onDestroy } from 'svelte';
	import DashboardSidebarMenuOrganizations from '../../../dashboard-sidebar-menu-organizations.svelte';
	import DashboardSidebarMenuProjects from '../../../dashboard-sidebar-menu-projects.svelte';

	let { children, data } = $props();

	const ctx = getDashboardContext(true);

	ctx.sidebar = sidebar;

	onDestroy(() => {
		if (ctx.sidebar === sidebar) ctx.sidebar = undefined;
	});
</script>

{#snippet sidebar()}
	<DashboardSidebarMenu {...linkAttributes('/edit/projects/descriptors')}>
		{#snippet legend()}
			{m.project_descriptors()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes('/edit/organizations/descriptors/types')}>
			{m.organization_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/organizations/descriptors/expertises')}>
			{m.organization_expertises()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenuOrganizations />
	<DashboardSidebarMenuProjects />
{/snippet}

{@render children()}
