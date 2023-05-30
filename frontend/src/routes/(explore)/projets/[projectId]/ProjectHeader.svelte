<script lang="ts">
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { getProjectContext } from './common';

	const project = getProjectContext();
	const bannerUrl = project.banner ? getProjectImageUrl(project.banner.storage_name) : '';
	const shapes = Array(20);
</script>

<header>
	<!--  -->
	<div id="mask">
		{#each shapes as shape}
			<div class="shape" />
		{/each}
		<!-- <h1 style:--row={1 + getRandomInt(2)}>{project.title}</h1> -->
	</div>
	<div
		id="header-img"
		style:background-image="url({getProjectImageUrl(project.banner?.storage_name ?? '')})"
	/>
</header>

<style lang="scss">
	header {
		position: relative;
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
	}

	h1 {
		grid-row-start: var(--row);
		grid-row-end: auto;
		grid-column-start: 2;
		column-span: 2;
		font-size: var(--ui-text-5xl);
		display: flex;
		align-items: center;
		font-weight: 600;
	}

	#header-img {
		position: absolute;
		inset: 0;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		mask-image: url(#mask);
	}

	#mask {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--ui-gutter-sm);
	}

	.shape {
		aspect-ratio: 1;
		background-color: currentColor;
		opacity: 0.1;
		border-radius: var(--ui-radius-xl);
		width: 100%;
	}
</style>
