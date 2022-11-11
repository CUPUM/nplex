<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { reveal, slipMask } from '$actions/reveal';
	import { Theme } from '$utils/enums';
	import type { PageData } from './$types';
	import { navbarTheme } from './Navbar.svelte';
	import PreviewList from './PreviewList.svelte';

	export let data: PageData;
</script>

<header
	class="theme-dark"
	use:intersection={{ rootMargin: '0px 0px 20px 0px' }}
	on:enter={() => navbarTheme.set(Theme.dark)}
	on:leave={() => navbarTheme.reset()}
>
	<span class="subtitle">Bienvenue sur</span>
	<hgroup>
		<h1
			use:reveal={{
				...slipMask,
				start: {
					opacity: '1',
					transform: 'translateY(1em)',
				},
				delimiter: '',
				stagger: (i) => 50 + i * 10,
				easing: 'cubic-bezier(0, .5, 0, 1)',
				duration: 2000,
			}}
		>
			Nplex
		</h1>
		<h1 aria-hidden="true">Nplex</h1>
		<h1 aria-hidden="true">Nplex</h1>
	</hgroup>
	<span class="subtitle">La plateforme de valorisation des petits projets exemplaires en aménagement à Montréal</span>
</header>
<PreviewList header="Projets" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		{datum.title}
	</a>
</PreviewList>
<PreviewList header="Organisations et bureaux" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		{datum.title}
	</a>
</PreviewList>
<PreviewList header="Acteurs de projet" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		{datum.title}
	</a>
</PreviewList>

<style lang="scss">
	header {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--navbar-height-px) 0 4rem 0;
		margin: 0;
		margin-top: var(--n-navbar-height-px);
		background-color: col(bg, 700);
	}
	hgroup {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow: visible;
		padding: 0;
		margin: 0;
		line-height: 1;
		align-self: flex-start;
		transform: translateX(calc(-0.5 * var(--scroll-px))) skewX(calc(-0.01deg * var(--scroll)));
		// font-weight: min(calc(0.75 * var(--scroll) + 500), 900);
		letter-spacing: -1em;
		transition: all 0.5s cubic-bezier(0, 0, 0.2, 1);
	}
	h1 {
		position: relative;
		padding: 0;
		line-height: 1em;
		display: block;
		width: 100vw;
		text-align: center;
		flex: none;
		margin: 0;
		font-size: calc(36vw - 4rem);
		font-weight: inherit;
		color: col(fg, 300);
		text-transform: uppercase;
	}

	.subtitle {
		// text-transform: uppercase;
		letter-spacing: 0.5px;
		color: col(fg, 300);
		padding: 4rem 2rem;
		line-height: 1.5em;
		max-width: var(--ui-large);
		margin: 0;
		font-size: var(--size-medium);
		text-align: center;
		font-weight: 300;
		width: 100%;
	}

	.project {
		all: unset;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		position: relative;
		background: rgb(var(--rgb-base-700), 0.2);
		border-radius: 1.5rem;
		height: 500px;
		max-height: 75vh;
		min-height: 50vh;
		aspect-ratio: 3/4;
		transition: all 0.25s ease-out;
		&:hover {
			background: rgb(var(--rgb-base-100), 0.5);
			box-shadow: 0 2em 5em -3em rgba(0, 20, 40, 0.5);
		}
	}
</style>
