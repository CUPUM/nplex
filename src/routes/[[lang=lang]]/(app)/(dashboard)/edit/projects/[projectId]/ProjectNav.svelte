<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { USER_ROLES } from '$lib/auth/constants';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { AlertTriangle, Eye, Files, Tags, Users2 } from 'lucide-svelte';

	$: projectId = $page.params.projectId;
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_essentials()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}`)}>
		<LangKey>{m.project_general()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/place#dashboard-main`)} aria-disabled>
		<LangKey>{m.project_place()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/exemplarity#dashboard-main`)}>
		<LangKey>{m.project_examplarity()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/gallery#dashboard-main`)}>
		<LangKey>{m.project_gallery()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_complements()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}/contributions#dashboard-main`)} aria-disabled>
		<LangKey>{m.project_contributions()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/materials#dashboard-main`)} aria-disabled>
		<LangKey>{m.project_materials()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/timeline#dashboard-main`)} aria-disabled>
		<LangKey>{m.project_timeline()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_settings()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects/${projectId}/sharing#dashboard-main`)} aria-disabled>
		<LangKey>{m.project_sharing()}</LangKey>
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/publishing#dashboard-main`)} aria-disabled>
		<LangKey>{m.project_visibility()}</LangKey>
		<Eye class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/projects/${projectId}/security#dashboard-main`)} danger>
		<LangKey>{m.project_danger_zone()}</LangKey>
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.my_documents()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects')}>
		<LangKey>{m.projects()}</LangKey>
		<Files class="button-icon" />
	</SidebarItem>
	{#if $page.data.user?.role === USER_ROLES.ADMIN || $page.data.user?.role === USER_ROLES.EDITOR}
		<SidebarItem {...$link('/edit/projects/descriptors')}>
			<LangKey>{m.project_descriptors()}</LangKey>
			<Tags class="button-icon" />
		</SidebarItem>
	{/if}
	<SidebarItem {...$link('/edit/organizations')}>
		<LangKey>{m.orgs()}</LangKey>
		<Files class="button-icon" />
	</SidebarItem>
	{#if $page.data.user?.role === USER_ROLES.ADMIN || $page.data.user?.role === USER_ROLES.EDITOR}
		<SidebarItem {...$link('/edit/organizations/descriptors')}>
			<LangKey>{m.org_descriptors()}</LangKey>
			<Tags class="button-icon" />
		</SidebarItem>
	{/if}
</SidebarGroup>

<style lang="postcss">
</style>
