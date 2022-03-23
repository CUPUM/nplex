<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { showProjectsFilters } from '$stores/projects';
	import { term } from '$stores/search';
</script>

<fieldset>
	<Button on:click={showProjectsFilters.toggle}>Filtres</Button>
	<Field id="search" type="search" bind:value={$term}>
		<svelte:fragment slot="left">
			<Icon name="info" />
		</svelte:fragment>
		<svelte:fragment slot="right">
			<Button type="submit">Chercher</Button>
		</svelte:fragment>
	</Field>
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
		border: none;
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
