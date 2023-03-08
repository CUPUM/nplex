<script lang="ts">
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { EDITOR_ROUTES } from '$routes/(authed)/editer/common';
	import EditorLayout from '../../EditorLayout.svelte';

	function base(subpath: string) {
		return `${EDITOR_ROUTES.project.descriptors.pathname}${subpath}`;
	}

	const links = [
		{
			pathname: base('/indicateurs'),
			label: 'Indicateurs',
			title: 'Indicateurs d’exemplarité',
		},
		{
			pathname: base('/usages'),
			label: 'Usages',
			title: 'Usages & catégories',
		},
	];
</script>

<EditorLayout>
	<svelte:fragment slot="sidebar">
		{#each links as link}
			<SidebarButton href={link.pathname}>{link.label}</SidebarButton>
		{/each}
	</svelte:fragment>
	<slot />
</EditorLayout>

<style lang="scss">
</style>
