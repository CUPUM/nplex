<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import DashboardSidebarMenuOrganizations from '../../../dashboard-sidebar-menu-organizations.svelte';
	import DashboardSidebarMenuProjects from '../../../dashboard-sidebar-menu-projects.svelte';

	let { children, data } = $props();

	const { setSidebar } = getDashboardContext(true);

	setSidebar(sidebar);
</script>

{#snippet sidebar()}
	<DashboardSidebarMenu {...linkAttributes('/edit/projects/descriptors')}>
		{#snippet legend()}
			{m.project_descriptors()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/types')}>
			{m.project_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/interventions')}>
			{m.project_intervention_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/exemplarity')}>
			{m.project_markers()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/site-ownerships')}>
			{m.project_ownership_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/buildings')}>
			{m.building_metadata()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/images')}>
			{m.image_metadata()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenuProjects />
	<DashboardSidebarMenuOrganizations />
{/snippet}

{@render children()}
