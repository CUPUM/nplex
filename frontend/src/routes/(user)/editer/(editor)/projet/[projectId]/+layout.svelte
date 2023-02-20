<script lang="ts">
	import { enhance } from '$app/forms';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_ROUTES } from '$routes/(user)/editer/common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../common';
	import EditorHeader from '../../EditorHeader.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let updating = false;
	let key: string;

	function base(subpath: string) {
		return `${EDITOR_ROUTES.project.pathname}/${($page.data as LayoutData).project.id}${subpath}`;
	}

	const sidebarRoutes = [
		{
			pathname: base(''),
			title: 'Général',
		},
		{
			pathname: base('/localisation'),
			title: 'Localisation',
		},
		{
			pathname: base('/galerie'),
			title: 'Galerie',
		},
		{
			pathname: base('/materiaux'),
			title: 'Matériaux',
		},
		{
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
		{
			pathname: base('/realisation'),
			title: 'Réalisation',
		},
		{
			pathname: base('/parametres'),
			title: 'Paramètres',
		},
	];

	beforeNavigate((navigation) => {
		key = navigation.to?.route.id ?? '';
	});
</script>

<EditorHeader />
<div>
	<Sidebar>
		{#each sidebarRoutes as r}
			<SidebarButton href={r.pathname}>{r.title}</SidebarButton>
		{/each}
	</Sidebar>
	<hr />
	<!-- {#key key} -->
	<form
		use:enhance={({ form, data, action, cancel }) => {
			updating = true;
			return async ({ update, result }) => {
				update({ reset: false });
				if (result.type !== 'success' && result.type !== 'redirect') {
					updating = false;
				}
			};
		}}
		method="POST"
		action="?/{EDITOR_FORM_ACTION}"
		id={EDITOR_FORM_ID}
	>
		<slot />
	</form>
	<!-- {/key} -->
</div>

<style lang="scss">
	div {
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-direction: row;
	}

	form {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		overflow-x: hidden;
		gap: 0.5rem;
		padding: 1.5rem 1.5rem;
		padding-left: 0.5rem;
	}
</style>
