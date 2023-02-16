<script lang="ts">
	import { page } from '$app/stores';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import type { PageData } from './$types';
	import { dirty, _type_id } from './common';

	$: descriptors = ($page.data as PageData).descriptors;
	$: type_id = ($page.data as PageData).project.type_id;

	$: $_type_id = type_id;

	$: $dirty.type_id = $_type_id !== type_id;
</script>

<section class="editor-section">
	<h3 class="legend">Type de projet</h3>
	<Switch style="align-self: flex-start" variant="default" bind:group={$_type_id} name="type_id">
		{#each descriptors.types as type}
			<SwitchItem value={type.id}>
				{type.title}
			</SwitchItem>
		{/each}
	</Switch>
</section>

<style lang="scss">
</style>
