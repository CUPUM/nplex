<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
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
		<a class="button button-nav" use:ripple {...linkAttributes(`/i`)}>
			<Home />
			{m.account_nav_home()}
		</a>
		<a
			class="button button-nav"
			use:ripple
			{...linkAttributes(`/users/${$page.data?.user?.id}`)}
			aria-disabled
		>
			<SquareUserRoundIcon />
			{m.account_nav_profile()}
		</a>
		<a class="button button-nav" use:ripple {...linkAttributes(`/i/collections`)} aria-disabled>
			<Folders />
			{m.account_nav_collections()}
		</a>
		<a class="button button-nav" use:ripple {...linkAttributes(`/i/likes`)} aria-disabled>
			<FolderHeart />
			{m.account_nav_likes()}
		</a>
		<a class="button button-nav" use:ripple {...linkAttributes(`/i/settings`)}>
			<Settings />
			{m.account_nav_settings()}
		</a>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.account_nav_editor_title()}
		{/snippet}
		<a class="button button-nav" use:ripple {...linkAttributes(`/edit/projects`)}>
			{m.projects()}
			<ArrowRight />
		</a>
		<a class="button button-nav" use:ripple {...linkAttributes(`/edit/organizations`)}>
			{m.organizations()}
			<ArrowRight />
		</a>
	</DashboardSidebarMenu>
{/snippet}

{@render children()}

<style>
</style>
