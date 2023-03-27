<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import FieldButtonIncrement from '$components/Field/FieldButtonIncrement.svelte';
	import {
		ADJACENT_ALLEYS_MAX,
		ADJACENT_ALLEYS_MIN,
		ADJACENT_STREETS_MAX,
		ADJACENT_STREETS_MIN,
	} from '../../constants';
	import { project } from '../common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Voies adjacentes</h3>
	<p>Combien de rues bordent directement le terrain?</p>
	<Field
		variant="default"
		type="number"
		name="adjacent_streets"
		bind:value={$project.adjacent_streets}
		min={ADJACENT_STREETS_MIN}
		max={ADJACENT_STREETS_MAX}
		textAlign="center"
		style="width: 160px;"
	>
		<FieldButtonIncrement down slot="leading" />
		<FieldButtonIncrement up slot="trailing" />
	</Field>
	<p class="subtle">Combien de ruelles ou de voies alternatives bordent directement le terrain?</p>
	<Field
		variant="default"
		type="number"
		name="adjacent_alleys"
		bind:value={$project.adjacent_alleys}
		min={ADJACENT_ALLEYS_MIN}
		max={ADJACENT_ALLEYS_MAX}
		textAlign="center"
		style="width: 160px;"
	>
		<FieldButtonIncrement down slot="leading" />
		<FieldButtonIncrement up slot="trailing" />
	</Field>
</fieldset>

<style lang="scss">
	.fields {
		display: flex;
		flex-direction: column;
		max-width: var(--ui-width-sm);
		gap: 1.5rem;
	}
</style>
