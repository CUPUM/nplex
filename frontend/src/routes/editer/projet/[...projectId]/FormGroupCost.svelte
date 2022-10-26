<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { getContext } from 'svelte';
	import type { ProjectEditorContext } from './+page.svelte';
	import FormGroup from './FormGroup.svelte';

	const { formProject, freshProject, trackDirty } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);

	const min = 0;
	const max = 100000;
	const step = 1;

	const formatter = new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'CAD',
		currencyDisplay: 'narrowSymbol',
		// useGrouping: 'always',
	});

	function collide(direction: 'right' | 'left') {
		if (direction === 'right') {
			if ($formProject.cost_min > $formProject.cost_max) {
				$formProject.cost_max = $formProject.cost_min;
			}
		} else {
			if ($formProject.cost_max < $formProject.cost_min) {
				$formProject.cost_min = $formProject.cost_max;
			}
		}
	}
</script>

<FormGroup legend="Coût">
	<p>{formatter.format($formProject.cost_min)} &mdash; {formatter.format($formProject.cost_max)}</p>
	<label for="">
		<p>Min</p>
		<input
			type="range"
			{min}
			{max}
			{step}
			name="cost_min"
			id=""
			bind:value={$formProject.cost_min}
			on:input={() => collide('right')}
		/>
	</label>
	<label for="">
		<p>Max</p>
		<input
			type="range"
			{min}
			{max}
			{step}
			name="cost_max"
			id=""
			bind:value={$formProject.cost_max}
			on:input={() => collide('left')}
		/>
	</label>
</FormGroup>

<style lang="scss">
	label {
		width: 100%;
	}

	input {
		width: 100%;
	}
</style>
