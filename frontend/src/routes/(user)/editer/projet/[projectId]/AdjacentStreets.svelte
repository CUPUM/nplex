<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import type { PageData } from './$types';
	import { ADJACENT_STREETS_MAX, ADJACENT_STREETS_MIN, dirty } from './common';

	export let adjacent_streets: PageData['project']['adjacent_streets'];

	$: _adjacent_streets = adjacent_streets;

	$: $dirty.adjacent_streets = _adjacent_streets != adjacent_streets;

	function increment() {
		_adjacent_streets = Math.min(ADJACENT_STREETS_MAX, (_adjacent_streets ?? 0) + 1);
	}

	function decrement() {
		_adjacent_streets = Math.max(ADJACENT_STREETS_MIN, (_adjacent_streets ?? 0) - 1);
	}
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Rues/ruelles adjacentes</legend>
	<section class="formfields">
		<Field
			readonly
			type="number"
			name="adjacent_streets"
			bind:value={_adjacent_streets}
			min={ADJACENT_STREETS_MIN}
			max={ADJACENT_STREETS_MAX}
			textAlign="center"
			style="width: 160px;"
		>
			<Button equi variant="ghost" slot="leading" on:pointerdown={decrement}>
				<Icon name="minus" />
			</Button>
			<Button equi variant="ghost" slot="trailing" on:pointerdown={increment}>
				<Icon name="plus" />
			</Button>
		</Field>
	</section>
</fieldset>

<style lang="scss">
</style>
