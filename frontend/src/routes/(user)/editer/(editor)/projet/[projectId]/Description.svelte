<script lang="ts">
	import { page } from '$app/stores';
	import TextArea from '$components/TextArea.svelte';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';

	$: ({ description } = ($page.data as PageData).project);

	$: form_description = description;

	$: $editorDirty.description = (form_description ?? '') !== (description ?? '');
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
		width: var(--ui-width-md);
		max-width: 100%;
	}
</style>
