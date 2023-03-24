<script lang="ts">
	import Select from '$components/Select/Select.svelte';
	import { projectData } from '../common';
	import { BUILDING_YEAR_MAX, BUILDING_YEAR_MIN } from './common';

	const years = Array(BUILDING_YEAR_MAX - BUILDING_YEAR_MIN + 2)
		.fill(null)
		.map((_, i) => BUILDING_YEAR_MIN + i)
		.reverse();
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Année de construction</h3>
	<Select variant="outlined" options={years} bind:value={$projectData.building_construction_year}>
		<option slot="option" let:option value={option}>{option}</option>
	</Select>
</fieldset>

<style lang="scss">
</style>
