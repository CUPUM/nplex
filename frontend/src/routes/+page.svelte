<script lang="ts">
	import { reveal, type RevealOptions } from '$actions/reveal';
	import { flyRotate, slipMask } from '$utils/presets/reveal';
	import type { PageData } from './$types';

	export let data: PageData;

	const revealH2: RevealOptions = { ...slipMask, splitDelimiter: '' };
</script>

<article id="intro">
	<header>
		<h1 use:reveal={flyRotate}>
			Bienvenue sur Nplex
			<span>la plateforme de valorisation des petits projets exemplaires en aménagement à Montréal</span>
		</h1>
	</header>
	<section id="presentation">
		<p>Cette application web lorem ipsum...</p>
	</section>
</article>
<article class="core-grid" id="explore">
	<section id="projects">
		<header>
			<a href="/projets">
				<h2 use:reveal={revealH2}>Projets</h2>
			</a>
		</header>
		{JSON.stringify(data.projectsPreview)}
	</section>
	<section id="organisations">
		<header>
			<a href="/organisations">
				<h2 use:reveal={revealH2}>Organisations</h2>
			</a>
		</header>
		{JSON.stringify(data.organisationsPreview)}
	</section>
	<section id="actors">
		<header>
			<a href="/acteurs">
				<h2 use:reveal={revealH2}>Acteurs</h2>
			</a>
		</header>
		{JSON.stringify(data.actorsPreview)}
	</section>
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

	#explore {
		grid-column: full;
	}

	#projects,
	#organisations,
	#actors {
		padding-block: 8rem;
		display: grid;
		grid-column: full;
		grid-template-columns: inherit;
		border-top: 1px solid rgba(var(--rgb-dark-900), 0.1);

		& header {
			display: flex;
			grid-column: main;
			padding: 0;
			margin: 0;
		}
	}
</style>
