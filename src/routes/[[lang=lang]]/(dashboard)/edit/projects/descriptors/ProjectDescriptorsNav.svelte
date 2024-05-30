<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import { Files, Tags } from 'lucide-svelte';
</script>

<SidebarGroup {...$link('/edit/projects/descriptors')}>
	<svelte:fragment slot="heading">
		{m.project_descriptors()}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors/types')}>
		{m.project_types()}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/interventions')}>
		{m.project_intervention_types()}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/indicators')}>
		{m.project_indicators()}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/ownerships')}>
		{m.project_ownership_types()}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/implantations')}>
		{m.project_implantations()}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/levels')}>
		{m.project_levels()}
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/images')}>
		{m.project_images()}
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.projects()}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects')}>
		{m.my_projects()}
		<Files class="button-icon" />
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.orgs()}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations')}>
		{m.my_orgs()}
		<Files class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link('/edit/organizations/descriptors')}>
		{m.organization_descriptors()}
		<Tags class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style>
</style>
