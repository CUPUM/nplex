<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import FieldButtonIncrement from '$components/Field/FieldButtonIncrement.svelte';
	import { projectData } from '../common';
	import { ADJACENT_STREETS_MAX, ADJACENT_STREETS_MIN } from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Rues adjacentes</h3>
	<p>Combien de rues ou de ruelles bordent directement le terrain?</p>
	<Field
		variant="outlined"
		type="number"
		name="adjacent_streets"
		bind:value={$projectData}
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
