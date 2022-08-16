<script lang="ts">
	import { flyRotate } from '$actions/reveal/presets';
	import { reveal } from '$actions/reveal/reveal';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article id="intro">
	<header id="intro-header">
		<h1 use:reveal={flyRotate}>
			Bienvenue sur Nplex<br /><span class="subheading"
				>la plateforme de valorisation des petits projets exemplaires en aménagement à</span
			> Montréal
		</h1>
	</header>
	<p id="intro-text">Cette application web lorem ipsum...</p>
</article>
<article class="core-grid" id="explore">
	<section id="projects">
		<header>
			<a href="/projets">
				<h2>Projets</h2>
			</a>
		</header>
		<ul>[To do: proflyRotate list and list cards]</ul>
	</section>
	<section id="organisations">
		<header>
			<a href="/organisations">
				<h2>Organisations</h2>
			</a>
		</header>
		<ul>[To do: orgs list and list cards]</ul>
	</section>
	<section id="actors">
		<header>
			<a href="/acteurs">
				<h2>Acteurs</h2>
			</a>
		</header>
		<ul>[To do: actors list and list cards]</ul>
	</section>
</article>

<style lang="scss">
	#intro {
		padding-bottom: 8rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 0 2rem;
		margin-top: calc(var(--navbar-height, 0px) * -1);
	}

	#intro-header {
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		color: var(--color-dark-900);
	}

	.subheading {
		font-weight: 100;
		// color: transparent;
		// -webkit-text-stroke: 1px var(--color-primary-500);
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

		& ul {
			grid-column: full;
			height: 50vh;
		}
	}
</style>
