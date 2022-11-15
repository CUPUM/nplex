<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { reveal, slipMask } from '$actions/reveal';
	import { Theme } from '$utils/enums';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import { navbarTheme } from './Navbar.svelte';
	import PreviewList from './PreviewList.svelte';

	export let data: PageData;

	function headerEnter() {
		navbarTheme.set(Theme.dark);
	}

	function headerLeave() {
		navbarTheme.reset();
	}

	onDestroy(() => {
		headerLeave();
	});
</script>

<header
	class="theme-dark"
	use:intersection={{ rootMargin: '0px 0px 0px 0px' }}
	on:enter={headerEnter}
	on:leave={headerLeave}
>
	<!-- <div class="subtitle">
		<span>Bienvenue sur</span>
	</div> -->
	<hgroup>
		<h1
			use:reveal={{
				...slipMask,
				start: {
					opacity: '1',
					transform: 'translateY(1em)',
				},
				delimiter: '',
				stagger: (i) => 75 + i * 10,
				easing: 'cubic-bezier(0, .75, 0, 1)',
				duration: 2000,
			}}
		>
			Nplex
		</h1>
		<h1 aria-hidden="true">Nplex</h1>
		<h1 aria-hidden="true">Nplex</h1>
	</hgroup>
	<!-- <div class="subtitle">
		<span>La plateforme de valorisation des petits projets exemplaires en aménagement à Montréal</span>
	</div> -->
</header>
<PreviewList header="Projets" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		{datum.title}
	</a>
</PreviewList>
<hr class="dashed" />
<PreviewList header="Organisations et bureaux" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		{datum.title}
	</a>
</PreviewList>
<hr class="dashed" />
<PreviewList header="Acteurs de projet" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		{datum.title}
	</a>
</PreviewList>

<style lang="scss" module>
	header {
		position: relative;
		width: 100%;
		height: calc(100vh + 2rem);
		padding: 0;
		padding-bottom: 5rem;
		padding-top: calc(var(--navbar-height-px) + 6rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		margin: 0;
		margin-top: var(--n-navbar-height-px);
		background: col(bg, 100);
		border-radius: 0 0 min(2rem, calc(0.2 * var(--scroll-px))) min(2rem, calc(0.2 * var(--scroll-px)));
		transform: scale(max(0.96, calc(1 - 0.0002 * var(--scroll))));
		transform-origin: top center;
		transition: transform 0.3s ease-out, border-radius 0.3s ease-out;
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
		transform: translateX(calc(-0.5 * var(--scroll-px))); // skewX(calc(-0.01deg * var(--scroll)));
		font-weight: min(calc(0.75 * var(--scroll) + 400), 900);
		transition: all 0.5s cubic-bezier(0, 0, 0.2, 1);
	}
	h1 {
		position: relative;
		padding: 0 2rem;
		line-height: 1em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: nowrap;
		white-space: nowrap;
		width: 100vw;
		margin: 0;
		font-size: calc(34vw - 1rem);
		letter-spacing: -0.05em;
		left: -0.035em;
		top: 0.135em;
		font-weight: inherit;
		color: col(fg, 300);
		text-transform: uppercase;

		& > :global(span) {
			text-align: center;
		}
	}

	.subtitle {
		letter-spacing: 0.02em;
		padding: 0;
		line-height: 1.2em;
		max-width: var(--ui-large);
		margin: 0;
		font-size: var(--size-xlarge);
		text-align: center;
		font-weight: 500;
		width: 100%;
		text-align: left;
		color: col(primary, 500);
		span {
			display: block;
			max-width: var(--ui-small);
		}
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
