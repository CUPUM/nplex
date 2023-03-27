<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import SidebarLegend from '$components/Sidebar/SidebarLegend.svelte';
	import { EDITOR_FORM_ID } from '../../constants';

	function composeHref(projectId: string, subpath: string, hash?: string) {
		return '/editer/projet/' + projectId + subpath + (hash ? `#${hash}` : '');
	}

	const essentials = [
		{
			subpath: '',
			title: 'Général',
		},
		{
			subpath: '/lieu',
			title: 'Lieu',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/exemplarite',
			title: 'Exemplarité',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/galerie',
			title: 'Galerie',
			hash: EDITOR_FORM_ID,
		},
	];

	const complements = [
		{
			subpath: '/intervenant-e-s',
			title: 'Intervenant·e·s',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/echeancier',
			title: 'Échéancier',
			hash: EDITOR_FORM_ID,
		},
		{
			subpath: '/materiaux',
			title: 'Matériaux',
			hash: EDITOR_FORM_ID,
		},
	];
</script>

<Sidebar variant="editor">
	<SidebarLegend>Essentiels</SidebarLegend>
	{#each essentials as link, i}
		<SidebarButton {i} href={composeHref($page.params.projectId, link.subpath, link.hash)}>
			{link.title}
		</SidebarButton>
	{/each}
	<hr />
	<SidebarLegend>Compléments</SidebarLegend>
	{#each complements as link, i}
		<SidebarButton
			i={essentials.length + i}
			href={composeHref($page.params.projectId, link.subpath, link.hash)}
		>
			{link.title}
		</SidebarButton>
	{/each}
	<hr />
	<SidebarButton
		i={essentials.length + complements.length}
		href={composeHref($page.params.projectId, '/parametres', EDITOR_FORM_ID)}
	>
		<Icon name="settings" slot="leading" />Paramètres
	</SidebarButton>
</Sidebar>

<style lang="scss">
</style>
