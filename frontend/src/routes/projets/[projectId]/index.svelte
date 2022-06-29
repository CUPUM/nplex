<script lang="ts">
	import ProjectGallery from '$components/complexes/ProjectGallery.svelte';
	import ProjectHeader from '$components/complexes/ProjectHeader.svelte';
	import ProjectTimeline from '$components/complexes/ProjectTimeline.svelte';
	import { categoryIsResetable } from '$stores/explore';
	import type { Project } from '$utils/dummy';
	import { onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';

	/**
	 * To do: use proper types exported from supabase.
	 */
	export let project: Project;

	categoryIsResetable.set(true);

	onDestroy(() => {
		categoryIsResetable.set(false);
	});
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
