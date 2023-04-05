<script lang="ts">
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { getProjectContext } from './common';

	const project = getProjectContext();
	const bannerUrl = project.banner ? getProjectImageUrl(project.banner.storage_name) : '';
</script>

<header style:--shadow-color={project.bannerColors.dominant.darken(0.75).toRgbString()}>
	<div class="inner" style:background-image="url({bannerUrl})">
		<!-- <svg>
			Random primitives here
		</svg> -->
		<hgroup style:color={project.bgColor.lighten(0.75).toRgbString()}>
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
		width: 100%;
		border-radius: var(--ui-radius-xl);
		min-height: calc(75vh - var(--ui-nav-h));
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	hgroup {
	}

	h1 {
		text-align: center;
		font-size: var(--ui-text-5xl);
		font-weight: 475;
		text-shadow: 0 0.125em 0.25em var(--shadow-color), 1px 2px 3px rgb(0, 0, 0, 0.3);
	}
</style>
