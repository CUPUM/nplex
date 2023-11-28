<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { ArrowRight } from 'lucide-svelte';
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_descriptors()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors/types')}>
		<LangKey>{m.project_descriptors_types()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/interventions')}>
		<LangKey>{m.project_descriptors_interventions()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/indicators')}>
		<LangKey>{m.project_descriptors_indicators()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/ownerships')}>
		<LangKey>{m.project_descriptors_ownerships()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/implantations')}>
		<LangKey>{m.project_descriptors_implantations()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/levels')}>
		<LangKey>{m.project_descriptors_levels()}</LangKey>
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects/descriptors/images')}>
		<LangKey>{m.project_descriptors_images()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.orgs()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations/descriptors')}>
		<LangKey>{m.org_descriptors()}</LangKey>
		<ArrowRight class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
