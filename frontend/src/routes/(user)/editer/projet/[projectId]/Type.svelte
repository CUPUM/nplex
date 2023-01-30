<script lang="ts">
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import type { PageData } from './$types';
	import { descriptors, dirty, _type_id } from './common';

	export let type_id: PageData['project']['type_id'];

	$: $_type_id = type_id;

	$: $dirty.type_id = $_type_id !== type_id;
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Type de projet</legend>
	<section class="formfields">
		<Switch bind:group={$_type_id} name="type_id">
			{#each $descriptors.types as type}
				<SwitchItem value={type.id}>
					{type.title}
				</SwitchItem>
			{/each}
		</Switch>
	</section>
</fieldset>

<style lang="scss">
</style>
