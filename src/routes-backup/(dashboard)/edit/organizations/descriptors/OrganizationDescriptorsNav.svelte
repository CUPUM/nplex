<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import ProjectsSidebarGroup from '../../../dashboard-sidebar-menu-projects.svelte';
</script>

<DashboardSidebarMenu>
	{#snippet legend()}
		{m.organization_descriptors()}
	{/snippet}
	<a class="button button-nav" {...linkAttributes('/edit/organizations/descriptors/types')}>
		{m.organization_types()}
	</a>
</DashboardSidebarMenu>
<ProjectsSidebarGroup />
