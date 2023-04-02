<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import RootBackground from '$routes/RootBackground.svelte';
	import { getBannerColors, getBgColor, makeProjectPalette, setProjectContext } from './common';
	import ProjectGallery from './ProjectGallery.svelte';
	import ProjectHeader from './ProjectHeader.svelte';
	import ProjectSummary from './ProjectSummary.svelte';
	import ProjectTimeline from './ProjectTimeline.svelte';

	export let data;

	const palette = makeProjectPalette(data.project);

	const bannerColors = getBannerColors(data.project);

	const bgColor = getBgColor(data.project);

	setProjectContext({ ...data.project, palette, bannerColors, bgColor });
</script>

<RootBackground body={bgColor.toRgbString()} overscroll={bgColor.toRgbString()} />
<article id="project">
	<ProjectHeader />
	<ProjectSummary />
	<ProjectGallery />
	<ProjectTimeline />
	<menu>
		<Tooltip message="Éditer ce projet">
			<Button rounded variant="cta" equi href="/editer/projet/{data.project.id}">
				<Icon name="pen" />
			</Button>
		</Tooltip>
	</menu>
</article>
<pre>
{JSON.stringify(data.project, undefined, 2)}
</pre>
<aside class="border-top">
	<header>Vous aimerez peut-être aussi:</header>
	<div>
		<section>Projets suggérés</section>
		<section>Organisations suggérées</section>
		<section>Intervenant.e.s suggérés</section>
	</div>
</aside>

<style lang="scss">
	#project {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--ui-gap-sm);
		// padding-inline: var(--ui-gap-sm);
		margin-top: calc(-1 * var(--ui-nav-h));

		:global(.project-section-title) {
			font-size: var(--ui-text-3xl);
			font-weight: 500;
			padding: 0.3em 0.5em 0.5em;
			color: col(fg, 500);
		}
	}

	menu {
		align-self: flex-start;
		position: sticky;
		bottom: var(--ui-gutter-md);
		left: var(--ui-gutter-md);
	}

	pre {
		padding: 2rem;
		font-size: var(--ui-text-xs);
		line-height: 1.2;
	}
</style>
