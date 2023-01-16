<script lang="ts">
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import { formProject } from './common';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

	export let data: PageData;
</script>

<ProjectFormGroup>
	<svelte:fragment slot="legend">Description</svelte:fragment>
	<TextArea
		variant="outlined"
		name="description"
		value={$formProject.description}
		placeholder="Décrivez votre projet"
		style="height: 400px; width: 100%;"
	/>
</ProjectFormGroup>

<style lang="scss">
</style>
