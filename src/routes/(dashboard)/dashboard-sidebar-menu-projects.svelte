<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { Files, Tags } from 'lucide-svelte';
</script>

<DashboardSidebarMenu>
	{#snippet legend()}
		{m.projects()}
	{/snippet}
	<DashboardSidebarMenuItem {...linkAttributes('/edit/projects')}>
		<Files />
		{m.my_projects()}
	</DashboardSidebarMenuItem>
	<DashboardSidebarMenuItem {...linkAttributes('/edit/projects/descriptors')}>
		<Tags />
		{m.project_descriptors()}
	</DashboardSidebarMenuItem>
</DashboardSidebarMenu>
