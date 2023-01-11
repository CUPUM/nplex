<script lang="ts">
	import Range from '$components/Range.svelte';
	import RangeGroup from '$components/RangeGroup.svelte';
	import RangeThumb from '$components/RangeThumb.svelte';
	import type { PageData } from './$types';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

	export let data: PageData;
	export let formproject: PageData['project'];
</script>

<ProjectFormGroup>
	<svelte:fragment slot="legend">Fourchette de coûts</svelte:fragment>
	<Range min={0} max={500000} step={1}>
		<RangeGroup bind:from={data.project.cost_range[0]} bind:to={data.project.cost_range[1]} />
		<RangeThumb name="cost_range_min" bind:value={data.project.cost_range[0]} />
		<RangeThumb name="cost_range_max" bind:value={data.project.cost_range[1]} />
	</Range>
	<label>
		Min
		<input
			type="range"
			min="0"
			max="500000"
			step="1"
			bind:value={data.project.cost_range[0]}
			name="cost_range_min"
			id=""
		/>
	</label>
	<label>
		Max
		<input
			type="range"
			min="0"
			max="500000"
			step="1"
			bind:value={data.project.cost_range[1]}
			name="cost_range_max"
			id=""
		/>
	</label>
	<input type="hidden" name="cost_range" value={JSON.stringify(formproject.cost_range)} />
</ProjectFormGroup>

<style lang="scss">
</style>
