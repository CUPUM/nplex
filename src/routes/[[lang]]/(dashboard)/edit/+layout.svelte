<script lang="ts">
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import DashboardSidebarMenuOrganizations from '../dashboard-sidebar-menu-organizations.svelte';
	import DashboardSidebarMenuProjects from '../dashboard-sidebar-menu-projects.svelte';

	let { data, children } = $props();

	const { setSidebar } = getDashboardContext(true);

	setSidebar(sidebar);
</script>

{#snippet sidebar()}
	<DashboardSidebarMenuProjects />
	<DashboardSidebarMenuOrganizations />
{/snippet}

{@render children()}
