<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { LayoutData } from './$types';
	import EditablesList from './EditablesList.svelte';
	import EditablesProjectCard from './EditablesProjectCard.svelte';
	export let data: LayoutData;
</script>

<slot />
<h2 class="e-h2">Fiches éditables</h2>
<EditablesList title="Projets" data={data.projects} let:datum>
	{#if datum.id === 'placeholder'}
		<a href="/editer/projet">Démarrer un nouveau projet</a>
	{:else}
		<EditablesProjectCard {datum} />
	{/if}
</EditablesList>

<style lang="scss">
	// Editor heading
	:global(.e-h2) {
		display: block;
		padding: var(--ui-space-medium) 0;
		text-align: center;
		font-size: var(--ui-size-x4large);
		max-width: var(--ui-display-medium);
		// text-transform: uppercase;
		line-height: 1;
		// letter-spacing: -0.01em;
		width: 100%;
		margin: 0 auto;
		color: col(fg, 500);
		font-weight: 500;
	}

	// Editor subheading
	:global(.e-h3) {
		display: block;
		padding: var(--ui-space-small) 0;
		text-align: left;
		max-width: var(--ui-display-large);
		color: col(fg, 500);
		font-size: var(--ui-size-x2large);
		font-weight: 550;
		width: 100%;
		margin: 0 auto;
	}
</style>
