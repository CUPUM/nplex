<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { showProjectsFilters } from '$stores/projects';
	import { term } from '$stores/search';
</script>

<div>
	<Button type="normal" on:click={showProjectsFilters.toggle} active={$showProjectsFilters}>Filtres</Button>
	<Field id="search" type="search" bind:value={$term}>
		<svelte:fragment slot="left">
			<Icon name="info" />
		</svelte:fragment>
		<svelte:fragment slot="right">
			<Button type="submit">Chercher</Button>
		</svelte:fragment>
	</Field>
</div>

<style lang="postcss">
	div {
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
</style>
