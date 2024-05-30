<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import ProjectsSidebarGroup from '../../../ProjectsSidebarGroup.svelte';
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.organization_descriptors()}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations/descriptors/types')}>
		{m.organization_types()}
	</SidebarItem>
</SidebarGroup>
<ProjectsSidebarGroup />

<style>
</style>
