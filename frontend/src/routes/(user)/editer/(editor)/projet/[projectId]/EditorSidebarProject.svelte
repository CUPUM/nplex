<script lang="ts">
	import { page } from '$app/stores';
	import Link from '$components/Link.svelte';
	import { EDITOR_ROUTES } from '$routes/(user)/editer/common';
	import type { Routes } from '$utils/routes';
	import type { LayoutData } from './$types';

	function base(subpath: string) {
		return `${EDITOR_ROUTES.project.pathname}/${($page.data as LayoutData).project.id}${subpath}`;
	}

	const projectRoutes = {
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
</script>

{#each Object.values(projectRoutes) as r}
	<Link href={r.pathname}>{r.title}</Link>
{/each}

<style lang="scss">
</style>
