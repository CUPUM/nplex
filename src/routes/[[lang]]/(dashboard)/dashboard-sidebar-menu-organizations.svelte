<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { Files, Tags } from 'lucide-svelte';
</script>

<DashboardSidebarMenu>
	{#snippet legend()}
		{m.organizations()}
	{/snippet}
	<DashboardSidebarMenuItem {...linkAttributes('/edit/organizations')}>
		<Files />
		{m.my_organizations()}
	</DashboardSidebarMenuItem>
	<DashboardSidebarMenuItem {...linkAttributes('/edit/organizations/descriptors')}>
		<Tags />
		{m.organization_descriptors()}
	</DashboardSidebarMenuItem>
</DashboardSidebarMenu>
