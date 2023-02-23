<script lang="ts">
	import { page } from '$app/stores';
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';

	$: ({ title } = ($page.data as PageData).project);

	$: editTitle = title;
</script>

<Dirty sample={title} specimen={editTitle} bind:dirty={$editorDirty.title} />
<EditorFormgroup legend="Titre du projet">
	<div>
		<Field bind:value={editTitle} variant="default" name="title" />
	</div>
</EditorFormgroup>

<style lang="scss">
	div {
		width: 100%;
	}
</style>
