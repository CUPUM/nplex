<script lang="ts">
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

	export let data: PageData;
	export let formproject: PageData['project'];
</script>

<ProjectFormGroup>
	<svelte:fragment slot="legend">Description</svelte:fragment>
	<TextArea
		name="description"
		value={formproject.description}
		placeholder="Décrivez votre projet"
		style="height: 400px; width: 100%;"
	/>
</ProjectFormGroup>

<style lang="scss">
</style>
