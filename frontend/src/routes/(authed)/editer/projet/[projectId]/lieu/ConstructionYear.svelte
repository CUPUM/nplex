<script lang="ts">
	import Select from '$components/Select/Select.svelte';
	import { PROJECT_BUILDING_YEAR_MAX, PROJECT_BUILDING_YEAR_MIN } from '../../constants';
	import { project } from '../common';

	const years = Array(PROJECT_BUILDING_YEAR_MAX - PROJECT_BUILDING_YEAR_MIN + 2)
		.fill(null)
		.map((_, i) => PROJECT_BUILDING_YEAR_MIN + i)
		.reverse();
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Année de construction du bâtiment</h3>
	<p class="subtle">En quelle année le bâtiment a-t-il été construit, à son origine?</p>
	<Select variant="default" options={years} bind:value={$project.building_construction_year}>
		<option slot="option" let:option value={option}>{option}</option>
	</Select>
</fieldset>

<style lang="scss">
</style>
