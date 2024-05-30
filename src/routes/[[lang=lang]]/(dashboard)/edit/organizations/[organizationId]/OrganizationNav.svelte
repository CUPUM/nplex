<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import { AlertTriangle, Shield, Users2 } from 'lucide-svelte';

	$: orgId = $page.params.organizationId;
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.organization_essentials()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}`)}>
		{m.organization_general()}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.organization_complements()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/members`)}>
		{m.organization_members()}
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/projects`)}>
		{m.organization_projects()}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.organization_settings()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/sharing`)}>
		{m.organization_sharing()}
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/visibility`)}>
		{m.organization_visibility()}
		<Shield class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/security`)} danger>
		{m.organization_danger()}
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style>
</style>
