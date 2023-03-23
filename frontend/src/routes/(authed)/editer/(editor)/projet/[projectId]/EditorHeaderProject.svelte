<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import EditorHeader from '../../EditorHeader.svelte';
	import { projectData } from './common';
</script>

<EditorHeader isPublic={$page.data.project?.publication_status.status === 'published'}>
	<svelte:fragment slot="heading">
		{#if $projectData?.title != null}
			{$projectData.title}
		{:else}
			<i style="opacity: .5">Titre non défini</i>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="nav">
		<Button variant="cta" href="/projets/{$page.data.project?.id}">
			Consulter la fiche d'exploration du projet <Icon name="file" slot="trailing" />
		</Button>
	</svelte:fragment>
</EditorHeader>

<style lang="scss">
</style>
