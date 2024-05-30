<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/location';
	import { ArrowRight } from 'lucide-svelte';
</script>

<SidebarGroup>
	<svelte:fragment slot="heading">
		{m.projects()}
	</svelte:fragment>
	<SidebarItem {...$link('/edit/projects/descriptors')}>
		{m.project_descriptors()}
		<ArrowRight class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link('/edit/projects')}>
		{m.my_projects()}
		<ArrowRight class="button-icon" />
	</SidebarItem>
</SidebarGroup>

<style>
</style>
