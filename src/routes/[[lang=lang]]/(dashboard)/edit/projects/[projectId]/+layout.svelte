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
	<div class="bg-card-accent rounded-section p-card-padding flex-1">
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
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/security`)}
			data-danger
			aria-disabled
		>
			<AlertTriangle class="button-icon" />
			{m.project_danger_zone()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.my_documents()}
		{/snippet}
		<DashboardSidebarMenuItem class="button button-nav" {...linkAttributes('/edit/projects')}>
			<Files class="button-icon" />
			{m.projects()}
		</DashboardSidebarMenuItem>
		{#if authorize('projects.descriptors.update')}
			<DashboardSidebarMenuItem
				class="button button-nav"
				{...linkAttributes('/edit/projects/descriptors')}
			>
				<Tags class="button-icon" />
				{m.project_descriptors()}
			</DashboardSidebarMenuItem>
		{/if}
		<DashboardSidebarMenuItem class="button button-nav" {...linkAttributes('/edit/organizations')}>
			<Files class="button-icon" />
			{m.organizations()}
		</DashboardSidebarMenuItem>
		{#if authorize('organizations.descriptors.update')}
			<DashboardSidebarMenuItem
				class="button button-nav"
				{...linkAttributes('/edit/organizations/descriptors')}
			>
				<Tags class="button-icon" />
				{m.organization_descriptors()}
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
