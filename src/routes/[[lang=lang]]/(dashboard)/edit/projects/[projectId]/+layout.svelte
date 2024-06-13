<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { authorize } from '$lib/crud/authorization/rbac.svelte';
	import { AlertTriangle, Eye, Files, Tags, UsersRound } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	let { children, data } = $props();

	const ctx = getDashboardContext(true);
	ctx.sidebar = sidebar;
	ctx.header = header;

	onDestroy(() => {
		ctx.sidebar = undefined;
		ctx.header = undefined;
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
		<a class="button button-nav" {...linkAttributes(`/edit/projects/${data.id}`)}>
			{m.project_general()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/place`)}
			aria-disabled="true"
		>
			{m.project_place()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/exemplarity#exemplarity-indicators`)}
		>
			{m.project_examplarity()}
		</a>
		<a class="button button-nav" {...linkAttributes(`/edit/projects/${data.id}/gallery`)}>
			{m.project_gallery()}
		</a>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_complements()}
		{/snippet}
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/contributions`)}
			aria-disabled="true"
		>
			{m.project_contributions()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/materials`)}
			aria-disabled="true"
		>
			{m.project_materials()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/timeline`)}
			aria-disabled="true"
		>
			{m.project_timeline()}
		</a>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_settings()}
		{/snippet}
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/sharing`)}
			aria-disabled="true"
		>
			{m.project_sharing()}
			<UsersRound class="button-icon" />
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/publishing`)}
			aria-disabled="true"
		>
			{m.project_visibility()}
			<Eye class="button-icon" />
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/security`)}
			data-danger
		>
			{m.project_danger_zone()}
			<AlertTriangle class="button-icon" />
		</a>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.my_documents()}
		{/snippet}
		<a class="button button-nav" {...linkAttributes('/edit/projects')}>
			{m.projects()}
			<Files class="button-icon" />
		</a>
		{#if authorize($page.data.user, 'projects.descriptors.update')}
			<a class="button button-nav" {...linkAttributes('/edit/projects/descriptors')}>
				{m.project_descriptors()}
				<Tags class="button-icon" />
			</a>
		{/if}
		<a class="button button-nav" {...linkAttributes('/edit/organizations')}>
			{m.organizations()}
			<Files class="button-icon" />
		</a>
		{#if authorize($page.data.user, 'organizations.descriptors.update')}
			<a class="button button-nav" {...linkAttributes('/edit/organizations/descriptors')}>
				{m.organization_descriptors()}
				<Tags class="button-icon" />
			</a>
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
