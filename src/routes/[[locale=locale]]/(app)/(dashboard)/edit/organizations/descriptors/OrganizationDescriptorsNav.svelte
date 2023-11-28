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
		<LangKey>{m.org_descriptors()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/organizations/descriptors/types')}>
		<LangKey>{m.org_types()}</LangKey>
	</SidebarItem>
</SidebarGroup>
<SidebarGroup>
	<svelte:fragment slot="heading">
		<LangKey>{m.project_descriptors()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors')}>
		<LangKey>{m.projects()}</LangKey>
		<ArrowRight class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
