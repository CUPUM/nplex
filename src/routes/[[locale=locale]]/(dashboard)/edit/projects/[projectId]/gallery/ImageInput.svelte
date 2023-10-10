<script lang="ts" context="module">
	export const IMAGE_SIZES = {
		LG: 1280,
		MD: 720,
		SM: 350,
	} as const;
	const IMAGE_SIZES_KEY = Object.keys(IMAGE_SIZES) as (keyof typeof IMAGE_SIZES)[];
	const FORMAT = 'webp';
</script>

<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import Loading from '$lib/components/Loading.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { IMAGE_FILE_TYPES_ARR } from '$lib/media/constants';
	import { transformImage } from '$lib/media/utils';
	import { ImagePlus, Send } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { elasticOut, expoOut } from 'svelte/easing';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import type { PresignedResponse } from './presigned/types';

	const t = createTranslations({
		fr: {
			prompt: 'Ajoutez des images',
			upload: 'Téléverser',
			badFormat: 'Format d’image non supporté',
		},
		en: {
			prompt: 'Add images',
			upload: 'Upload',
			badFormat: 'Unsupported file format',
		},
	});

	let images: { src: string; resized: { size: keyof typeof IMAGE_SIZES; file: File }[] }[] = [];

	async function parseInput(e: Parameters<ChangeEventHandler<HTMLInputElement>>[0]) {
		if (
			!e.target ||
			!('files' in e.target) ||
			!(e.target.files instanceof FileList) ||
			!e.target.files.length
		) {
			return;
		}
		await Promise.all(
			[...e.target.files].map(async (file) => {
				const src = URL.createObjectURL(file);
				const filename = file.name.split('.').slice(0, -1).join('.');
				const resized = await Promise.all(
					IMAGE_SIZES_KEY.map(async (size) => {
						const resized = await transformImage(file, {
							filename: `${filename}-${size}`,
							max: IMAGE_SIZES[size],
							quality: 0.9,
							format: FORMAT,
						});
						return {
							size,
							file: resized,
						};
					})
				);
				images = [
					...images,
					{
						src,
						resized,
					},
				];
			})
		);
	}

	let loading = writable(false);

	async function upload() {
		loading.set(true);
		await Promise.allSettled(
			images.map(async (image) => {
				try {
					const stored = await Promise.all(
						image.resized.map(async (size) => {
							// Get a presigned url
							const pres = (await (
								await fetch(
									`/edit/projects/${$page.params.projectId}/gallery/presigned?&ext=${FORMAT}`,
									{
										method: 'GET',
									}
								)
							).json()) as PresignedResponse;
							// Upload to s3
							const s3Data = new FormData();
							Object.keys(pres.post.fields).forEach((key) => {
								s3Data.append(key, pres.post.fields[key]);
							});
							s3Data.append('file', size.file);
							const upl = await fetch(pres.post.url, {
								method: 'POST',
								body: s3Data,
							});
							if (!upl.ok) {
								throw new Error(upl.statusText);
							}
							return { size: size.size, name: pres.name };
						})
					);
					// Add info to db
					const dbData = new FormData();
					stored.forEach((s) => {
						dbData.append(s.size, s.name);
					});
					await fetch(`/edit/projects/${$page.params.projectId}/gallery/add`, {
						method: 'POST',
						body: dbData,
					});
				} catch (e) {
					console.error(e);
					return Promise.reject(e);
				}
			})
		);
		await invalidate('project-editor:gallery');
		images = [];
		loading.set(false);
	}

	const { element, action } = createLoading({ state: loading, disable: true });
</script>

<fieldset>
	<label id="image-placeholder" use:ripple>
		<input
			form=""
			hidden
			type="file"
			name="images"
			accept={IMAGE_FILE_TYPES_ARR.join(',')}
			multiple
			on:change={parseInput}
		/>
		<ImagePlus class="button-icon" />
		<span class="prose sm dim">
			{$t.prompt}
		</span>
	</label>
	{#each images as image, i (image.src)}
		<div
			class="image-wrap"
			animate:flip
			in:scale={{ start: 0.9, duration: 500, easing: elasticOut }}
		>
			<img data-loading={$loading || undefined} src={image.src} alt="preview for {image.src}" />
			{#if $loading}
				<Loading />
			{/if}
		</div>
	{/each}
	{#if images.length}
		<div class="menu" in:fly={{ y: 6, easing: expoOut, delay: 500 }}>
			<button class="button cta" on:click={upload} type="button" {...element} use:action>
				{$t.upload}
				<Send class="button-icon" />
			</button>
		</div>
	{/if}
</fieldset>

<style lang="postcss">
	fieldset {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		align-self: flex-start;
		gap: inherit;
	}

	#image-placeholder {
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 2rem;
		height: var(--card-height);
		aspect-ratio: 3 / 4;
		border-radius: var(--radius-sm);
		/* border: var(--base-border); */
		border-color: transparent;
		color: var(--color-neutral-700);
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		transition:
			all var(--duration-fast) ease-out,
			box-shadow var(--duration-medium) ease-out;
		:global(:--dark) & {
			color: var(--color-neutral-400);
		}
		&:active {
			animation: var(--animation-press);
		}
		&:hover {
			border-color: var(--color-neutral-200);
			background-color: color-mix(in srgb, var(--color-neutral-500) 15%, transparent);
			box-shadow:
				inset 0 0 5rem rgba(255, 255, 255, 0.5),
				var(--shadow-lg);
			color: var(--color-primary-700);
			:global(:--dark) & {
				border-color: var(--color-neutral-700);
				color: var(--color-primary-400);
				box-shadow: inset 0 0 5rem rgba(255, 255, 255, 0.01);
			}
		}
	}

	.image-wrap {
		position: relative;
	}

	img {
		height: var(--card-height);
		width: auto;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);
		transition: all var(--duration-fast);
		/* 
		&[data-invalid] {
			transform: scale(0.95);
			&::after {
				position: absolute;
				inset: 0;
				border-radius: inherit;
				background-color: var(--color-error-100);
				opacity: 0.25;
				:global(:--dark) & {
					backgorund-color: var(--color-error-900);
				}
			}
		} */

		&[data-loading] {
			opacity: 0.5;
		}
	}

	.menu {
		position: absolute;
		width: 100%;
		bottom: 1rem;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		pointer-events: none;

		> * {
			pointer-events: initial;
		}
	}
</style>
