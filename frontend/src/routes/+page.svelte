<script lang="ts">
	import { flyRotate, reveal } from '$actions/reveal';
	import type { PageData } from './$types';
	import PreviewList from './PreviewList.svelte';

	export let data: PageData;
</script>

<header>
	<hgroup>
		<h1 use:reveal={{ ...flyRotate, rootMargin: '0px 0px 0px' }}>
			Bienvenue sur Nplex
			<span>La plateforme de valorisation des petits projets exemplaires en aménagement à Montréal</span>
		</h1>
	</hgroup>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 2rem;
		margin-top: calc(-1 * var(--navbar-height-px, 0px));

		hgroup {
			display: flex;
			align-items: center;
			min-height: 100vh;
			padding: 0;
			margin: 0;
			padding-block: 8rem;
			margin-bottom: 8rem;
			color: var(--color-contrast-900);
			line-height: 1;
			width: 100%;
			font-size: 3rem;
			max-width: 1200px;
			@include mobile {
				font-size: xx-large;
			}
			h1 {
				font-weight: 500;

				// font-weight: 300;
				margin: 0;
			}
			span {
				font-weight: 500;
				color: var(--color-primary-300);
				// font-weight: 500;
			}
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
