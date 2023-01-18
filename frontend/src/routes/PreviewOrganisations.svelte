<script lang="ts">
	import { EXPLORE_ROUTES } from '$utils/routes';
	import type { PageData } from './$types';
	import PreviewsHeader from './PreviewHeader.svelte';

	export let organisations: PageData['organisations'];
</script>

<article>
	<PreviewsHeader
		title="Bureaux & organismes"
		href={EXPLORE_ROUTES.organisations.pathname}
		action="?/organisations"
		placeholder="Chercher des projets"
	/>
	<ul>
		{#each organisations as o (o.id)}
			<li>
				<a class="card" href="{EXPLORE_ROUTES.organisations.pathname}/{o.id}">Yhello!</a>
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
		padding: 1.5rem;
		position: relative;
		width: 100%;
		max-width: --ui-block;
		font-size: var(--ui-text-2xl);
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
		gap: 1.5rem;
		height: 500px;
		overflow-x: scroll;
		justify-content: stretch;
		padding-inline: 1.5rem;
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
