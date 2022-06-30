<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				categoryIsResetable: true,
			},
		};
	}
</script>

<script lang="ts">
	import ProjectGallery from '$components/complexes/ProjectGallery.svelte';
	import ProjectHeader from '$components/complexes/ProjectHeader.svelte';
	import ProjectTimeline from '$components/complexes/ProjectTimeline.svelte';
	import type { Project } from '$utils/dummy';
	import { scale } from 'svelte/transition';

	/**
	 * To do: use proper types exported from supabase.
	 */
	export let project: Project;
</script>

<article in:scale={{ start: 0.9 }}>
	<ProjectHeader />
	<!-- Descripteurs sommaires -->
	<ProjectGallery />
	<!-- Lieu & contexte -->
	<!-- Projet -->
	<!-- Timeline -->
	<ProjectTimeline />
</article>
<aside class="border-top">
	<header>Vous aimerez peut-être aussi:</header>
	<div>
		<section>Suggestions de projets</section>
		<section>Organisations</section>
		<section>Acteurs</section>
	</div>
</aside>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
	}

	aside {
		padding: 2rem;
	}
</style>
