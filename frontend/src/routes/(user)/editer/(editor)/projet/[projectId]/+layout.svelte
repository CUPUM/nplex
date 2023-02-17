<script lang="ts">
	import { onDestroy } from 'svelte';
	import { crumbs } from '../../EditorCrumbs.svelte';
	import { editorSidebarContent } from '../../EditorSidebar.svelte';
	import type { LayoutData } from './$types';
	import { descriptors, project } from './common';
	import EditorSidebarProject from './EditorSidebarProject.svelte';

	export let data: LayoutData;

	$: project.set(data.project);
	$: descriptors.set(data.descriptors);

	crumbs.set([
		{ label: 'Projet', pathname: '/editer/projet' },
		{ label: data.project.title, pathname: `/editer/projet/${data.project.id}` },
	]);
	editorSidebarContent.set(EditorSidebarProject);

	onDestroy(() => {
		crumbs.set([]);
		editorSidebarContent.set(undefined);
	});
</script>

<slot />

<style lang="scss">
</style>
