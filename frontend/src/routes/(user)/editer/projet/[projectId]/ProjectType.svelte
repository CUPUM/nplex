<script lang="ts">
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { PageData } from './$types';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

	export let data: PageData;
	export let formproject: PageData['project'];
	export let typeTooltip: boolean;
</script>

<ProjectFormGroup>
	<svelte:fragment slot="legend">Type de projet</svelte:fragment>
	<Tooltip
		opened={typeTooltip}
		message={!formproject.type_id ? 'Commencez par sélectionner un type de projet.' : null}
		place="bottom"
		passive
	>
		<Switch bind:group={formproject.type_id} name="type_id">
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
