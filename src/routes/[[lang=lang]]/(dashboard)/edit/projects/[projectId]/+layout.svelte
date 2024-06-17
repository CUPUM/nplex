<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { authorize } from '$lib/crud/authorization/rbac.svelte.js';
	import { AlertTriangle, Eye, Files, Tags, UsersRound } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

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
	<div class="bg-card rounded-section p-card-padding flex-1">
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
			{...linkAttributes(`/edit/projects/${data.id}/exemplarity#exemplarity-indicators`)}
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
			{m.project_sharing()}
			<UsersRound class="button-icon" />
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/publishing`)}
			aria-disabled="true"
		>
			{m.project_visibility()}
			<Eye class="button-icon" />
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/security`)}
			data-danger
			aria-disabled
		>
			{m.project_danger_zone()}
			<AlertTriangle class="button-icon" />
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.my_documents()}
		{/snippet}
		<DashboardSidebarMenuItem class="button button-nav" {...linkAttributes('/edit/projects')}>
			{m.projects()}
			<Files class="button-icon" />
		</DashboardSidebarMenuItem>
		{#if authorize('projects.descriptors.update')}
			<DashboardSidebarMenuItem
				class="button button-nav"
				{...linkAttributes('/edit/projects/descriptors')}
			>
				{m.project_descriptors()}
				<Tags class="button-icon" />
			</DashboardSidebarMenuItem>
		{/if}
		<DashboardSidebarMenuItem class="button button-nav" {...linkAttributes('/edit/organizations')}>
			{m.organizations()}
			<Files class="button-icon" />
		</DashboardSidebarMenuItem>
		{#if authorize('organizations.descriptors.update')}
			<DashboardSidebarMenuItem
				class="button button-nav"
				{...linkAttributes('/edit/organizations/descriptors')}
			>
				{m.organization_descriptors()}
				<Tags class="button-icon" />
			</DashboardSidebarMenuItem>
		{/if}
	</DashboardSidebarMenu>
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
			border-radius: var(--radius-section);
			padding: var(--spacing-card-padding);

			.dashboard-section-title {
				padding-inline: 0;
			}
		}
	}
</style>
