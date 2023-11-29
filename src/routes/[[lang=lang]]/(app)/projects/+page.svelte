<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { imageSrc } from '$lib/media/url';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	export let data;
</script>

<h2 class="heading lg">
	<LangKey>{m.recentProjects()}</LangKey>
</h2>
<ul>
	{#each data.qProjects as p, i (p.id)}
		<li animate:flip in:fly|global={{ y: -6, duration: 350, delay: 100 + i * 20 }}>
			{#if p.storageName}
				<img src={imageSrc(p.storageName, { resize: { width: 350 } })} />
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

			.info {
				&::after {
					opacity: 1;
				}
			}

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
		position: relative;
		oapcity: 0;
		padding: 2rem;
		gap: 0.5rem;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		z-index: 1;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			opacity: 0;
			background: linear-gradient(transparent, var(--base-bg));
			transition: all var(--duration-medium);
		}

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
