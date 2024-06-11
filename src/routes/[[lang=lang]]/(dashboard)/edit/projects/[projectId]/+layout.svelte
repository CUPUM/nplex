<script lang="ts">
	import * as m from '$i18n/messages';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
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
{/snippet}
{#snippet sidebar()}
	Hello
	<!-- <SidebarGroup>
	<svelte:fragment slot="heading">
		{m.project_essentials()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}`)}>
		{m.project_general()}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/place#dashboard-main`)} aria-disabled>
		{m.project_place()}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/exemplarity#dashboard-main`)}>
		{m.project_examplarity()}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/gallery#dashboard-main`)}>
		{m.project_gallery()}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.project_complements()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}/contributions#dashboard-main`)} aria-disabled>
		{m.project_contributions()}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/materials#dashboard-main`)} aria-disabled>
		{m.project_materials()}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/timeline#dashboard-main`)} aria-disabled>
		{m.project_timeline()}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.project_settings()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}/sharing#dashboard-main`)} aria-disabled>
		{m.project_sharing()}
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/publishing#dashboard-main`)} aria-disabled>
		{m.project_visibility()}
		<Eye class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/security#dashboard-main`)} danger>
		{m.project_danger_zone()}
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.my_documents()}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects')}>
		{m.projects()}
		<Files class="button-icon" />
	</SidebarItem>
	{#if $page.data.user?.role === ROLES.ADMIN || $page.data.user?.role === ROLES.EDITOR}
		<SidebarItem {...$link('/edit/projects/descriptors')}>
			{m.project_descriptors()}
			<Tags class="button-icon" />
		</SidebarItem>
	{/if}
	<SidebarItem {...$link('/edit/organizations')}>
		{m.orgs()}
		<Files class="button-icon" />
	</SidebarItem>
	{#if $page.data.user?.role === ROLES.ADMIN || $page.data.user?.role === ROLES.EDITOR}
		<SidebarItem {...$link('/edit/organizations/descriptors')}>
			{m.organization_descriptors()}
			<Tags class="button-icon" />
		</SidebarItem>
	{/if}
</SidebarGroup> -->
{/snippet}
{@render children()}
