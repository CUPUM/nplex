<script lang="ts">
	import { page } from '$app/stores';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import { form_type_id } from './common';

	$: descriptors = ($page.data as PageData).descriptors;

	$: ({ type_id } = ($page.data as PageData).project);

	$: $form_type_id = type_id;

	$: $editorDirty.type_id = $form_type_id !== type_id;
</script>

<EditorFormgroup legend="Type de projet">
	<Switch
		style="align-self: flex-start"
		variant="default"
		bind:group={$form_type_id}
		name="type_id"
	>
		{#each descriptors.types as type}
			<SwitchItem value={type.id}>
				{type.title}
			</SwitchItem>
		{/each}
	</Switch>
</EditorFormgroup>

<style lang="scss">
</style>
