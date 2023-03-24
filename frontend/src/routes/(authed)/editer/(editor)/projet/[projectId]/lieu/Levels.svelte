<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import FieldButtonIncrement from '$components/Field/FieldButtonIncrement.svelte';
	import {
		BUILDING_MAX_HEIGHT,
		BUILDING_MAX_LEVELS,
		BUILDING_MIN_HEIGHT,
		BUILDING_MIN_LEVELS,
	} from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Nombre d'étages et hauteur</h3>
	<div class="fields">
		<Field
			variant="outlined"
			type="number"
			min={BUILDING_MIN_LEVELS}
			max={BUILDING_MAX_LEVELS}
			style="min-width: 160px"
			textAlign="center"
			name="building_levels"
		>
			<svelte:fragment slot="label">Étages</svelte:fragment>
			<FieldButtonIncrement down slot="leading" />
			<FieldButtonIncrement up slot="trailing" />
		</Field>
		<Field
			variant="outlined"
			type="number"
			step={0.1}
			min={BUILDING_MIN_HEIGHT}
			max={BUILDING_MAX_HEIGHT}
			style="min-width: 160px"
			textAlign="end"
			name="building_levels"
			suffix="&ensp;m"
		>
			<svelte:fragment slot="label">Hauteur</svelte:fragment>
			<FieldButtonIncrement down slot="leading" />
			<FieldButtonIncrement up slot="trailing" />
		</Field>
	</div>
</fieldset>

<style lang="scss">
	.fields {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		flex-wrap: wrap;
	}
</style>
