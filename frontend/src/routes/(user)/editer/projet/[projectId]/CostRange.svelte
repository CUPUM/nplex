<script lang="ts">
	import Field from '$components/Field.svelte';
	import Range from '$components/Range.svelte';
	import RangeGroup from '$components/RangeGroup.svelte';
	import RangeThumb from '$components/RangeThumb.svelte';
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
	<legend class="formgroup-legend">
		Fourchette de coûts
		<p>
			Indiquez approximativement les coûts totaux du projet, selon un niveau de précision avec
			lequel vous êtes confortable.
		</p>
	</legend>
	<section class="formgroup-fields">
		<Range min={COST_MIN} max={COST_MAX} step={COST_STEP} ticks={10000}>
			<svelte:fragment slot="tick" let:tick>
				{cadformatter.format(tick)}
			</svelte:fragment>
			<RangeGroup bind:from={_cost_range[0]} push draggable bind:to={_cost_range[1]} />
			<RangeThumb name="cost_range_min" bind:value={_cost_range[0]} let:value />
			<RangeThumb name="cost_range_max" bind:value={_cost_range[1]} />
		</Range>
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
		<input type="hidden" name="cost_range" readonly value="[{_cost_range}]" />
	</section>
</fieldset>

<style lang="scss">
	p {
		max-width: var(--ui-width-p);
		color: col(fg, 100, 0.35);
		margin-top: 1rem;
		font-weight: 350;
		font-size: 1rem;
		padding-right: 2rem;
	}

	section {
		align-items: stretch;
		gap: 1.5rem;
		max-width: var(--ui-width-p);
	}

	.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}
</style>
