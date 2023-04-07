<script lang="ts">
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { getProjectContext } from './common';

	const project = getProjectContext();
	const bannerUrl = project.banner ? getProjectImageUrl(project.banner.storage_name) : '';
</script>

<header style:--shadow-color={project.bannerColors.dominant.darken(0.75).toRgbString()}>
	<div
		class="inner"
		style:background-image="url({bannerUrl})"
		style:--overlay-color={project.bannerColors.dominant
			.darken(project.bannerColors.dominant.brightness() - 0.2)
			.toRgbString()}
	>
		<!-- <svg>
			Random primitives here
		</svg> -->
		<hgroup style:color={project.bgColor.lighten(0.5).toRgbString()}>
			<h1>{project.title}</h1>
		</hgroup>
	</div>
</header>

<style lang="scss">
	header {
		position: relative;
		align-self: center;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: var(--ui-width-main);
	}

	.inner {
		position: relative;
		width: 100%;
		border-radius: var(--ui-radius-xl);
		min-height: calc(100vh - var(--ui-nav-h) - var(--ui-gutter-sm));
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		padding: var(--ui-gutter-lg);
		&::after {
			content: '';
			inset: 0;
			position: absolute;
			background-color: var(--overlay-color);
			opacity: 0.75;
			border-radius: inherit;
		}
	}

	hgroup {
	}

	h1 {
		position: relative;
		z-index: 1;
		// text-align: center;
		font-size: var(--ui-text-3xl);
		font-weight: 425;
		// text-shadow: 0 0.125em 0.25em var(--shadow-color), 1px 2px 3px rgb(0, 0, 0, 0.3);
	}
</style>
