<script lang="ts">
	import Token from '$components/Token/Token.svelte';
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
					<div class="heading-sm">
						{o.name}
					</div>
					<div class="text-sm">
						<Token variant="outlined">
							{#if o.type}
								{o.type.title}
							{:else}
								<i>Type d'organisme non-défini</i>
							{/if}
						</Token>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ul {
		position: relative;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
		flex-direction: row;
		gap: var(--ui-gap-md);
		padding-inline: 1.5rem;
		padding-block: 2rem;

		&::before {
			z-index: -10;
			content: '';
			position: absolute;
			background: radial-gradient(col(primary, 100, 0.1) 0%, transparent 75%);
			width: 100%;
			top: 50%;
			transform: translate(0, -50%);
			aspect-ratio: 1;
			pointer-events: none;
		}
	}

	li {
		position: relative;
		display: block;
		aspect-ratio: 4 / 3;
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
		transition: all 0.2s var(--ui-ease-out);

		&:hover {
			box-shadow: var(--ui-shadow-md);
		}
	}
</style>
