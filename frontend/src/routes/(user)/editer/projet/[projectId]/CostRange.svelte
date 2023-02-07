<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import RangeThumb from '$components/Range/RangeThumb.svelte';
	import { cadformatter } from '$utils/format';
	import type { PageData } from './$types';
	import { COST_MAX, COST_MIN, COST_STEP, dirty } from './common';

	export let cost_range: PageData['project']['cost_range'];

	let _cost_range = [...cost_range];

	$: $dirty.cost_range = _cost_range[0] !== cost_range[0] || _cost_range[1] !== cost_range[1];

	function checkMin() {
		_cost_range[0] = Math.max(COST_MIN, Math.min(_cost_range[0], COST_MAX, _cost_range[1]));
		_cost_range = _cost_range;
	}

	function checkMax() {
		_cost_range[1] = Math.min(COST_MAX, Math.max(_cost_range[1], COST_MIN, _cost_range[0]));
		_cost_range = _cost_range;
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
				max={Math.min(COST_MAX, _cost_range[1])}
				step={COST_STEP}
				bind:value={_cost_range[0]}
				on:change={checkMin}
			>
				<svelte:fragment slot="label">Min.</svelte:fragment>
			</Field>
			<Field
				type="number"
				prefix="C$ "
				min={Math.max(COST_MIN, _cost_range[0])}
				max={COST_MAX}
				step={COST_STEP}
				bind:value={_cost_range[1]}
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
			<RangeGroup bind:from={_cost_range[0]} push draggable bind:to={_cost_range[1]} />
			<RangeThumb name="cost_range_min" bind:value={_cost_range[0]} let:value />
			<RangeThumb name="cost_range_max" bind:value={_cost_range[1]} />
		</Range>
		<input type="hidden" name="cost_range" readonly value="[{_cost_range}]" />
	</section>
</fieldset>

<style lang="scss">
	section {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: 3rem;

		@include breakpoint.tablet {
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
