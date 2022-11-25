<script lang="ts">
	import type { LayoutData } from './$types';
	import EditablesList from './EditablesList.svelte';
	import EditablesProjectCard from './EditablesProjectCard.svelte';

	export let data: LayoutData;
</script>

<slot />
<header>
	<h2>Fiches éditables</h2>
</header>
<EditablesList title="Projets" data={data.projects} let:datum>
	{#if datum.id === 'placeholder'}
		<a href="/editer/projet">Démarrer un nouveau projet</a>
	{:else}
		<EditablesProjectCard {datum} />
	{/if}
</EditablesList>

<style lang="scss">
	header {
		padding: 2rem;
	}
</style>
