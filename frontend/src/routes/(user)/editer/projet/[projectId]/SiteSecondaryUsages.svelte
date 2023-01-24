<script lang="ts">
	import type { DeepUndefinable } from 'ts-essentials';
	import type { PageData } from './$types';
	import { project } from './common';

	export let secondaryUsages: PageData['project']['secondary_usages'];

	type UndefinableSecondaryUsages = DeepUndefinable<(typeof secondaryUsages)[number]>;

	const buttonDatum = {
		id: 'btn',
	};

	function add() {
		($project.secondary_usages as UndefinableSecondaryUsages[]).push({
			category_id: undefined,
			usage_id: undefined,
		});
	}
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Usage(s) secondaire(s)</legend>
	<section class="formgroup-fields">
		<ul>
			{#each $project.secondary_usages as usage ((usage.category_id, usage.usage_id))}
				<li />
			{/each}
		</ul>
	</section>
</fieldset>

<style lang="scss">
</style>
