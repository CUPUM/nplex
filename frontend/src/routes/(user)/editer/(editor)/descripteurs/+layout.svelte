<script lang="ts">
	import { onDestroy } from 'svelte';
	import { crumbs } from '../EditorCrumbs.svelte';
	import { editorSidebarContent } from '../EditorSidebar.svelte';
	import { descriptors } from '../projet/[projectId]/common';
	import type { PageData } from './$types';
	import EditorSidebarDescriptors from './EditorSidebarDescriptors.svelte';

	export let data: PageData;

	$: descriptors.set(data.descriptors);

	crumbs.set([{ label: 'Descripteurs', pathname: '/editer/descripteurs' }]);
	editorSidebarContent.set(EditorSidebarDescriptors);

	onDestroy(() => {
		crumbs.set([]);
		editorSidebarContent.set(undefined);
	});
</script>

<slot />

<style lang="scss">
</style>
