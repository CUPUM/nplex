<script lang="ts">
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { PageData } from './$types';
	import { formProject, typeTooltip } from './common';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

	export let data: PageData;
</script>

<ProjectFormGroup>
	<svelte:fragment slot="legend">Type de projet</svelte:fragment>
	<Tooltip
		bind:opened={$typeTooltip}
		message={$formProject.type_id === null ? 'Commencez par sélectionner un type de projet.' : null}
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
</ProjectFormGroup>

<style lang="scss">
</style>
