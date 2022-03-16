<script lang="ts">
	import Icon from '$components/primitives/Icon.svelte';
	import { showProjectsFilters } from '$stores/projects';
	import { term } from '$stores/search';
</script>

<fieldset>
	<input id="search" type="search" bind:value={$term} />
	<label for="search"><Icon name="user" size="1em" color="red" /></label>
	<button type="button" on:click={showProjectsFilters.toggle}>Filtres</button>
	<button type="submit">Chercher</button>
</fieldset>

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
