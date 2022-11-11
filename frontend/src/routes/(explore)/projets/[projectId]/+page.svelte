<script lang="ts">
	import type { PageData } from './$types';
	// import ProjectGallery from '$components/complexes/ProjectGallery.svelte';
	// import ProjectHeader from '$components/complexes/ProjectHeader.svelte';
	// import ProjectTimeline from '$components/complexes/ProjectTimeline.svelte';
	import { reveal, slipMask } from '$actions/reveal';

	export let data: PageData;
</script>

<article>
	<header>
		<img src="https://picsum.photos/seed/{data.project.id}/800/1000" alt="" />
		<h1 use:reveal={{ ...slipMask, delimiter: '', stagger: (i) => 50 + 2 * i }}>{data.project.title}</h1>
	</header>
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
		padding: 0;
		margin: 0;
	}

	header {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1rem;
		margin-top: 0;
		height: 100vh;
		// margin-top: var(--n-navbar-height-px);
	}

	h1 {
		all: unset;
		font-size: 12rem;
		color: var(--color-contrast-900);
	}

	img {
		z-index: -1;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		fit-content: fill;
		border-radius: 1rem;
		opacity: 0.5;
	}

	aside {
		padding: 2rem;
	}
</style>
