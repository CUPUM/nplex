<script lang="ts">
	import { intersection } from '$actions/intersection';
	import Icon from '$components/Icon/Icon.svelte';
	import Link from '$components/Link.svelte';
	import Logo from '$components/Logo.svelte';
	import type { ComponentProps } from 'svelte';

	const mainLinks = [
		{ pathname: '/', title: 'Accueil' },
		{ pathname: '/a-propos', title: 'À propos' },
		{ pathname: '/guides', title: 'Guides' },
		{ pathname: '/equipe', title: 'Équipe' },
	];

	const exploreLinks = [
		{ pathname: '/projets', title: 'Projets' },
		{ pathname: '/organisations', title: 'Organisations' },
		{ pathname: '/acteurs', title: 'Acteurs' },
	];

	const partnersLinks = [
		{ pathname: 'https://montreal.ca/', title: 'Ville de Montréal' },
		{ pathname: 'https://designmontreal.com/', title: 'Bureau du Design' },
		{
			pathname: 'https://inven-t.umontreal.ca/accueil/',
			title: 'Centre d‘innovation technosociale',
		},
	];

	const iconOptions: Partial<ComponentProps<Icon>> = {
		top: '.25em',
		strokeWidth: 1.75,
		size: '1.25em',
	};

	let out = true;
</script>

<footer
	id="footer"
	use:intersection={{ rootMargin: '0px 0px -50px 0px' }}
	on:enter={() => (out = false)}
	on:leave={() => (out = true)}
	class:out
>
	<section id="links">
		<section id="sitemap-links">
			<div class="heading"><Icon name="map" {...iconOptions} />&ensp;Carte du site</div>
			<ul>
				{#each mainLinks as link}
					<li>
						<Link href={link.pathname}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</section>
		<section id="explore-links">
			<div class="heading"><Icon name="search" {...iconOptions} />&ensp;Explorer</div>
			<ul>
				{#each exploreLinks as link}
					<li>
						<Link href={link.pathname}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</section>
		<section id="partners-links">
			<div class="heading"><Icon name="bookmark" {...iconOptions} />&ensp;Partenaires</div>
			<ul>
				{#each partnersLinks as link}
					<li>
						<Link href={link.pathname}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</section>
	</section>
	<section id="nplex-footer-logo">
		<a href="/" class="logo">
			<Logo />
		</a>
	</section>
	<section id="copyright">
		<Link href="http://unesco-paysage.umontreal.ca/" rel="external">
			&copy; Chaire UNESCO en paysage urbain de l'Université de Montréal
		</Link>
	</section>
</footer>

<style lang="scss">
	// #footer {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: stretch;
	// 	width: 100%;
	// 	padding: 1rem 0;
	// 	margin: 0;
	// 	font-size: var(--size-small);
	// 	color: var(--color-dark-100);
	// 	@include mixins.border(top);
	// 	font-weight: 400;
	// 	letter-spacing: 0.1px;
	// 	transition: all 1s cubic-bezier(0.5, 0, 0, 1);
	// 	&.out {
	// 		transform-origin: bottom;
	// 		perspective: 100px;
	// 		opacity: 0;
	// 	}
	// }

	// #copyright {
	// 	width: 100%;
	// 	display: flex;
	// 	padding: 0.5rem;
	// 	justify-content: center;
	// 	color: var(--color-dark-100);
	// 	font-weight: 300;
	// 	letter-spacing: 0.5px;
	// }

	// #links {
	// 	font-size: 0.9em;
	// 	flex-direction: row;
	// 	padding-top: 1rem;
	// 	padding-bottom: 2rem;
	// 	@include mixins.core-grid;
	// 	width: 100%;

	// 	section {
	// 		display: flex;
	// 		flex: 1;
	// 		flex-direction: column;
	// 		padding: 1rem 0;

	// 		&:first-of-type {
	// 			margin-left: -0.5rem;
	// 		}

	// 		&:nth-of-type(2) {
	// 			padding-inline: 2rem;
	// 		}

	// 		&:last-of-type {
	// 			margin-right: -0.5rem;
	// 		}
	// 	}

	// 	ul {
	// 		padding: 0;
	// 		margin: 0;
	// 		text-indent: 0;
	// 		list-style: none;
	// 	}

	// 	li {
	// 		padding: 0;
	// 		margin: 0;
	// 	}

	// 	.heading {
	// 		padding-bottom: 1rem;
	// 		margin-bottom: 0;
	// 		margin-inline: 0.5rem;
	// 		font-weight: 550;
	// 		font-size: var(--size-xsmall);
	// 		text-transform: uppercase;
	// 		letter-spacing: 2px;
	// 		color: var(--color-light-900);
	// 	}
	// }

	// #sitemap-links {
	// 	grid-column: col1;
	// }

	// #explore-links {
	// 	grid-column: col2;
	// 	align-items: center;
	// 	text-align: center;
	// }

	// #partners-links {
	// 	grid-column: col3;
	// 	align-items: right;
	// 	text-align: right;
	// }

	// #nplex-footer-logo {
	// 	flex: none;
	// 	width: 120px;
	// 	margin: 0 auto;
	// 	padding: 1rem;

	// 	.logo {
	// 		transition: all 0.2s ease-out;
	// 		color: var(--color-dark-900);

	// 		&:hover {
	// 			color: var(--color-primary-500);
	// 		}
	// 	}
	// }
</style>
