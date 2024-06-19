<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { Files, Tags } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

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
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/types')}>
			{m.project_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/interventions')}>
			{m.project_intervention_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors/indicators')}>
			{m.project_indicators()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes('/edit/projects/descriptors/ownerships')}
			aria-disabled
		>
			{m.project_ownership_types()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes('/edit/projects/descriptors/implantations')}
			aria-disabled
		>
			{m.project_implantations()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes('/edit/projects/descriptors/levels')}
			aria-disabled
		>
			{m.project_levels()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes('/edit/projects/descriptors/images')}
			aria-disabled
		>
			{m.project_images()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.projects()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes('/edit/projects')}>
			<Files class="button-icon" />
			{m.my_projects()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.organizations()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes('/edit/organizations')}>
			<Files class="button-icon" />
			{m.my_orgs()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes('/edit/organizations/descriptors')}>
			<Tags class="button-icon" />
			{m.organization_descriptors()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
{/snippet}

{@render children()}
