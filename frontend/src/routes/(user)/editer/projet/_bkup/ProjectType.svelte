<script lang="ts">
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { PageData } from './$types';
	import { formProject, typeTooltip } from './common';

	export let data: PageData;
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Type de projet</legend>
	<section class="formgroup-fields">
		<Tooltip
			bind:opened={$typeTooltip}
			message={$formProject.type_id === null
				? 'Commencez par sélectionner un type de projet.'
				: null}
			place="bottom"
			passive
		>
			<Switch bind:group={$formProject.type_id} name="type_id" variant="outlined">
				{#each data.descriptors.types as d}
					<SwitchItem value={d.id}>
						{d.title}
					</SwitchItem>
				{/each}
			</Switch>
		</Tooltip>
	</section>
</fieldset>

<style lang="scss">
</style>
