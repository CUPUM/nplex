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
				<a class="card" href="{EXPLORE_ROUTES.organisations.pathname}/{o.id}">
					<legend class="heading-sm">
						{o.name}
					</legend>
					<div class="shortname">{o.short_name}</div>
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
		align-items: flex-start;
		position: relative;
		padding: 2rem;
		gap: 1.5rem;
		height: 100%;
		width: 100%;
		background-color: col(bg, 000);
		border-radius: var(--ui-radius-lg);
	}

	.shortname {
		padding: 0 1.2em 0.2em;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		background-color: col(secondary, 100, 0.2);
		color: col(secondary, 900);
		height: var(--ui-block-md);
		border-radius: 99px;
	}
</style>
