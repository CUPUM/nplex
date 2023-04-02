<script lang="ts">
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { getProjectContext } from './common';

	const project = getProjectContext();

	const bannerUrl = project.banner ? getProjectImageUrl(project.banner.storage_name) : '';
</script>

<header>
	<!-- <MeshGradient color={project.palette.map((swatch) => swatch.color.toRgbString())} /> -->
	<hgroup style:color={project.bgColor.darken(0.8).toRgbString()}>
		<h1>{project.title}</h1>
	</hgroup>
	<figure>
		<!-- <img alt="Image-vitrine pour le projet «{project.title}»" src={bannerUrl} /> -->
	</figure>
</header>

<style lang="scss">
	header {
		align-self: center;
		width: 100%;
		min-height: 100vh;
		min-height: 100svh;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--ui-gap-sm);
	}

	hgroup {
		z-index: 1;
		font-size: var(--ui-text-5xl);
		font-weight: 600;
		padding: var(--ui-gutter-md);
		border-radius: var(--ui-radius-xl);
		max-width: var(--ui-width-md);
		// text-shadow: 12px 16px 0.25em black;
	}

	figure {
		position: absolute;
		border-radius: var(--ui-radius-xl);
		width: var(--ui-width-lg);
		max-width: 100%;
		overflow: hidden;

		img {
			object-fit: cover;
			filter: blur(6px);
			opacity: 0.5;
		}
	}
</style>
