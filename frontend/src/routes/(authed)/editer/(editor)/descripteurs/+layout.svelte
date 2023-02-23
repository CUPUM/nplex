<script lang="ts">
	import { onDestroy } from 'svelte';
	import { crumbs } from '../EditorHeader.svelte';
	import { descriptors } from '../projet/[projectId]/common';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: descriptors.set(data.descriptors);

	crumbs.set([{ label: 'Descripteurs de projet', pathname: '/editer/descripteurs' }]);

	onDestroy(() => {
		crumbs.set([]);
	});
</script>

<slot />

<style lang="scss">
</style>
