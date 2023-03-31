<script lang="ts">
	import { getProjectImageUrl } from '$utils/database/helpers';
	import type { Colord } from 'colord';
	import type { PageData } from './$types';

	export let title: PageData['project']['title'];
	export let banner: PageData['project']['banner'];
	export let palette: Colord[];

	const bannerUrl = banner ? getProjectImageUrl(banner.storage_name) : '';
</script>

<header>
	<hgroup
		style:background-color={palette[0].lighten(0.5).toRgbString()}
		style:color={palette[0].darken(0).toRgbString()}
	>
		<h1>{title}</h1>
	</hgroup>
	<img alt="Image-vitrine pour le projet «{title}»" src={bannerUrl} />
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
