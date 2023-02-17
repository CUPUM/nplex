<script lang="ts">
	import TextArea from '$components/TextArea.svelte';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import { project } from './common';

	$: form_description = $project.description;

	$: $editorDirty.description = (form_description ?? '') !== ($project.description ?? '');
</script>

<EditorFormgroup legend="Description">
	<div>
		<TextArea
			name="description"
			variant="default"
			placeholder="Décrivez votre projet en quelques phrases."
			bind:value={form_description}
			style="height: 300px;"
		/>
	</div>
</EditorFormgroup>

<style lang="scss">
	div {
		max-width: var(--ui-width-md);
	}
</style>
