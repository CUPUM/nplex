<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import { cadformatter } from '$utils/format';
	import {
		PROJECT_COST_MAX_BIG,
		PROJECT_COST_MAX_DELTA_R,
		PROJECT_COST_MAX_SMALL,
		PROJECT_COST_MIN,
		PROJECT_COST_STEP,
	} from '../constants';
	import { maxCostDelta } from '../schemas';
	import { project } from './common';

	let smallScale = false;
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Fourchette de coûts</h3>
	<p>
		Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec lequel
		vous êtes confortable.
	</p>
	<p class="subtle">
		Notez qu'un écart maximum est imposé pour assurer un minimum de précision dans les données. Cet
		écart est établi dynamiquement à {PROJECT_COST_MAX_DELTA_R * 100}% de la valeur moyenne de votre
		sélection.
	</p>
	<p class="flex flex-r gap-md align-i-c">
		<span class="text-sm">
			<Toggle bind:checked={smallScale}>
				<svelte:fragment slot="off">Grands-coûts</svelte:fragment>
				<svelte:fragment slot="on">Coûts modestes</svelte:fragment>
			</Toggle>
		</span>
		<span class="subtle">Ajuster l'échelle pour des coûts plus modestes?</span>
	</p>
	<fieldset class="fields">
		<Field
			variant="default"
			type="number"
			suffix=" $ CA"
			textAlign="start"
			min={PROJECT_COST_MIN}
			max={PROJECT_COST_MAX_BIG}
			step={PROJECT_COST_STEP}
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
			min={PROJECT_COST_MIN}
			max={PROJECT_COST_MAX_BIG}
			step={PROJECT_COST_STEP}
			bind:value={$project.cost_range[1]}
			style="grid-area: max;"
		>
			<svelte:fragment slot="label">Max.</svelte:fragment>
		</Field>
		<Range
			min={PROJECT_COST_MIN}
			max={smallScale ? PROJECT_COST_MAX_SMALL : PROJECT_COST_MAX_BIG}
			step={PROJECT_COST_STEP}
			ticks={smallScale ? 50000 : 250000}
			style="grid-area: range;"
		>
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
