<script lang="ts">
	import { reveal, type RevealOptions } from '$actions/reveal';
	import { flyRotate, slipMask } from '$utils/presets/reveal';
	import type { PageData } from './$types';
	import PreviewList from './PreviewList.svelte';

	export let data: PageData;

	const revealH2: RevealOptions = { ...slipMask, splitDelimiter: '' };
</script>

<article id="intro">
	<header>
		<h1 use:reveal={flyRotate}>
			Bienvenue sur Nplex
			<span>La plateforme de valorisation des petits projets exemplaires en aménagement à Montréal</span>
		</h1>
	</header>
	<section id="presentation">
		<p>Cette application web lorem ipsum...</p>
	</section>
</article>
<article id="previews">
	<PreviewList id="projects" header="Projets" href="/projets" data={data.projectsPreview}>
		<li>test</li>
	</PreviewList>
	<PreviewList id="organisations" header="Organisations" href="/organisations" data={data.organisationsPreview}>
		<li>test</li>
	</PreviewList>
	<PreviewList id="actors" header="Acteurs" href="/actors" data={data.actorsPreview}>
		<li>test</li>
	</PreviewList>
</article>

<style lang="scss">
	#intro {
		display: flex;
		flex: none;
		flex-direction: column;
		align-items: center;
		margin-top: calc(var(--navbar-height, 0px) * -1);
		width: 100%;

		header {
			@include mixins.core-grid;
			align-items: center;
			min-height: 100vh;
			padding: 4rem;
			margin-bottom: 8rem;
			color: var(--color-dark-900);
		}

		h1 {
			grid-column: main;
			margin: 0;
		}

		span {
			font-weight: 200;
		}
	}

	#intro-text {
		grid-column: main;
	}

	#previews {
		display: flex;
		flex-direction: column;
	}
</style>
