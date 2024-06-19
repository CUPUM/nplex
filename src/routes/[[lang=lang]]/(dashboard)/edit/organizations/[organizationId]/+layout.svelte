<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ArrowLeft, Eye, UsersRound } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import DashboardSidebarMenuOrganizations from '../../../dashboard-sidebar-menu-organizations.svelte';
	import DashboardSidebarMenuProjects from '../../../dashboard-sidebar-menu-projects.svelte';

	let { children, data } = $props();

	const ctx = getDashboardContext(true);

	ctx.header = header;
	ctx.sidebar = sidebar;

	onDestroy(() => {
		if (ctx.header === header) ctx.header = undefined;
		if (ctx.sidebar === sidebar) ctx.sidebar = undefined;
	});
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
			{m.organization_general()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.organization_settings()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/organizations/${data.id}/sharing`)}>
			<UsersRound class="button-icon" />
			{m.organization_sharing()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/organizations/${data.id}/publishing`)}>
			<Eye class="button-icon" />
			{m.project_visibility()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenuOrganizations />
	<DashboardSidebarMenuProjects />
{/snippet}

{@render children()}
