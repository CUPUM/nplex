<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import SidebarLegend from '$components/Sidebar/SidebarLegend.svelte';
	import { EDITOR_FORM_ID } from '../../constants';
	import { complements, composeSectionHref, essentials } from './common';
</script>

<Sidebar variant="editor">
	<SidebarLegend>Essentiels</SidebarLegend>
	{#each essentials as link, i}
		<SidebarButton {i} href={composeSectionHref($page.params.projectId, link.subpath, link.hash)}>
			{link.title}
		</SidebarButton>
	{/each}
	<hr />
	<SidebarLegend>Compléments</SidebarLegend>
	{#each complements as link, i}
		<SidebarButton
			i={essentials.length + i}
			href={composeSectionHref($page.params.projectId, link.subpath, link.hash)}
		>
			{link.title}
		</SidebarButton>
	{/each}
	<hr />
	<SidebarButton
		i={essentials.length + complements.length}
		href={composeSectionHref($page.params.projectId, '/parametres', EDITOR_FORM_ID)}
	>
		<Icon name="settings" slot="leading" />Paramètres
	</SidebarButton>
</Sidebar>

<style lang="scss">
</style>
