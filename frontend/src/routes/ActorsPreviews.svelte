<script lang="ts">
	import { EXPLORE_ROUTES } from '$utils/routes';
	import type { PageData } from './$types';
	import PreviewsHeader from './PreviewsHeader.svelte';

	export let actors: PageData['actors'];
</script>

<article>
	<PreviewsHeader
		href={EXPLORE_ROUTES.actors.pathname}
		action="?/actors"
		placeholder="Chercher des projets"
	>
		Explorer les profils de professionnels
	</PreviewsHeader>
	<ul>
		{#each actors as a (a.id)}
			<li>
				<a class="card" href="{EXPLORE_ROUTES.actors.pathname}/{a.id}"> Bonjour! </a>
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
	}
</style>
