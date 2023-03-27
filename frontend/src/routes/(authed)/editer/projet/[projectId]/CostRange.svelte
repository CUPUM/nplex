<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import { cadformatter } from '$utils/format';
	import { COST_MAX, COST_MAX_DELTA_R, COST_MIN, COST_STEP } from '../constants';
	import { maxCostDelta } from '../schemas';
	import { project } from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Fourchette de coûts</h3>
	<p>
		Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec lequel
		vous êtes confortable.
	</p>
	<p class="subtle">
		Notez qu'un écart maximum est imposé pour assurer un minimum de précision dans les données. Cet
		écart est établi dynamiquement à {COST_MAX_DELTA_R * 100}% de la valeur moyenne de votre
		sélection.
	</p>
	<fieldset class="fields">
		<Field
			variant="default"
			type="number"
			suffix=" $ CA"
			textAlign="start"
			min={COST_MIN}
			max={COST_MAX}
			step={COST_STEP}
			bind:value={$project.cost_range[0]}
			style="grid-area: min;"
		>
			<svelte:fragment slot="label">Min.</svelte:fragment>
		</Field>
		<Field
			variant="default"
			type="number"
			suffix=" $ CA"
			textAlign="start"
			min={COST_MIN}
			max={COST_MAX}
			step={COST_STEP}
			bind:value={$project.cost_range[1]}
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
				maxDelta={maxCostDelta(...$project.cost_range)}
				bind:from={$project.cost_range[0]}
				bind:to={$project.cost_range[1]}
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
		gap: 3rem;
		margin-top: 2rem;
		grid-template-areas: 'min range max';
		grid-template-columns: 14ch 1fr 14ch;
		align-items: flex-start;

		@include tablet {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'min		max'
				'range	range';
		}
	}
</style>
