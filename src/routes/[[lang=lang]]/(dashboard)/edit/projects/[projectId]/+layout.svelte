<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { AlertTriangle, Eye, UsersRound } from 'lucide-svelte';
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
				{#if data.title}
					{data.title}
				{:else}
					<span class="fallback">
						{m.project_untitled()}
					</span>
				{/if}
			</h1>
		</hgroup>
		<menu>
			<a {...linkAttributes('/edit/projects')} class="button button-ghost compact">
				{m.projects()}
			</a>
		</menu>
	</div>
{/snippet}

{#snippet sidebar()}
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_essentials()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}`)}>
			{m.project_general()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/place`)}
			aria-disabled="true"
		>
			{m.project_place()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/exemplarity#exemplarity-markers`)}
		>
			{m.project_examplarity()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}/gallery#new-images`)}>
			{m.project_gallery()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_complements()}
		{/snippet}
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/contributions`)}
			aria-disabled="true"
		>
			{m.project_contributions()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/materials`)}
			aria-disabled="true"
		>
			{m.project_materials()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/timeline`)}
			aria-disabled="true"
		>
			{m.project_timeline()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_settings()}
		{/snippet}
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/sharing`)}
			aria-disabled="true"
		>
			<UsersRound class="button-icon" />
			{m.project_sharing()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/publishing`)}
			aria-disabled="true"
		>
			<Eye class="button-icon" />
			{m.project_visibility()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}/security`)} data-danger>
			<AlertTriangle class="button-icon" />
			{m.project_danger_zone()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenuProjects />
	<DashboardSidebarMenuOrganizations />
{/snippet}

{@render children()}

<style>
	:global {
		.project-dashboard-section-header {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: var(--spacing-card-gutter);
			font-size: var(--font-size-sm);
			/* background: var(--background-color-base-dim); */
			border-radius: var(--radius-dashboard);
			padding: var(--spacing-card-padding);

			.dashboard-section-title {
				padding-inline: 0;
			}
		}
	}
</style>
