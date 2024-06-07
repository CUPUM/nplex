<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
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
	import { onDestroy } from 'svelte';

	let { data, children } = $props();

	const dashboard = getDashboardContext(true);
	dashboard.sidebar = sidebar;

	onDestroy(() => {
		dashboard.sidebar = undefined;
	});
</script>

{#snippet sidebar()}
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.account_nav_title()}
		{/snippet}
		<a class="button button-nav" {...linkAttributes(`/i`)}>
			{m.account_nav_home()}
			<Home />
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/users/${$page.data?.user?.id}`)}
			aria-disabled
		>
			{m.account_nav_profile()}
			<SquareUserRoundIcon />
		</a>
		<a class="button button-nav" {...linkAttributes(`/i/collections`)} aria-disabled>
			{m.account_nav_collections()}
			<Folders />
		</a>
		<a class="button button-nav" {...linkAttributes(`/i/likes`)} aria-disabled>
			{m.account_nav_likes()}
			<FolderHeart />
		</a>
		<a class="button button-nav" {...linkAttributes(`/i/settings`)}>
			{m.account_nav_settings()}
			<Settings />
		</a>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.account_nav_editor_title()}
		{/snippet}
		<a class="button button-nav" {...linkAttributes(`/edit/projects`)}>
			{m.projects()}
			<ArrowRight />
		</a>
		<a class="button button-nav" {...linkAttributes(`/edit/organizations`)}>
			{m.organizations()}
			<ArrowRight />
		</a>
	</DashboardSidebarMenu>
{/snippet}

{@render children()}

<style>
</style>
