<script lang="ts">
	import { page } from '$app/stores';
	import Dirty from '$components/Dirty.svelte';
	import TextArea from '$components/TextArea.svelte';
	import { editorDirtyValues } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';

	$: ({ description } = ($page.data as PageData).project);

	$: editDescription = description;
</script>

<Dirty
	sample={description}
	specimen={editDescription}
	bind:dirty={$editorDirtyValues.description}
/>
<EditorFormgroup legend="Description">
	<div>
		<TextArea
			name="description"
			variant="outlined"
			placeholder="Décrivez votre projet en quelques phrases."
			bind:value={editDescription}
			style="height: 300px;"
		/>
	</div>
</EditorFormgroup>

<style lang="scss">
	div {
		width: 100%;
		max-width: var(--ui-width-md);
	}
</style>
