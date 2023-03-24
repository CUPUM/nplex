<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import EditorHeader from '../../EditorHeader.svelte';

	// $orgData
</script>

<EditorHeader>
	<svelte:fragment slot="heading">{$page.data.organization?.name}</svelte:fragment>
	<svelte:fragment slot="nav">
		<Button variant="cta" href="/projets/{$page.data.organisation?.id}">
			Consulter la fiche <Icon name="file" slot="trailing" />
		</Button>
	</svelte:fragment>
</EditorHeader>

<style lang="scss">
</style>
