<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import { KEY } from '$utils/enums';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import { project } from './common';

	$: form_title = $project.title;

	$: $editorDirty.title = form_title !== $project.title;

	function handleKey(e: KeyboardEvent) {
		if (e.key === KEY.Enter) {
			e.preventDefault();
		}
	}
</script>

<EditorFormgroup legend="Titre du projet">
	<div>
		<Field bind:value={form_title} variant="default" name="title" />
	</div>
</EditorFormgroup>

<style lang="scss">
	div {
		max-width: var(--ui-width-md);
	}
</style>
