<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import type { PageData } from './$types';
	import { ADJACENT_STREETS_MAX, ADJACENT_STREETS_MIN, project } from './common';

	export let adjacentStreets: PageData['project']['adjacent_streets'];

	function increment() {
		$project.adjacent_streets = Math.min(
			ADJACENT_STREETS_MAX,
			($project.adjacent_streets ?? 0) + 1
		);
	}

	function decrement() {
		$project.adjacent_streets = Math.max(
			ADJACENT_STREETS_MIN,
			($project.adjacent_streets ?? 0) - 1
		);
	}
</script>

<fieldset class="site-formgroup">
	<legend class="site-formgroup-legend">Rues/ruelles adjacentes</legend>
	<section>
		<Field
			readonly
			type="number"
			variant="outlined"
			name="adjacent_streets"
			bind:value={$project.adjacent_streets}
			min={ADJACENT_STREETS_MIN}
			max={ADJACENT_STREETS_MAX}
			textAlign="center"
			style="width: 160px;"
		>
			<Button equi slot="leading" on:pointerdown={decrement}><Icon name="minus" /></Button>
			<Button equi slot="trailing" on:pointerdown={increment}><Icon name="plus" /></Button>
		</Field>
	</section>
</fieldset>

<style lang="scss">
</style>
