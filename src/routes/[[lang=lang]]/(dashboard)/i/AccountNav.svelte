<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import { ArrowRight, FolderHeart, Folders, Home, Settings, UserSquare2 } from 'lucide-svelte';
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.account_nav_title()}
	</svelte:fragment>
	<SidebarItem {...$link(`/i`)}>
		{m.account_nav_home()}
		<Home class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/users/${$page.data?.user?.id}`)} aria-disabled>
		{m.account_nav_profile()}
		<UserSquare2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/collections`)} aria-disabled>
		{m.account_nav_collections()}
		<Folders class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/likes`)} aria-disabled>
		{m.account_nav_likes()}
		<FolderHeart class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/settings`)}>
		{m.account_nav_settings()}
		<Settings class="button-icon" />
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.account_nav_editor_title()}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects`)}>
		{m.projects()}
		<ArrowRight class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations`)}>
		{m.orgs()}
		<ArrowRight class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style>
</style>
