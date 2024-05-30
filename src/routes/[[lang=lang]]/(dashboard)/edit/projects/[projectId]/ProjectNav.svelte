<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { USER_ROLES } from '$lib/auth/constants';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import { AlertTriangle, Eye, Files, Tags, Users2 } from 'lucide-svelte';

	$: projectId = $page.params.projectId;
</script>

<SidebarGroup>
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
	{#if $page.data.user?.role === USER_ROLES.ADMIN || $page.data.user?.role === USER_ROLES.EDITOR}
		<SidebarItem {...$link('/edit/projects/descriptors')}>
			{m.project_descriptors()}
			<Tags class="button-icon" />
		</SidebarItem>
	{/if}
	<SidebarItem {...$link('/edit/organizations')}>
		{m.orgs()}
		<Files class="button-icon" />
	</SidebarItem>
	{#if $page.data.user?.role === USER_ROLES.ADMIN || $page.data.user?.role === USER_ROLES.EDITOR}
		<SidebarItem {...$link('/edit/organizations/descriptors')}>
			{m.organization_descriptors()}
			<Tags class="button-icon" />
		</SidebarItem>
	{/if}
</SidebarGroup>

<style>
</style>
