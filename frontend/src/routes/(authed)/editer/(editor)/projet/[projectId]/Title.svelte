<script lang="ts">
	import { page } from '$app/stores';
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import { editorDirtyValues } from '../../common';
	import type { PageData } from './$types';
	import { editTitle } from './common';

	$: ({ title } = ($page.data as PageData).project);

	$: $editTitle = title;
</script>

<Dirty sample={title} specimen={$editTitle} bind:dirty={$editorDirtyValues.title} />
<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Titre du projet</h3>
	<div>
		<Field bind:value={$editTitle} variant="outlined" name="title" />
	</div>
</fieldset>

<style lang="scss">
	div {
		width: 100%;
	}
</style>
