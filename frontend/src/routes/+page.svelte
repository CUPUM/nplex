<script lang="ts">
	import { reveal } from '$actions/reveal';
	import { flyRotate } from '$utils/presets/reveal';
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
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, quasi? Veniam dolor adipisci asperiores
		fugit illum aspernatur, commodi impedit quibusdam placeat ab dignissimos sed. Veniam, ad inventore alias illo
		quis unde. Provident sed, dicta aut veritatis assumenda voluptas suscipit ipsa autem! Adipisci perferendis,
		error, aliquam vel repellat quod cumque reprehenderit dignissimos nostrum natus odio facilis laboriosam
		voluptates explicabo ipsum tempore fugiat qui, officiis alias dolor enim nihil architecto nam? Ab aliquam sunt
		consectetur voluptate quos incidunt earum, hic deserunt autem. Iure perferendis, praesentium minima at nobis
		perspiciatis nostrum officia aut a, eaque debitis nihil repudiandae quaerat quos exercitationem necessitatibus
		harum.
	</p>
</header>
<article id="previews">
	<PreviewList id="projects" header="Projets" href="/projets" data={data.projectsPreview}>
		<li>test</li>
	</PreviewList>
	<PreviewList id="organisations" header="Organisations" href="/organisations" data={data.organisationsPreview}>
		<li>test</li>
	</PreviewList>
	<PreviewList id="actors" header="Acteurs" href="/actors" data={data.actorsPreview}>
		<li>test</li>
	</PreviewList>
</article>

<style lang="scss">
	@use 'mixins.scss';

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
			font-size: xxx-large;
			max-width: 960px;
			@include mixins.mobile {
				font-size: xx-large;
			}
			h1 {
				font-weight: 600;
				margin: 0;
			}
			span {
				font-weight: 300;
			}
		}
		p {
			font-size: large;
			line-height: 1.5em;
			max-width: 640px;
		}
	}

	#previews {
		display: flex;
		flex-direction: column;
	}
</style>
