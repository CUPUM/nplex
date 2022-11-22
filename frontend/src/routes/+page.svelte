<script lang="ts">
	import type { PageData } from './$types';
	import HomeHero from './HomeHero.svelte';
	import PreviewList from './HomePreviewList.svelte';

	export let data: PageData;
</script>

<HomeHero />
<PreviewList header="Projets" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		<h4>
			{datum.title}
		</h4>
	</a>
</PreviewList>
<hr />
<PreviewList header="Organisations et bureaux" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		<h4>
			{datum.title}
		</h4>
	</a>
</PreviewList>
<hr />
<PreviewList header="Acteurs de projet" href="/projets" data={data.projects} let:datum>
	<a class="project" href="/projets/{datum.id}">
		<figure>
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
		</figure>
		<h4>
			{datum.title}
		</h4>
	</a>
</PreviewList>

<style lang="scss" module>
	hr {
		width: 100%;
		border: none;
		background: col(fg, 100, 0.1);
		height: 1px;
	}

	.project {
		all: unset;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		position: relative;
		background: col(bg, 100);
		border-radius: 1.5rem;
		height: 500px;
		max-height: 75vh;
		min-height: 50vh;
		aspect-ratio: 3/4;
		transition: all 0.25s ease-out;
		&:hover {
			background: col(bg, 000);
			box-shadow: 0 3em 4em -2.5em rgba(0, 10, 20, 0.5);
		}
		figure {
			position: relative;
			padding: 0;
			margin: 1px;
			border-radius: inherit;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		img {
			object-fit: fill;
			width: 100%;
		}
		h4 {
			z-index: 1;
		}
	}
</style>
