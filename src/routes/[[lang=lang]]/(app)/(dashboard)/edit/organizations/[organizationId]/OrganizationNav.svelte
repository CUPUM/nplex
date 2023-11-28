<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { AlertTriangle, Shield, Users2 } from 'lucide-svelte';

	$: orgId = $page.params.organizationId;
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.org_essentials()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}`)}>
		<LangKey>{m.org_general()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.org_complements()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/members`)}>
		<LangKey>{m.org_members()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/projects`)}>
		<LangKey>{m.org_projects()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.org_settings()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/sharing`)}>
		<LangKey>{m.org_sharing()}</LangKey>
		<Users2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/visibility`)}>
		<LangKey>{m.org_visibility()}</LangKey>
		<Shield class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations/${orgId}/security`)} danger>
		<LangKey>{m.org_danger()}</LangKey>
		<AlertTriangle class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
