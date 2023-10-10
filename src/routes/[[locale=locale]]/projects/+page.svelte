<script lang="ts">
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			recents: 'Projets récents',
		},
		en: {
			recents: 'Recent projects',
		},
	});

	export let data;
</script>

<h2 class="heading lg">{$t.recents}</h2>
<ul>
	{#each data.qProjects as p, i (p.id)}
		<li animate:flip in:fly|global={{ y: -6, duration: 350, delay: 100 + i * 20 }}>
			{#if p.imageUrl}
				<img src={p.imageUrl} />
			{/if}
			<!-- svelte-ignore a11y-missing-attribute -->
			<div class="inner">
				<a class="fill-link" {...$link(`/projects/${p.id}`)} />
				<div class="info">
					<span class="heading sm">{p.title}</span>
					{#if p.summary}
						<p class="text md">{p.summary.substring(0, 50)}...</p>
					{/if}
				</div>
			</div>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		align-self: center;
		column-count: 3;
		column-gap: 2rem;
		width: var(--width-lg);
		padding: 0 1rem;
	}

	h2 {
		width: 100%;
		max-width: var(--width-lg);
		align-self: center;
		padding: 2rem 1rem;
	}

	li {
		display: inline-block;
		position: relative;
		width: 100%;
		border-radius: var(--radius-md);
		margin-bottom: 2rem;
		transform: scale(1);
		transition: all var(--duration-fast) ease-out;

		&:hover {
			transform: scale(1.02);
			box-shadow: var(--shadow-xl);

			span {
				transform: translateY(0px);
				opacity: 1;
				transition: all var(--duration-fast) ease-out;
			}
			p {
				transform: translateY(0px);
				opacity: 0.5;
				transition: all var(--duration-fast) ease-out;
			}
		}
	}

	img {
		object-fit: fill;
		border-radius: inherit;
	}

	.inner {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.fill-link {
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}

	.info {
		oapcity: 0;
		transition: all var(--duration-medium) ease-out;
		background: linear-gradient(transparent, var(--base-bg));
		padding: 2rem;
		gap: 0.5rem;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		span {
			transform: translateY(6px);
			opacity: 0;
			transition: all var(--duration-medium) ease-out;
			text-shadow: 0 3px 12px var(--base-bg);
		}

		p {
			transform: translateY(8px);
			opacity: 0;
			transition: all var(--duration-medium) ease-out 0.1s;
			text-shadow: 0 3px 12px var(--base-bg);
		}
	}
</style>
