<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import { Files, Tags } from 'lucide-svelte';
</script>

<SidebarGroup {...$link('/edit/projects/descriptors')}>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_descriptors()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors/types')}>
		<LangKey>{m.project_types()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/interventions')}>
		<LangKey>{m.project_intervention_types()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/indicators')}>
		<LangKey>{m.project_indicators()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/ownerships')}>
		<LangKey>{m.project_ownership_types()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/implantations')}>
		<LangKey>{m.project_implantations()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/levels')}>
		<LangKey>{m.project_levels()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/images')}>
		<LangKey>{m.project_images()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.projects()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects')}>
		<LangKey>{m.my_projects()}</LangKey>
		<Files class="button-icon" />
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.orgs()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations')}>
		<LangKey>{m.my_orgs()}</LangKey>
		<Files class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link('/edit/organizations/descriptors')}>
		<LangKey>{m.organization_descriptors()}</LangKey>
		<Tags class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style>
</style>
