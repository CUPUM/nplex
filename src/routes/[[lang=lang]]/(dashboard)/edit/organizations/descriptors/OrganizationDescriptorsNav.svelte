<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link.svelte';
	import ProjectsSidebarGroup from '../../../ProjectsSidebarGroup.svelte';
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.organization_descriptors()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations/descriptors/types')}>
		<LangKey>{m.organization_types()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<ProjectsSidebarGroup />

<style>
</style>
