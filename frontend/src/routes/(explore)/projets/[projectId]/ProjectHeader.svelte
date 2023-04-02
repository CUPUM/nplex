<script lang="ts">
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { getProjectContext } from './common';

	const project = getProjectContext();

	const bannerUrl = project.banner ? getProjectImageUrl(project.banner.storage_name) : '';
</script>

<header>
	<hgroup
		style:background-color={project.palette[0].color.lighten(0.5).toRgbString()}
		style:color={project.palette[0].color.darken(0).toRgbString()}
	>
		<h1>{project.title}</h1>
	</hgroup>
	<img alt="Image-vitrine pour le projet «{project.title}»" src={bannerUrl} />
</header>

<style lang="scss">
	header {
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		gap: var(--ui-gap-sm);
	}

	hgroup {
		z-index: 1;
		font-size: var(--ui-text-5xl);
		font-weight: 550;
		padding: var(--ui-gutter-md);
		border-radius: var(--ui-radius-xl);
	}

	img {
		position: relative;
		border-radius: inherit;
		height: calc(100vh - var(--ui-nav-h) - var(--ui-gap-sm));
		inset: 0;
		width: 100%;
		height: 100%;
		// z-index: 0;
		object-fit: cover;
		border-radius: var(--ui-radius-xl);
	}
</style>
