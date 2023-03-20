<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldButtonIncrement from '$components/Field/FieldButtonIncrement.svelte';
	import type { PageData } from '../$types';
	import { editorDirtyValues } from '../../../common';
	import { ADJACENT_STREETS_MAX, ADJACENT_STREETS_MIN } from './common';

	export let adjacent_streets: PageData['project']['adjacent_streets'];

	$: editAdjacentStreets = adjacent_streets;
</script>

<Dirty
	sample={adjacent_streets}
	specimen={editAdjacentStreets}
	bind:dirty={$editorDirtyValues.adjacent_streets}
/>
<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Rues adjacentes</h3>
	<p class="info">Combien de rues ou de ruelles bordent directement le terrain?</p>
	<Field
		readonly
		type="number"
		name="adjacent_streets"
		bind:value={editAdjacentStreets}
		min={ADJACENT_STREETS_MIN}
		max={ADJACENT_STREETS_MAX}
		textAlign="center"
		style="width: 160px;"
	>
		<FieldButtonIncrement down slot="leading" />
		<FieldButtonIncrement up slot="trailing" />
	</Field>
</fieldset>

<style lang="scss">
</style>
