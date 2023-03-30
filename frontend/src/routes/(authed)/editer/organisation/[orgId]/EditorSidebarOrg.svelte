<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_FORM_ID } from '../../constants';

	function composeHref(orgId: string, subpath: string, hash?: string) {
		return '/editer/organisation/' + orgId + subpath + (hash ? `#${hash}` : '');
	}

	const links = [
		{
			pathname: '',
			title: 'Général',
		},
		{
			pathname: '/membres',
			title: 'Membres',
			hash: EDITOR_FORM_ID,
		},
	];

	const settings = {
		pathname: '/parametres',
		title: 'Paramètres',
		hash: EDITOR_FORM_ID,
	};
</script>

<Sidebar variant="editor">
	{#each links as link, i}
		<SidebarButton {i} href={composeHref($page.params.orgId, link.pathname, link.hash)}>
			{link.title}
		</SidebarButton>
	{/each}
	<hr />
	<SidebarButton
		i={links.length}
		href={composeHref($page.params.orgId, settings.pathname, settings.hash)}
	>
		<Icon name="settings" slot="leading" />
		{settings.title}
	</SidebarButton>
</Sidebar>

<style lang="scss">
</style>
