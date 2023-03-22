<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import { cadformatter } from '$utils/format';
	import { COST_MAX, COST_MIN, COST_STEP, maxCostDelta, projectData } from './common';
</script>

<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Fourchette de coûts</h3>
	<p class="info">
		Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec lequel
		vous êtes confortable.
	</p>
	<fieldset class="fields">
		<Field
			variant="outlined"
			type="number"
			suffix=" $ CA"
			textAlign="start"
			min={COST_MIN}
			max={COST_MAX}
			step={COST_STEP}
			bind:value={$projectData.cost_range[0]}
			style="grid-area: min;"
		>
			<svelte:fragment slot="label">Min.</svelte:fragment>
		</Field>
		<Field
			variant="outlined"
			type="number"
			suffix=" $ CA"
			textAlign="start"
			min={COST_MIN}
			max={COST_MAX}
			step={COST_STEP}
			bind:value={$projectData.cost_range[1]}
			style="grid-area: max;"
		>
			<svelte:fragment slot="label">Max.</svelte:fragment>
		</Field>
		<Range min={COST_MIN} max={COST_MAX} step={COST_STEP} ticks={25000} style="grid-area: range;">
			<svelte:fragment slot="tick" let:tick>
				{cadformatter.format(tick)}
			</svelte:fragment>
			<RangeGroup
				name="cost_range"
				pushpull
				draggable
				maxDelta={maxCostDelta(...$projectData.cost_range)}
				bind:from={$projectData.cost_range[0]}
				bind:to={$projectData.cost_range[1]}
			/>
		</Range>
	</fieldset>
</fieldset>

<style lang="scss">
	.fields {
		width: 100%;
		max-width: var(--ui-width-md);
		display: grid;
		flex-direction: row;
		gap: 2rem;
		margin-top: 2rem;
		grid-template-areas: 'min range max';
		grid-template-columns: 14ch 1fr 14ch;

		@include tablet {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'min		max'
				'range	range';
		}
	}
</style>
