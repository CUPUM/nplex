<script lang="ts">
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import EditorDescriptorsLinkCard from './EditorDescriptorsLinkCard.svelte';
	import { PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';
</script>

<header in:fly={{ y: 12, easing: cubicOut, duration: 350 }}>
	<h1 class="heading-xl">Gérez les listes contrôlées des descripteurs de projet</h1>
</header>
<ul>
	{#each Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES) as route, i}
		<li in:fly={{ x: -12, duration: 350, easing: expoOut, delay: i * 100 }}>
			<EditorDescriptorsLinkCard href={route.pathname}>{route.title}</EditorDescriptorsLinkCard>
		</li>
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
		background-color: col(primary, 100, 0.25);
		border-radius: var(--ui-radius-lg);
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.002));
	}

	h1 {
		color: transparent;
		max-width: var(--ui-width-md);
		-webkit-text-stroke: 1px col(primary, 700);
	}

	ul {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}
</style>
