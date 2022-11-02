<script lang="ts">
	import { intersection } from '$actions/intersection';
	import Icon from '$components/Icon.svelte';
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
		thickness: 1.75,
		style: 'font-size: 1.25em;',
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
	<div class="wrapper">
		<section id="links">
			<section id="sitemap-links">
				<div class="heading" style="--i: 0"><Icon name="map" {...iconOptions} />&ensp;Carte du site</div>
				<ul>
					{#each mainLinks as link, i}
						<li style="--i: {i}">
							<Link href={link.pathname}>{link.title}</Link>
						</li>
					{/each}
				</ul>
			</section>
			<section id="explore-links">
				<div class="heading" style="--i: 1"><Icon name="search" {...iconOptions} />&ensp;Explorer</div>
				<ul>
					{#each exploreLinks as link, i}
						<li style="--i: {i}">
							<Link href={link.pathname}>{link.title}</Link>
						</li>
					{/each}
				</ul>
			</section>
			<section id="partners-links">
				<div class="heading" style="--i: 2"><Icon name="bookmark" {...iconOptions} />&ensp;Partenaires</div>
				<ul>
					{#each partnersLinks as link, i}
						<li style="--i: {i}">
							<Link href={link.pathname}>{link.title}</Link>
						</li>
					{/each}
				</ul>
			</section>
		</section>
		<Link href="/">
			<Logo />
		</Link>
		<Link href="http://unesco-paysage.umontreal.ca/" rel="external">
			&copy; Chaire UNESCO en paysage urbain de l'Université de Montréal
		</Link>
	</div>
</footer>

<style lang="scss">
	@use 'mixins.scss';

	#footer {
		padding: 2rem 1.5rem;
		margin: 0;
		font-size: var(--size-small);
		color: var(--color-contrast-100);
		background-color: var(--color-base-300);
		font-weight: 400;
		letter-spacing: 0.1px;
		transition: all 1s cubic-bezier(0.5, 0, 0, 1);
	}

	.out {
		opacity: 0;

		.heading {
			opacity: 0;
			transform: translateY(0.5rem);
			transition: all 0.25s;
		}

		li {
			opacity: 0;
			transform: translateY(1.5rem);
			transition: all 0.25s;
		}
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	#links {
		font-size: small;
		font-weight: 500;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-bottom: 2rem;
		width: 100%;

		section {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			&:first-of-type {
				align-items: flex-start;
				ul {
					align-items: flex-start;
				}
			}
			&:last-of-type {
				align-items: flex-end;
				ul {
					align-items: flex-end;
				}
			}
		}
	}

	.heading {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 1rem;
		margin-bottom: 0;
		margin-inline: 0.75rem;
		font-weight: 550;
		font-size: var(--size-xsmall);
		letter-spacing: 0.05em;
		opacity: 0.5;
		transition: all 1s cubic-bezier(0, 0, 0, 1) calc(var(--i, 0) * 0.25s);
	}

	ul {
		all: unset;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	li {
		all: unset;
		opacity: 1;
		transform: translateY(0);
		transition: all 1s cubic-bezier(0, 0, 0, 1) calc(var(--i) * 0.1s + 0.2s);
	}
</style>
