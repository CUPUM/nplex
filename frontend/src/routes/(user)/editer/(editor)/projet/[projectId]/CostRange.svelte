<script lang="ts">
	import { page } from '$app/stores';
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import RangeThumb from '$components/Range/RangeThumb.svelte';
	import { cadformatter } from '$utils/format';
	import type { PageData } from './$types';
	import { COST_MAX, COST_MIN, COST_STEP, dirty } from './common';

	$: [costmin, costmax] = ($page.data as PageData).project.cost_range;

	$: _costmin = costmin;
	$: _costmax = costmax;

	$: $dirty.cost_range = _costmin !== costmin || _costmax !== costmax;

	function checkMin() {
		_costmin = Math.max(COST_MIN, Math.min(_costmin, COST_MAX, _costmax));
	}

	function checkMax() {
		_costmax = Math.min(COST_MAX, Math.max(_costmax, COST_MIN, _costmin));
	}
</script>

<fieldset class="formgroup">
	<legend class="formlegend">
		Fourchette de coûts
		<p class="forminfo">
			Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec
			lequel vous êtes confortable.
		</p>
	</legend>
	<section class="formfields">
		<div class="fields">
			<Field
				type="number"
				prefix="C$ "
				min={COST_MIN}
				max={Math.min(COST_MAX, _costmax)}
				step={COST_STEP}
				bind:value={_costmin}
				on:change={checkMin}
			>
				<svelte:fragment slot="label">Min.</svelte:fragment>
			</Field>
			<Field
				type="number"
				prefix="C$ "
				min={Math.max(COST_MIN, _costmin)}
				max={COST_MAX}
				step={COST_STEP}
				bind:value={_costmax}
				on:change={checkMax}
			>
				<svelte:fragment slot="label">Max.</svelte:fragment>
			</Field>
		</div>
		<Range
			style="flex: 1; padding-inline: 2rem;"
			min={COST_MIN}
			max={COST_MAX}
			step={COST_STEP}
			ticks={10000}
		>
			<svelte:fragment slot="tick" let:tick>
				{cadformatter.format(tick)}
			</svelte:fragment>
			<RangeGroup bind:from={_costmin} push draggable bind:to={_costmax} />
			<RangeThumb name="cost_range_min" bind:value={_costmin} let:value />
			<RangeThumb name="cost_range_costmax" bind:value={_costmax} />
		</Range>
		<input type="hidden" name="cost_range" readonly value="[{_costmin},{_costmax}]" />
	</section>
</fieldset>

<style lang="scss">
	section {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: 3rem;

		@include tablet {
			flex-direction: column;
			gap: 3rem;
		}
	}

	.fields {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}
</style>
