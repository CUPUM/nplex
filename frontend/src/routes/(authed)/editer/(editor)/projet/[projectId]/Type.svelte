<script lang="ts">
	import { page } from '$app/stores';
	import Dirty from '$components/Dirty.svelte';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { editorDirtyValues } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import { editTypeId } from './common';

	$: descriptors = ($page.data as PageData).descriptors;

	$: ({ type_id } = ($page.data as PageData).project);

	$: $editTypeId = type_id;
</script>

<Dirty sample={type_id} specimen={$editTypeId} bind:dirty={$editorDirtyValues.type_id} />
<EditorFormgroup legend="Type de projet">
	<Switch style="align-self: flex-start" variant="outlined" bind:value={$editTypeId} name="type_id">
		{#each descriptors.types as type}
			<SwitchItem value={type.id}>
				{type.title}
			</SwitchItem>
		{/each}
	</Switch>
</EditorFormgroup>

<style lang="scss">
</style>
