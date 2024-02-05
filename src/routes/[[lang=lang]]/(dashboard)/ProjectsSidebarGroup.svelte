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
		<LangKey>{m.projects()}</LangKey>
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors')}>
		<LangKey>{m.project_descriptors()}</LangKey>
		<ArrowRight class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects')}>
		<LangKey>{m.my_projects()}</LangKey>
		<ArrowRight class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style lang="postcss">
</style>
