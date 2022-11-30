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
		thickness: 1.5,
		style: 'font-size: 1.25em;',
	};

	let out = true;
</script>

<footer
	class="footer"
	class:out
	use:intersection={{ rootMargin: '0px 0px -50px 0px' }}
	on:enter={() => (out = false)}
	on:leave={() => (out = true)}
>
	<div class="wrapper">
		<section class="self">
			<a href="/">
				<Logo />
			</a>
			<a class="cc sub" href="http://unesco-paysage.umontreal.ca/" rel="external">
				&copy; Chaire UNESCO en paysage urbain de l'Université de Montréal
			</a>
		</section>
		<section>
			<hgroup class="sub" style="--i: 0">
				<Icon name="map" {...iconOptions} />&ensp;Carte du site
			</hgroup>
			<ul>
				{#each mainLinks as link, i}
					<li style="--i: {i}">
						<Link href={link.pathname}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<hgroup class="sub" style="--i: 1">
				<Icon name="search" {...iconOptions} />&ensp;Explorer
			</hgroup>
			<ul>
				{#each exploreLinks as link, i}
					<li style="--i: {i}">
						<Link href={link.pathname}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<hgroup class="sub" style="--i: 2">
				<Icon name="bookmark" {...iconOptions} />&ensp;Partenaires
			</hgroup>
			<ul>
				{#each partnersLinks as link, i}
					<li style="--i: {i}">
						<Link href={link.pathname}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</footer>

<style lang="scss">
	.footer {
		padding: 3rem 2rem;
		margin: 0;
		font-size: var(--ui-text-xs);
		color: var(--color-contrast-100);
		font-weight: 400;
		letter-spacing: 0.1px;
		background: col(fg, 100, 0.02);
		// border-radius: 1rem 1rem 0 0;
		transition: all 1s cubic-bezier(0.5, 0, 0, 1);
	}

	.out {
		opacity: 0;
	}

	.wrapper {
		width: 100%;
		max-width: var(--ui-display-large);
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		gap: var(--ui-size-large);
		margin: 0 auto;
	}

	section {
		flex: 1;
	}

	.sub {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 1.2em;
		margin-bottom: 0;
		margin-inline: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		font-size: var(--ui-text-2xs);
		letter-spacing: 0.1em;
		opacity: 0.3;
		transition: all 1s cubic-bezier(0, 0, 0, 1) calc(var(--i, 0) * 0.25s);
		.out & {
			opacity: 0;
			transform: translateY(0.5rem);
			transition: all 0.25s;
		}
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		font-size: var(--ui-size-xsmall);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	li {
		all: unset;
		display: flex;
		opacity: 1;
		transform: translateY(0);
		transition: all 1s cubic-bezier(0, 0, 0, 1) calc(var(--i) * 0.1s + 0.2s);
		.out & {
			opacity: 0;
			transform: translateY(1.5rem);
			transition: all 0.25s;
		}
	}

	.self {
		font-size: var(--ui-size-large);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.cc {
		margin: 0;
	}
</style>
