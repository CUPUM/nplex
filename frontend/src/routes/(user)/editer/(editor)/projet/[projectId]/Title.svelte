<script lang="ts">
	import { page } from '$app/stores';
	import Field from '$components/Field/Field.svelte';
	import { onDestroy } from 'svelte';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';

	$: ({ title } = ($page.data as PageData).project);

	$: form_title = title;

	$: $editorDirty.title = form_title !== title;

	onDestroy(() => {
		delete $editorDirty.title;
	});
</script>

<EditorFormgroup legend="Titre du projet">
	<div>
		<Field bind:value={form_title} variant="default" name="title" />
	</div>
</EditorFormgroup>

<style lang="scss">
	div {
		width: var(--ui-width-md);
		max-width: 100%;
	}
</style>
