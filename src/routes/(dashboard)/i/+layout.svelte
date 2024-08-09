<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import {
		ArrowRight,
		FolderHeart,
		Folders,
		Home,
		Settings,
		SquareUserRoundIcon,
	} from 'lucide-svelte';

	let { data, children } = $props();

	const { setSidebar } = getDashboardContext(true);

	setSidebar(sidebar);
</script>

{#snippet sidebar()}
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.account_nav_title()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/i`)}>
			<Home />
			{m.account_nav_home()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/users/${$page.data?.user?.id}`)} aria-disabled>
			<SquareUserRoundIcon />
			{m.account_nav_profile()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/i/collections`)} aria-disabled>
			<Folders />
			{m.account_nav_collections()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/i/likes`)} aria-disabled>
			<FolderHeart />
			{m.account_nav_likes()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/i/settings`)}>
			<Settings />
			{m.account_nav_settings()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.account_nav_editor_title()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects`)}>
			{m.projects()}
			<ArrowRight />
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/organizations`)}>
			{m.organizations()}
			<ArrowRight />
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
{/snippet}

{@render children()}
