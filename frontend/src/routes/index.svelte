<script lang="ts">
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import ProjectsListItem from '$components/complexes/ProjectsListItem.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Link from '$components/primitives/Link.svelte';
	import { sizes } from '$utils/sizes';
	import { fade } from 'svelte/transition';

	export let projectsPreview;
	export let organisationsPreview;
	export let actorsPreview;

	let projects = [];
</script>

<article>
	<section id="projects">
		<header>
			<Link href="/projets" text="Projets" />
			<Button size={sizes.small} href="/projets" sveltekit:prefetch icon="plus">Voir plus</Button>
		</header>
		<ProjectsList {projects} display="row" />
	</section>
	<section id="orgs">
		<header>
			<h2>Organisations</h2>
			<Button size={sizes.small} href="/organisations" sveltekit:prefetch icon="plus">Voir plus</Button>
		</header>
		<ul>[To do: orgs list and list cards]</ul>
	</section>
	<section id="actors">
		<header>
			<h2>Acteurs</h2>
			<Button size={sizes.small} href="/acteurs" sveltekit:prefetch icon="plus">Voir plus</Button>
		</header>
		<ul>[To do: actors list and list cards]</ul>
	</section>
</article>

<style>
	article {
		width: 100%;
		margin: 0;
		padding: 0;
		display: block;
	}

	section {
		display: block;
		position: relative;
		width: 100%;
		padding: 2rem 0;
		overflow: visible;
	}

	header {
	}

	h2 {
		display: inline-block;
	}
</style>
