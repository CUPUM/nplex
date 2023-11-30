<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { ArrowRight, FolderHeart, Folders, Home, Settings, UserSquare2 } from 'lucide-svelte';
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.account_nav_title()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/i`)}>
		<LangKey>{m.account_nav_home()}</LangKey>
		<Home class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/users/${$page.data?.user?.id}`)} aria-disabled>
		<LangKey>{m.account_nav_profile()}</LangKey>
		<UserSquare2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/collections`)} aria-disabled>
		<LangKey>{m.account_nav_collections()}</LangKey>
		<Folders class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/likes`)} aria-disabled>
		<LangKey>{m.account_nav_likes()}</LangKey>
		<FolderHeart class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/settings`)}>
		<LangKey>{m.account_nav_settings()}</LangKey>
		<Settings class="button-icon" />
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.account_nav_editor_title()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects`)}>
		<LangKey>{m.projects()}</LangKey>
		<ArrowRight class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations`)}>
		<LangKey>{m.orgs()}</LangKey>
		<ArrowRight class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
