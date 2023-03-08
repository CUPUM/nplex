<script lang="ts">
	import EditorDescriptorsLinkCard from './EditorDescriptorsLinkCard.svelte';
	import { PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';
</script>

<header>
	<h1>Gérez les listes contrôlées des descripteurs de projet</h1>
</header>
<ul>
	{#each Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES) as route}
		<EditorDescriptorsLinkCard href={route.pathname}>{route.title}</EditorDescriptorsLinkCard>
	{/each}
</ul>

<style lang="scss">
	header {
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: var(--ui-pad-outer);
		margin-bottom: 1.5rem;
		background-color: col(bg, 100);
		border-radius: var(--ui-radius-lg);
		font-size: var(--ui-text-2xl);
		font-weight: 500;
		line-height: 1.2;
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.002));
	}

	h1 {
		max-width: var(--ui-width-md);
	}

	ul {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
</style>
