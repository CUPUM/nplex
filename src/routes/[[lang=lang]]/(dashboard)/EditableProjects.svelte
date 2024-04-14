<script lang="ts">
	import CardProject from '$lib/components/CardProject.svelte';
	import { link } from '$lib/i18n/link';
	import type { LayoutData } from './$types';

	export let projects: LayoutData['editableProjects'];
</script>

<ul>
	{#await projects}
		{#each { length: 5 } as skeleton}
			<li class="skeleton"></li>
		{/each}
	{:then ep}
		{#each ep as project}
			<li>
				<CardProject {...$link(`/edit/projects/${project.id}`)} title={project.id} />
			</li>
		{/each}
	{/await}
</ul>

<style>
	ul {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: var(--base-gutter);
	}

	li {
		flex: none;
	}
</style>
