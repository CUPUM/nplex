<script lang="ts">
	import { EDITOR_ROUTES } from '$routes/(user)/editer/common';
	import type { Routes } from '$utils/routes';
	import { onDestroy } from 'svelte';
	import { crumbs } from '../../EditorCrumbs.svelte';
	import EditorNavbar from '../../EditorNavbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	function base(subpath: string) {
		return `${EDITOR_ROUTES.project.pathname}/${data.project.id}${subpath}`;
	}

	export const PROJECT_EDITOR_ROUTES = {
		General: {
			pathname: base(''),
			title: 'Général',
		},
		Site: {
			pathname: base('/site'),
			title: 'Site',
		},
		Gallery: {
			pathname: base('/galerie'),
			title: 'Galerie',
		},
		Processus: {
			pathname: base('/processus'),
			title: 'Processus',
		},
		Exemplarity: {
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
		Settings: {
			pathname: base('/parametres'),
			title: 'Paramètres',
		},
	} as const satisfies Routes;

	crumbs.set([
		{ label: 'Projet', pathname: '/editer/projet' },
		{ label: data.project.title, pathname: `/editer/projet/${data.project.id}` },
	]);

	onDestroy(() => crumbs.set([]));
</script>

<EditorNavbar routes={PROJECT_EDITOR_ROUTES} />
<slot />

<style lang="scss">
</style>
