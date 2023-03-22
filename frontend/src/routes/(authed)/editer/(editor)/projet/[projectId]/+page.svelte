<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { editorDirtyValues } from '../../common';
	import { projectData } from './common';
	import CostRange from './CostRange.svelte';
	import Interventions from './Interventions.svelte';

	export let data;
	export let form;
</script>

<Dirty
	sample={data.project.title}
	specimen={$projectData.title}
	bind:dirty={$editorDirtyValues.title}
/>
<Dirty
	sample={data.project.description}
	specimen={$projectData.description}
	bind:dirty={$editorDirtyValues.description}
/>
<Dirty
	sample={data.project.type_id}
	specimen={$projectData.type_id}
	bind:dirty={$editorDirtyValues.type_id}
/>
<Dirty
	sample={data.project.work_ids}
	specimen={$projectData.work_ids}
	bind:dirty={$editorDirtyValues.work_ids}
	strictOrder={false}
/>
<Dirty
	sample={data.project.cost_range}
	specimen={$projectData.cost_range}
	bind:dirty={$editorDirtyValues.cost_range}
	strictOrder
/>
<header class="editor-tab-header">
	<h1 class="heading-lg">Général</h1>
	<p class="info">
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde aspernatur minima enim
		praesentium blanditiis. Est culpa quia qui incidunt sequi.
	</p>
</header>
<fieldset class="editor-formgroup">
	projectData
	<h3 class="editor-formgroup-title">Sommmaire</h3>
	<div class="editor-formgroup-stack" style="max-width: var(--ui-width-md);">
		<Field variant="outlined" name="title" bind:value={$projectData.title}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
		<TextArea
			name="description"
			variant="outlined"
			placeholder="Décrivez votre projet en quelques phrases."
			bind:value={$projectData.description}
			style="height: 300px;"
		>
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</div>
</fieldset>
<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Travaux</h3>
	<Switch
		style="align-self: flex-start"
		variant="outlined"
		bind:value={$projectData.type_id}
		name="type_id"
	>
		{#each data.descriptors.types as type}
			<SwitchItem value={type.id}>
				{type.title}
			</SwitchItem>
		{/each}
	</Switch>
</fieldset>
<Interventions />
<CostRange />

<style lang="scss">
</style>
