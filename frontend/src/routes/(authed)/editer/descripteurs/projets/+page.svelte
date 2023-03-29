<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import EditorDescriptorsLinkCard from './EditorDescriptorsLinkCard.svelte';
	import { PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';
</script>

<ul>
	{#each Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES) as route, i}
		<li in:fly={{ x: -12, duration: 350, easing: expoOut, delay: i * 100 }}>
			<EditorDescriptorsLinkCard href={route.pathname}>{route.title}</EditorDescriptorsLinkCard>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: var(--ui-gap-sm);
	}
</style>
