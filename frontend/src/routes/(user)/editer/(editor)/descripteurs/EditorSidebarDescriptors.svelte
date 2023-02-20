<script lang="ts">
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_ROUTES } from '../../common';

	function base(subpath: string) {
		return `${EDITOR_ROUTES.project.descriptors.pathname}${subpath}`;
	}

	const descriptorsRoutes = [
		{
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
		{
			pathname: base('/usages'),
			title: 'Usages & catégories',
		},
		{
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
		{
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
		{
			pathname: base('/exemplarite'),
			title: 'Indicateurs d’exemplarité',
		},
	];
</script>

{#each descriptorsRoutes as r}
	<SidebarButton href={r.pathname}>{r.title}</SidebarButton>
{/each}

<style lang="scss">
</style>
