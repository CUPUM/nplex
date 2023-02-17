<script lang="ts">
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import { descriptors, form_type_id, project } from './common';

	$: $form_type_id = $project.type_id;

	$: $editorDirty.type_id = $form_type_id !== $project.type_id;
</script>

<EditorFormgroup legend="Type de projet">
	<Switch
		style="align-self: flex-start"
		variant="default"
		bind:group={$form_type_id}
		name="type_id"
	>
		{#each $descriptors.types as type}
			<SwitchItem value={type.id}>
				{type.title}
			</SwitchItem>
		{/each}
	</Switch>
</EditorFormgroup>

<style lang="scss">
</style>
