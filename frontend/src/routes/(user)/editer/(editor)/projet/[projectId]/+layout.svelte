<script lang="ts">
	import { EDITOR_ROUTES } from '$routes/(user)/editer/common';
	import type { Routes } from '$utils/routes';
	import { onDestroy } from 'svelte';
	import { crumbs } from '../../EditorCrumbs.svelte';
	import EditorNavbar from '../../EditorNavbar.svelte';
	import EditorToolbar from '../../EditorToolbar.svelte';
	import type { LayoutData } from './$types';
	import { dirty, FORM_ID } from './common';

	export let data: LayoutData;

	function base(subpath: string) {
		return `${EDITOR_ROUTES.project.pathname}/${data.project.id}${subpath}`;
	}

	export const PROJECT_EDITOR_ROUTES = {
		General: {
			pathname: base(''),
			title: 'Général',
		},
		Localisation: {
			pathname: base('/localisation'),
			title: 'Localisation',
		},
		Gallery: {
			pathname: base('/galerie'),
			title: 'Galerie',
		},
		Materials: {
			pathname: base('/materiaux'),
			title: 'Matériaux',
		},
		Exemplarity: {
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
		Realization: {
			pathname: base('/realisation'),
			title: 'Réalisation',
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
<EditorToolbar dirty={!!Object.values($dirty).filter((v) => v).length} formid={FORM_ID} />

<style lang="scss">
</style>
