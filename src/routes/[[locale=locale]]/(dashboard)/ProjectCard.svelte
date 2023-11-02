<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { imageUrl } from '$lib/media/url';
	import { Image, Paintbrush } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	const t = createTranslations({
		fr: {
			noName: 'Projet sans nom',
			noImage: 'Aucune bannière',
		},
		en: {
			noName: 'Unnamed project',
			noImage: 'No banner image',
		},
	});

	export let project: Awaited<LayoutData['streamed']['editableProjects']>[number];
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div use:ripple class="card">
	{#if project.bannerStorageName}
		<img
			class="banner"
			src={imageUrl(project.bannerStorageName, {
				resize: { height: 200, width: 300 },
				quality: 0.7,
			})}
		/>
	{:else}
		<div class="banner-placeholder">
			<Image />
			<span class="text sm">{$t.noImage}</span>
		</div>
	{/if}
	<!-- svelte-ignore a11y-missing-content -->
	<a {...$link(`/edit/projects/${project.id}`)} class="fill-link" />
	<div class="details">
		<Paintbrush class="card-icon" />
		{#if project.title}
			{project.title}
		{:else}
			<span class="dimmer">{$t.noName}</span>
		{/if}
	</div>
</div>

<style lang="postcss">
	.card {
		cursor: pointer;
		position: relative;
		border-radius: var(--radius-md);
		height: 400px;
		aspect-ratio: 3/4;
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			'banner'
			'details';
		gap: 0;
		flex: none;

		&:active {
			animation: var(--animation-press);
		}
	}

	.banner,
	.banner-placeholder {
		position: absolute;
		grid-area: banner;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.banner {
		object-fit: cover;
	}

	.banner-placeholder {
		background-color: var(--color-neutral-300);
		opacity: 0.25;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		gap: 0.5em;
		flex-direction: row;
		:global(svg) {
			stroke-width: 2;
			width: 1em;
		}
	}

	.fill-link {
		inset: 0;
		position: absolute;
		border-radius: inherit;
	}

	.details {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		grid-area: details;
		border-radius: inherit;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		background-color: white;
	}
</style>
