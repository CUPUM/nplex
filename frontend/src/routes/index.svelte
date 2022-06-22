<script lang="ts">
	import { backgroundColor } from '$stores/backgroundColor';
	import { showCategory } from '$stores/search';
	import { onDestroy, onMount } from 'svelte';

	export let projectsPreview;
	export let organisationsPreview;
	export let actorsPreview;

	showCategory.set(true);

	onMount(() => {});

	onDestroy(() => {
		showCategory.set(false);
		backgroundColor.reset();
	});
</script>

<article class="core-grid" id="intro">
	<header id="intro-header">
		<h1>
			Bienvenue sur Nplex <br />
			<span class="subheading">
				la plateforme de valorisation des petits projets exemplaires en aménagement à Montréal
			</span>
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
		<ul>[To do: projects list and list cards]</ul>
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
	}

	#intro-header {
		grid-column: full;
		display: grid;
		grid-template-columns: inherit;
		flex-direction: column;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		color: var(--color-dark-900);
		padding-block: var(--navbar-height);

		& h1 {
			grid-column: main;
		}
	}

	.subheading {
		color: transparent;
		-webkit-text-stroke: 1px var(--color-dark-900);
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
