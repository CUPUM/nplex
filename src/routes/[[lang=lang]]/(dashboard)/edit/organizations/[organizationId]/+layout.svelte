<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ArrowLeft, Building, Triangle, Users } from 'lucide-svelte';
	import DashboardSidebarMenuOrganizations from '../../../dashboard-sidebar-menu-organizations.svelte';
	import DashboardSidebarMenuProjects from '../../../dashboard-sidebar-menu-projects.svelte';

	let { children, data } = $props();

	const { setHeader, setSidebar } = getDashboardContext(true);

	setHeader(header);
	setSidebar(sidebar);
</script>

{#snippet header()}
	<div class="bg-card-accent rounded-dashboard p-card-padding flex-1">
		<hgroup>
			<h1 class="heading xl">
				{#if data.name}
					{data.name}
				{:else}
					<span class="fallback">
						{m.organization_unnamed()}
					</span>
				{/if}
			</h1>
		</hgroup>
		<menu>
			<a {...linkAttributes('/edit/organizations')} class="button button-ghost compact">
				<ArrowLeft />
				{m.organizations()}
			</a>
		</menu>
	</div>
{/snippet}

{#snippet sidebar()}
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_essentials()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/organizations/${data.id}`)}>
			<Building />
			{m.organization_general()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/organizations/${data.id}/members`)}>
			<Users />
			{m.organization_members()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.organization_settings()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/organizations/${data.id}/manage`)}>
			<Triangle />
			{m.organization_sharing_and_management()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenuOrganizations />
	<DashboardSidebarMenuProjects />
{/snippet}

{@render children()}
