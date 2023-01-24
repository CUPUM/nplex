<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import { formProject } from '../common';
	import type { PageData } from './$types';

	export let data: PageData;

	const MAX = 5;
	const MIN = 0;

	function increment() {
		$formProject.adjacent_streets = Math.min(MAX, ($formProject.adjacent_streets ?? 0) + 1);
	}

	function decrement() {
		$formProject.adjacent_streets = Math.max(MIN, ($formProject.adjacent_streets ?? 0) - 1);
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
			bind:value={$formProject.adjacent_streets}
			min={MIN}
			max={MAX}
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
