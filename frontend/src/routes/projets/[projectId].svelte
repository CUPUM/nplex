<script context="module" lang="ts">
	import ProjectHeader from '$components/complexes/ProjectHeader.svelte';
	import ProjectOverview from '$components/complexes/ProjectOverview.svelte';
	import { scale } from 'svelte/transition';
</script>

<script lang="ts">
	export let id;
	export let description;
	export let image_url = `https://picsum.photos/seed/${(Math.random() * 1000).toFixed(0)}/800/600`;
	// Fill UI progressively, starting from the project overview, if present in the global projects' store.
</script>

<article transition:scale={{ start: 0.9 }}>
	<ProjectHeader />
	<ProjectOverview />
	<section id="gallery">
		<h3>project main gallery here</h3>
	</section>
	<section id="archives">
		<h3>project historical archives here</h3>
	</section>
	<section id="description">
		<h3>project description here</h3>
		{#each description as para}
			<p>{para}</p>
		{/each}
	</section>
	<section id="timeline">
		<h3>project timeline here</h3>
	</section>
</article>

<style lang="postcss">
	article {
		width: 100%;
		margin: 0;
		/* flex: 1; */
		min-height: 100%;
		display: grid;
		gap: 2rem;
		grid-template-columns:
			[full-start]
			1fr
			[main-start left-start]
			min(90%, 30ch)
			[left-end right-start]
			min(90%, 30ch)
			[right-end main-end]
			1fr
			[full-end];
	}

	section {
		grid-column: main;
	}
</style>
