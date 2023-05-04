<script lang="ts">
	import {
		galleryLayouts,
		getBannerColors,
		getBgColor,
		makeProjectPalette,
		setProjectContext,
	} from './common';
	import ProjectExemplarity from './ProjectExemplarity.svelte';
	import ProjectGallery from './ProjectGallery.svelte';
	import ProjectHeader from './ProjectHeader.svelte';
	import ProjectPalette from './ProjectPalette.svelte';
	import ProjectSummary from './ProjectSummary.svelte';
	import ProjectTechnicalSheet from './ProjectTechnicalSheet.svelte';
	import ProjectTimeline from './ProjectTimeline.svelte';

	export let data;

	const palette = makeProjectPalette(data.project);
	const bannerColors = getBannerColors(data.project);
	const bgColor = getBgColor(data.project);
	let galleryLayout: (typeof galleryLayouts)[number]['layout'] = 'grid';

	setProjectContext({ ...data.project, palette, bannerColors, bgColor });

	export const snapshot = {
		capture() {
			return {
				galleryLayout,
			};
		},
		restore(snapshot) {
			galleryLayout = snapshot.galleryLayout;
		},
	};
</script>

<!-- <RootBackground body={bgColor.toRgbString()} overscroll={bgColor.toRgbString()} /> -->
<!-- <NavbarBackground color="transparent" /> -->
<!-- <RootBackground overscroll={bgColor.toRgbString()} /> -->
<article
	id="project"
	class:is-demo={data.project.is_demo}
	style:--bg-color={bgColor.desaturate(0.2).alpha(0.5).toRgbString()}
	style:--title-color={bannerColors.dominant.saturate(-0.2).darken(0.4).toRgbString()}
>
	<ProjectHeader />
	<ProjectTechnicalSheet />
	<ProjectExemplarity />
	<ProjectSummary />
	<ProjectPalette />
	<ProjectGallery bind:layout={galleryLayout} />
	<ProjectTimeline />
	<!-- <menu>
		<Tooltip message="Éditer ce projet">
			<Button rounded variant="cta" equi href="/editer/projet/{data.project.id}">
				<Icon name="pen" />
			</Button>
		</Tooltip>
	</menu> -->
</article>

<style lang="scss">
	#project {
		position: relative;
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		padding: 0 var(--ui-gutter-sm);
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--ui-gap-sm);

		@include tablet {
			padding-inline: var(--ui-gap-sm);
		}

		:global(.project-section) {
			border-radius: var(--ui-radius-xl);
			background: col(bg, 000, 0.5);
			padding: var(--ui-gutter-sm);
		}

		:global(.project-section-title) {
			font-size: var(--ui-text-xl);
			font-weight: 500;
			padding: 0.8em 0.5em 1em;
		}

		:global(.project-section) :global(.project-section-title) {
			padding: 0em 0.5em 1em;
		}

		&.is-demo::after {
			pointer-events: none;
			content: '';
			position: absolute;
			inset: 0;
			z-index: 1;
			// background-image: url('/media/projectDemoWatermark.svg');
			background-repeat: repeat;
			background-size: 8rem 8rem;
			opacity: 0.1;
		}
	}

	#project-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		top: calc(-1 * var(--ui-nav-h));
		background: linear-gradient(180deg, var(--bg-color) 0%, transparent 100%);
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
