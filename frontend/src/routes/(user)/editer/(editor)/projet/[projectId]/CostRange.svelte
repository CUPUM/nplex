<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import RangeThumb from '$components/Range/RangeThumb.svelte';
	import { cadformatter } from '$utils/format';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import { COST_MAX, COST_MAX_DELTA, COST_MIN, COST_STEP, project } from './common';

	let form_cost_range = [...$project.cost_range];

	function sync() {
		form_cost_range = [...$project.cost_range];
	}

	$: $project.cost_range, sync();

	$: $editorDirty.cost_range = !form_cost_range.every((v, i) => v === $project.cost_range[i]);

	function checkMin() {
		form_cost_range[0] = Math.max(
			COST_MIN,
			Math.min(form_cost_range[0], COST_MAX, form_cost_range[1])
		);
	}

	function checkMax() {
		form_cost_range[1] = Math.min(
			COST_MAX,
			Math.max(form_cost_range[1], COST_MIN, form_cost_range[0])
		);
	}
</script>

<EditorFormgroup legend="Fourchette de coûts">
	<p class="ui-info">
		Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec lequel
		vous êtes confortable.
	</p>
	<fieldset class="fields">
		<Field
			type="number"
			prefix="C$ "
			min={COST_MIN}
			max={Math.min(COST_MAX, form_cost_range[1])}
			step={COST_STEP}
			bind:value={form_cost_range[0]}
			on:change={checkMin}
			style="grid-area: min;"
		>
			<svelte:fragment slot="label">Min.</svelte:fragment>
		</Field>
		<Field
			type="number"
			prefix="C$ "
			min={Math.max(COST_MIN, form_cost_range[0])}
			max={COST_MAX}
			step={COST_STEP}
			bind:value={form_cost_range[1]}
			on:change={checkMax}
			style="grid-area: max;"
		>
			<svelte:fragment slot="label">Max.</svelte:fragment>
		</Field>
		<Range min={COST_MIN} max={COST_MAX} step={COST_STEP} ticks={10000} style="grid-area: range;">
			<svelte:fragment slot="tick" let:tick>
				{cadformatter.format(tick)}
			</svelte:fragment>
			<RangeGroup
				bind:from={form_cost_range[0]}
				pushpull
				draggable
				bind:to={form_cost_range[1]}
				maxdelta={COST_MAX_DELTA}
			/>
			<RangeThumb name="cost_range_min" bind:value={form_cost_range[0]} let:value />
			<RangeThumb name="cost_range_costmax" bind:value={form_cost_range[1]} />
		</Range>
	</fieldset>
	<input type="hidden" name="cost_range" readonly value="[{form_cost_range.toString()}]" />
</EditorFormgroup>

<style lang="scss">
	fieldset {
		max-width: var(--ui-width-md);
		display: grid;
		flex-direction: row;
		gap: 2rem;
		margin-top: 2rem;
		grid-template-areas: 'min range range range range max';
		grid-auto-flow: dense;

		@include tablet {
			grid-template-areas:
				'min		max'
				'range	range';
		}
	}
</style>
