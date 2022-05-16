<script lang="ts">
	import ProjectsList from '$components/complexes/ProjectsList.svelte';
	import Button from '$components/primitives/Button.svelte';
	import { sizes } from '$utils/sizes';

	export let projectsPreview;
	export let organisationsPreview;
	export let actorsPreview;

	let projects = [];

	const buttonSize = sizes.small;
	const buttonVariant = 'secondary';
</script>

<article>
	<section id="projects">
		<header>
			<a href="/projets">
				<h2>Projets</h2>
				<Button size={buttonSize} variant={buttonVariant} href="/projets" sveltekit:prefetch icon="plus"
					>Voir plus</Button
				>
			</a>
		</header>
		<ProjectsList {projects} display="row" />
	</section>
	<section id="orgs">
		<header>
			<a href="/organisations">
				<h2>Organisations</h2>
				<Button size={buttonSize} variant={buttonVariant} href="/organisations" sveltekit:prefetch icon="plus"
					>Voir plus</Button
				>
			</a>
		</header>
		<ul>[To do: orgs list and list cards]</ul>
	</section>
	<section id="actors">
		<header>
			<a href="/acteurs">
				<h2>Acteurs</h2>
				<Button size={buttonSize} variant={buttonVariant} href="/acteurs" sveltekit:prefetch icon="plus"
					>Voir plus</Button
				>
			</a>
		</header>
		<ul>[To do: actors list and list cards]</ul>
	</section>
</article>

<style lang="postcss">
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
		padding: 2rem;
		overflow: visible;
		border-bottom: 1px solid var(--color-light-500);
	}

	header {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 0;
		line-height: 0.5em;
		text-decoration: none;
		color: var(--color-dark-900);

		&:hover {
			color: var(--color-primary-300);
		}
	}

	h2 {
		display: block;
		font-weight: 400;
		font-size: var(--size-xxlarge);
		display: inline-block;
		transition: all 0.2s ease-out;
	}
</style>
