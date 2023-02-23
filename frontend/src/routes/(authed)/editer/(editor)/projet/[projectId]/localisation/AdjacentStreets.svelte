<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import FieldButtonIncrement from '$components/Field/FieldButtonIncrement.svelte';
	import type { PageData } from '../$types';
	import { dirty } from '../common';
	import { ADJACENT_STREETS_MAX, ADJACENT_STREETS_MIN } from './common';

	export let adjacent_streets: PageData['project']['adjacent_streets'];

	$: _adjacent_streets = adjacent_streets;

	$: $dirty.adjacent_streets = _adjacent_streets != adjacent_streets;

	function increment() {
		_adjacent_streets = Math.min(ADJACENT_STREETS_MAX, (_adjacent_streets ?? 0) + 1);
	}

	function decrement() {
		_adjacent_streets = Math.max(ADJACENT_STREETS_MIN, (_adjacent_streets ?? 0) - 1);
	}
</script>

<section class="editor-section">
	<legend class="legend">Rues adjacentes</legend>
	<p class="ui-info">Combien de rues ou de ruelles bordent directement le terrain?</p>
	<Field
		readonly
		type="number"
		name="adjacent_streets"
		bind:value={_adjacent_streets}
		min={ADJACENT_STREETS_MIN}
		max={ADJACENT_STREETS_MAX}
		textAlign="center"
		style="width: 160px;"
	>
		<FieldButtonIncrement down slot="leading" />
		<FieldButtonIncrement up slot="trailing" />
	</Field>
</section>

<style lang="scss">
</style>
