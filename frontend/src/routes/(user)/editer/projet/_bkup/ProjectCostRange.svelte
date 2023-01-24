<script lang="ts">
	import Field from '$components/Field.svelte';
	import Range from '$components/Range.svelte';
	import RangeGroup from '$components/RangeGroup.svelte';
	import RangeThumb from '$components/RangeThumb.svelte';
	import { cadformatter } from '$utils/format';
	import type { PageData } from './$types';
	import { formProject } from './common';

	const min = 0;
	const max = 50000;
	const delta = 10000;
	const step = 10;

	export let data: PageData;
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
		<Range {min} {max} {step} ticks={10000}>
			<svelte:fragment slot="tick" let:tick>
				{cadformatter.format(tick)}
			</svelte:fragment>
			<RangeGroup
				bind:from={$formProject.cost_range[0]}
				push
				draggable
				bind:to={$formProject.cost_range[1]}
			/>
			<RangeThumb name="cost_range_min" bind:value={$formProject.cost_range[0]} let:value />
			<RangeThumb name="cost_range_max" bind:value={$formProject.cost_range[1]} />
		</Range>
		<div class="fields">
			<Field type="number" prefix="C$ " {min} {max} {step} bind:value={$formProject.cost_range[0]}>
				<svelte:fragment slot="label">Min.</svelte:fragment>
			</Field>
			<Field type="number" prefix="C$ " {min} {max} {step} bind:value={$formProject.cost_range[1]}>
				<svelte:fragment slot="label">Max.</svelte:fragment>
			</Field>
		</div>
		<input type="hidden" name="cost_range" readonly value="[{$formProject.cost_range}]" />
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
