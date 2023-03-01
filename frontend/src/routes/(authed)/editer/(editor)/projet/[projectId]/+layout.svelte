<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_ROUTES } from '$routes/(authed)/editer/common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../common';
	import EditorLayout from '../../EditorLayout.svelte';
	import type { LayoutData } from './$types';
	import { editTitle } from './common';

	export let data: LayoutData;

	let updating = false;

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
			title: 'Exemplarité', // 'Indicateurs d’exemplarité'
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
</script>

<EditorLayout>
	<svelte:fragment slot="header">
		{$editTitle}
	</svelte:fragment>
	<svelte:fragment slot="sidebar">
		{#each sidebarRoutes as r}
			<SidebarButton href={r.pathname}>{r.title}</SidebarButton>
		{/each}
	</svelte:fragment>
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
</EditorLayout>

<style lang="scss">
	form {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
