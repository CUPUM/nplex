<script lang="ts">
	import Image from '$components/Image.svelte';
	import { projectcolors, publicurl } from '$utils/database';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { EXPLORE_ROUTES } from '$utils/routes';
	import type { PageData } from './$types';
	import PreviewsHeader from './PreviewsHeader.svelte';

	export let projects: PageData['projects'];
	export let scrollTarget: HTMLElement;
</script>

<article bind:this={scrollTarget} id="explore">
	<PreviewsHeader
		href={EXPLORE_ROUTES.projects.pathname}
		action="?/projects"
		placeholder="Chercher des projets"
	>
		Explorer les projets
	</PreviewsHeader>
	<ul>
		{#each projects as p (p.id)}
			<li>
				<a class="card" href="{EXPLORE_ROUTES.projects.pathname}/{p.id}">
					<Image
						alt=""
						src={publicurl(STORAGE_BUCKETS.PROJECTS, p.banner?.name)}
						class="image"
						color={projectcolors(p.gallery)}
					/>
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
	}

	ul {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 0;
		height: 500px;
		overflow-x: scroll;
		justify-content: stretch;
		padding-block: var(--ui-gutter);
		padding-inline: max(
			var(--ui-gutter),
			calc(50vw + var(--ui-gutter) - 0.5 * var(--ui-width-main))
		);
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
		border-radius: var(--ui-radius-lg);
		transition: background 0.25s;

		:global(.image) {
			width: 100%;
			flex: 1;
			min-height: 0;
			border-radius: var(--ui-radius-lg);
		}

		&:hover {
			background: col(bg, 000);
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
