<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { showCategory } from '$stores/search';
	import { sizes } from '$utils/sizes';
	import { onDestroy, onMount } from 'svelte';

	export let projectsPreview;
	export let organisationsPreview;
	export let actorsPreview;

	let projects = [];

	const buttonSize = sizes.small;
	const buttonVariant = 'secondary';

	showCategory.set(true);

	onMount(() => {
		// backgroundColor.set(colors.light[500]);
	});

	onDestroy(() => {
		showCategory.set(false);
		// backgroundColor.reset();
	});
</script>

<article class="core-grid">
	<section id="projects">
		<header>
			<a href="/projets">
				<h2>Projets</h2>
				<Button size={buttonSize} variant={buttonVariant} href="/projets" sveltekit:prefetch>
					<Icon name="plus" slot="icon" />
					Voir plus
				</Button>
			</a>
		</header>
		<ul>[To do: projects list and list cards]</ul>
	</section>
	<section id="orgs">
		<header>
			<a href="/organisations">
				<h2>Organisations</h2>
				<Button size={buttonSize} variant={buttonVariant} href="/organisations" sveltekit:prefetch>
					<Icon name="plus" slot="icon" />
					Voir plus
				</Button>
			</a>
		</header>
		<ul>[To do: orgs list and list cards]</ul>
	</section>
	<section id="actors">
		<header>
			<a href="/acteurs">
				<h2>Acteurs</h2>
				<Button size={buttonSize} variant={buttonVariant} href="/acteurs" sveltekit:prefetch>
					<Icon name="plus" slot="icon" />
					Voir plus
				</Button>
			</a>
		</header>
		<ul>[To do: actors list and list cards]</ul>
	</section>
</article>

<style lang="postcss">
	article {
		width: 100%;
		margin: 0;
		margin-top: var(--navbar-height);
		padding: 0;
		display: block;
	}

	section {
		display: block;
		position: relative;
		width: 100%;
		padding: 2rem;
		overflow: visible;
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
		font-weight: 500;
		font-size: var(--size-xxlarge);
		display: inline-block;
		transition: all 0.2s ease-out;
	}
</style>
