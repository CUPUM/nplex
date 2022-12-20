<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image.svelte';
	import { browserDb } from '$utils/database';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { EXPLORE_ROUTES } from '$utils/routes';
	import type { PageData } from './$types';

	export let projects: PageData['projects'];
	export let scrollTarget: HTMLElement;

	const heading = 'Explorer les projets';

	function pimage(p: typeof projects[number]) {
		if (p.banner && 'name' in p.banner) {
			return browserDb.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(p.banner.name).data
				.publicUrl;
		}
		return '';
	}

	function pcolors(p: typeof projects[number]) {
		if (!p.gallery) {
			return '';
		}
		if (!Array.isArray(p.gallery)) {
			p.gallery = [p.gallery];
		}
		return p.gallery.reduce((acc, curr) => {
			acc.push('rgb' + curr.color_dominant);
			acc.push('rgb' + curr.color_mean);
			return acc;
		}, [] as string[]);
	}
</script>

<article bind:this={scrollTarget}>
	<a class="heading" href={EXPLORE_ROUTES.projects.pathname}>
		<h2>{heading}</h2>
		<div class="icon">
			<Icon name="arrow-right" strokeWidth="4" />
		</div>
	</a>
	<form action="">
		<input type="search" name="" id="" />
	</form>
	<ul>
		{#each projects as p (p.id)}
			<li>
				<a class="card" href="{EXPLORE_ROUTES.projects.pathname}/{p.id}">
					<Image alt="" src={pimage(p)} class="image" color={pcolors(p)} />
					<section class="detail">
						<h1>{p.title}</h1>
						<p>&#9829;{p.likes_sum}</p>
					</section>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: var(--ui-nav-px);
		scroll-snap-align: start;
	}

	.heading {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.5em;
		padding: var(--ui-gutter);
		position: relative;
		width: 100%;
		max-width: --ui-block;
		font-size: var(--ui-text-xl);
		font-weight: 500;

		.icon {
			opacity: 0;
			font-size: 0.5em;
			transform: translateX(-0.25em);
			transition: all 0.2s var(--ui-ease-out);
		}

		&:hover {
			.icon {
				transform: translateX(0);
				opacity: 1;
			}
		}
	}

	ul {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: var(--ui-gutter);
		height: 500px;
		overflow-x: scroll;
		justify-content: stretch;
		padding-inline: var(--ui-gutter);
	}

	li {
		position: relative;
		display: block;
		aspect-ratio: 3 / 4;
	}

	.card {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;

		:global(.image) {
			width: 100%;
			flex: 1;
			min-height: 0;
			border-radius: var(--ui-radius-lg);
		}
	}

	.detail {
		padding: 1rem;
	}

	h1 {
		font-weight: 600;
		font-size: var(--ui-text-lg);
	}
</style>
