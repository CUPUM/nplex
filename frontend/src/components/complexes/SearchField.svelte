<script lang="ts">
	import Field from '$components/primitives/Field.svelte';
	import FieldButton from '$components/primitives/FieldButton.svelte';
	import FieldIcon from '$components/primitives/FieldIcon.svelte';
	import FieldSet from '$components/primitives/FieldSet.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { showProjectsFilters } from '$stores/projects';
	import { term } from '$stores/search';
</script>

<FieldSet>
	<Field id="search" type="search" bind:value={$term} />
	<FieldIcon />
	<FieldButton on:click={showProjectsFilters.toggle}>Filtres</FieldButton>
	<FieldButton type="submit">Chercher</FieldButton>
</FieldSet>

<style>
	fieldset {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: row;
		border: none;
		padding: 0;
		background-color: var(--color-light-100);
		border-radius: 1em;
	}

	input[type='search'] {
		flex: 1;
		padding-right: 2em;
		border: none;
		border-radius: 0.9em;
		outline: none;
	}

	button {
		border: none;
	}

	button[type='button'] {
		margin-right: 1em;
		background-color: transparent;
	}

	button[type='submit'] {
		background-color: transparent;
	}
</style>
