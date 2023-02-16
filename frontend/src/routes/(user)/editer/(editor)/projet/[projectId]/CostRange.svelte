<script lang="ts">
	import { page } from '$app/stores';
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import RangeThumb from '$components/Range/RangeThumb.svelte';
	import { cadformatter } from '$utils/format';
	import type { PageData } from './$types';
	import { COST_MAX, COST_MAX_DELTA, COST_MIN, COST_STEP, dirty } from './common';

	$: [costmin, costmax] = ($page.data as PageData).project.cost_range;

	$: form_costmin = costmin;
	$: form_costmax = costmax;

	$: $dirty.cost_range = form_costmin !== costmin || form_costmax !== costmax;

	function checkMin() {
		form_costmin = Math.max(COST_MIN, Math.min(form_costmin, COST_MAX, form_costmax));
	}

	function checkMax() {
		form_costmax = Math.min(COST_MAX, Math.max(form_costmax, COST_MIN, form_costmin));
	}
</script>

<section class="editor-section">
	<h3 class="legend">Fourchette de coûts</h3>
	<div class="ui-info">
		Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec lequel
		vous êtes confortable.
	</div>
	<fieldset class="fields">
		<Field
			type="number"
			prefix="C$ "
			min={COST_MIN}
			max={Math.min(COST_MAX, form_costmax)}
			step={COST_STEP}
			bind:value={form_costmin}
			on:change={checkMin}
			style="grid-area: min;"
		>
			<svelte:fragment slot="label">Min.</svelte:fragment>
		</Field>
		<Field
			type="number"
			prefix="C$ "
			min={Math.max(COST_MIN, form_costmin)}
			max={COST_MAX}
			step={COST_STEP}
			bind:value={form_costmax}
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
				bind:from={form_costmin}
				pushpull
				draggable
				bind:to={form_costmax}
				maxdelta={COST_MAX_DELTA}
			/>
			<RangeThumb name="cost_range_min" bind:value={form_costmin} let:value />
			<RangeThumb name="cost_range_costmax" bind:value={form_costmax} />
		</Range>
	</fieldset>
	<input type="hidden" name="cost_range" readonly value="[{form_costmin},{form_costmax}]" />
</section>

<style lang="scss">
	.ui-info {
		max-width: var(--ui-width-sm);
	}

	fieldset {
		display: grid;
		flex-direction: row;
		gap: 2rem;
		margin-top: 2rem;
		grid-template-areas: 'min range range range range max';
		grid-auto-flow: dense;

		@include tablet {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
