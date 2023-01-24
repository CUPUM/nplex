<script lang="ts">
	import type { DeepUndefinable } from 'ts-essentials';
	import { formProject } from '../common';
	import type { PageData } from './$types';

	export let data: PageData;

	type UndefinableSecondaryUsages = DeepUndefinable<(typeof data.project.secondary_usages)[number]>;

	const btn = {
		id: 'btn',
	};

	function add() {
		($formProject.secondary_usages as UndefinableSecondaryUsages[]).push({
			category_id: undefined,
			usage_id: undefined,
		});
	}

	$: secondaryUsages = [btn];
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Usage(s) secondaire(s)</legend>
	<section class="formgroup-fields">
		<ul>
			{#each secondaryUsages as su (su.id)}
				<li />
			{/each}
		</ul>
	</section>
</fieldset>

<style lang="scss">
</style>
