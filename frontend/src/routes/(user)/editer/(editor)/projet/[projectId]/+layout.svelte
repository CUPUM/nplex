<script lang="ts">
	import { onDestroy } from 'svelte';
	import { crumbs } from '../../EditorCrumbs.svelte';
	import EditorNavbar from '../../EditorNavbar.svelte';
	import type { LayoutData } from './$types';
	import { PROJECT_EDITOR_ROUTES } from './common';

	export let data: LayoutData;

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
