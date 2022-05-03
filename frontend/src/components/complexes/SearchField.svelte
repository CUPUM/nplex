<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { showProjectsFilters } from '$stores/projects';
	import { route } from '$stores/route';
	import { category, term } from '$stores/search';
	import { sizes } from '$utils/sizes';
	import { expoIn } from 'svelte/easing';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<fieldset in:fly={{ y: 30, duration: 500, easing: expoOut }}>
	<Field
		type="search"
		size={sizes.large}
		placeholder={$route.searchable && $route.parentTopRoute
			? `Chercher parmi les ${$route.title.toLowerCase()}`
			: 'Chercher'}
		placeholderIcon="search"
		style="flex: 1;"
		bind:value={$term}
	>
		<svelte:fragment slot="right">
			{#if $term}
				<Button type="submit" icon="submit" slot="right" />
			{/if}
		</svelte:fragment>
	</Field>

	<Button
		size={sizes.large}
		type="normal"
		icon="filters"
		on:click={showProjectsFilters.toggle}
		active={$showProjectsFilters}>Filtres</Button
	>
</fieldset>

<style lang="postcss">
	fieldset {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: row;
		border: none;
		padding: 0;
		margin: 0;
		border-radius: 1em;
	}
</style>
