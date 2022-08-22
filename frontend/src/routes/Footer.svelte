<script>
	import { intersection } from '$actions/intersection';

	import Logo from '$components/primitives/Logo.svelte';

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

	let out = true;
</script>

<footer
	use:intersection={{ rootMargin: '0px 0px -50px 0px' }}
	on:enter={() => (out = false)}
	on:leave={() => (out = true)}
	class:out
>
	<section id="copyright">
		<a href="http://unesco-paysage.umontreal.ca/" rel="external">
			&copy; Chaire UNESCO en paysage urbain de l'Université de Montréal
		</a>
	</section>
	<section id="links">
		<section id="sitemap-links">
			<div class="heading">Le site</div>
			<ul>
				{#each mainLinks as link}
					<li>
						<a href={link.pathname}>{link.title}</a>
					</li>
				{/each}
			</ul>
		</section>
		<section id="explore-links">
			<div class="heading">Explorer</div>
			<ul>
				{#each exploreLinks as link}
					<li>
						<a href={link.pathname}>{link.title}</a>
					</li>
				{/each}
			</ul>
		</section>
		<section id="partners-links">
			<div class="heading">Partenaires</div>
			<ul>
				{#each partnersLinks as link}
					<li>
						<a href={link.pathname}>{link.title}</a>
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
</footer>

<style lang="scss">
	footer {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		width: 100%;
		padding: 1rem 0;
		margin: 0;
		font-size: var(--size-small);
		color: var(--color-dark-100);
		@include mixins.border(top);
		font-weight: 400;
		letter-spacing: 0.1px;
		transition: all 1s cubic-bezier(0.5, 0, 0, 1);
		&.out {
			transform-origin: bottom;
			perspective: 100px;
			opacity: 0;
		}
	}

	#copyright {
		width: 100%;
		display: flex;
		padding: 0.5rem;
		justify-content: center;
		color: var(--color-light-900);
		letter-spacing: 1px;
	}

	#links {
		display: flex;
		flex-direction: row;
		padding: 1rem;
		padding-bottom: 2rem;
		@include mixins.core-grid;
		gap: 1rem;

		section {
			display: flex;
			flex: 1;
			flex-direction: column;
			padding: 1rem 0;
		}

		ul {
			padding: 0;
			margin: 0;
			text-indent: 0;
			list-style: none;
		}

		li {
			padding: 0;
			margin: 0;
		}

		a {
			font-family: var(--font-misc);
			display: inline-flex;
			padding: 0.4em 1em 0.6em 1em;
			border-radius: 2em;
			align-items: center;
			transition: all 0.2s ease-out;
			font-weight: 500;
		}

		a:hover {
			color: var(--color-primary-500);
			background-color: rgba(var(--rgb-primary-500), 0.15);
		}

		.heading {
			padding-bottom: 1rem;
			margin-bottom: 0;
			margin-inline: 1rem;
			font-weight: 600;
			font-size: var(--size-xsmall);
			text-transform: uppercase;
			letter-spacing: 2px;
			color: var(--color-light-900);
		}
	}

	#sitemap-links {
		grid-column: col1;
	}

	#explore-links {
		grid-column: col2;
		align-items: center;
		text-align: center;
	}

	#partners-links {
		grid-column: col3;
		align-items: right;
		text-align: right;
	}

	#nplex-footer-logo {
		flex: none;
		width: 120px;
		color: var(--color-dark-900);
		margin: 0 auto;
		padding: 1rem;
		transition: all 0.2s ease-out;

		.logo {
			&:hover {
				color: var(--color-primary-500);
			}
		}
	}
</style>
