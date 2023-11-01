<script lang="ts">
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { IMAGE_FILE_TYPES_ARR } from '$lib/media/constants';
	import { transformImage } from '$lib/media/utils';
	import { ImagePlus, Send, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { elasticOut, expoInOut, expoOut } from 'svelte/easing';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
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

	let inmemory: { url: string; file: File }[] = [];

	async function parseInput(e: Parameters<ChangeEventHandler<HTMLInputElement>>[0]) {
		if (
			!e.target ||
			!('files' in e.target) ||
			!(e.target.files instanceof FileList) ||
			!e.target.files.length ||
			!('value' in e.target)
		) {
			return;
		}
		await Promise.all(
			[...e.target.files].map(async (file) => {
				const [parsed, preview] = await Promise.all([
					transformImage(file, {
						filename: `parsed-${file.name}.webp`,
						max: 1500,
						format: 'webp',
					}),
					transformImage(file, {
						filename: `preview-${file.name}`,
						max: 350,
						quality: 0.8,
						format: 'webp',
					}),
				]);
				const url = URL.createObjectURL(preview);
				inmemory = [...inmemory, { file: parsed, url }];
			})
		);
		e.target.value = '';
	}

	function deletePreview(index: number) {
		URL.revokeObjectURL(inmemory[index].url);
		inmemory.splice(index, 1);
		inmemory = inmemory;
	}

	export let data: PageData['insertImagesForm'];

	const { form, errors, enhance } = superForm(data, {
		dataType: 'json',
		resetForm: true,
		async onSubmit(input) {
			await Promise.allSettled(
				inmemory.map(async (preview) => {
					// Get a presigned url
					const presignedRes = await fetch(
						`/edit/projects/${$page.params.projectId}/gallery/presigned`,
						{ method: 'GET' }
					);
					const presignedJson = (await presignedRes.json()) as PresignedResponse;
					// Upload to s3
					const s3Data = new FormData();
					Object.keys(presignedJson.post.fields).forEach((key) => {
						s3Data.append(key, presignedJson.post.fields[key]);
					});
					s3Data.append('file', preview.file);
					const uploadRes = await fetch(presignedJson.post.url, {
						method: 'POST',
						body: s3Data,
					});
					if (!uploadRes.ok) {
						input.cancel();
					} else {
						// To do: extract and add color palette.
						$form.images.push({ storageName: presignedJson.name });
					}
				})
			);
		},
		onResult(event) {
			if (event.result.type === 'success') {
				inmemory.forEach((preview) => {
					URL.revokeObjectURL(preview.url);
				});
				inmemory = [];
			}
		},
	});
</script>

<form action="?/insert" method="POST" class:has-images={inmemory.length} use:enhance>
	<ul>
		<label id="input-label" class="preview-card" use:ripple>
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
			<span class="text center sm dimmer">
				{$t.prompt}
			</span>
		</label>
		{#each inmemory as image, i (image.url)}
			<div
				class="preview-card"
				animate:flip={{
					duration(l) {
						return 150 + l / 25;
					},
					easing: expoInOut,
				}}
				in:scale={{ start: 0.9, duration: 500, easing: elasticOut }}
			>
				<img src={image.url} alt="Preview image for {image.url}" />
				<menu class="toolbar" data-mode="dark">
					<button
						class="button square danger ghost"
						type="button"
						on:click={() => deletePreview(i)}
					>
						<X class="button-icon" />
					</button>
				</menu>
			</div>
		{/each}
	</ul>
	{#if inmemory.length}
		<button
			id="upload"
			class="button cta"
			type="submit"
			use:ripple
			in:fly={{ y: 8, easing: expoOut, duration: 750 }}
		>
			{$t.upload}
			<Send class="button-icon" />
		</button>
	{/if}
</form>

<style lang="postcss">
	form {
		position: relative;
		display: flex;
		padding: 1rem;
		flex-direction: column;
		border-radius: inherit;
		margin-bottom: var(--base-gap);
		border: var(--base-border-size) dashed
			color-mix(in srgb, var(--color-neutral-500) 15%, transparent);
		transition: all var(--duration-fast) ease-out;

		&.has-images {
			border-color: color-mix(in srgb, var(--color-primary-700) 20%, transparent);
			&:hover {
				border-color: color-mix(in srgb, var(--color-primary-700) 75%, transparent);
			}

			:global(:--dark) & {
				border-color: color-mix(in srgb, var(--color-primary-400) 20%, transparent);
				&:hover {
					border-color: color-mix(in srgb, var(--color-primary-400) 75%, transparent);
				}
			}
		}
	}

	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem;
	}

	.preview-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		border-radius: var(--radius-sm);
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		aspect-ratio: 1;
		width: 175px;

		menu {
			position: absolute;
			bottom: 0;
			right: 0;
			margin: 0.5rem;
			font-size: var(--size-xs);
			backdrop-filter: blur(6px);
			/* background-color: color-mix(in srgb, var(--base-bg) 80%, transparent); */
			background-color: color-mix(in srgb, var(--color-neutral-950) 85%, transparent);
		}
	}

	#input-label {
		align-items: center;
		justify-content: center;
		gap: 1rem;
		cursor: pointer;
		position: relative;
		&:active {
			animation: var(--animation-press);
		}
	}

	img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		border-radius: inherit;
	}

	#upload {
		margin-top: 1rem;
		font-size: var(--size-sm);
		position: sticky;
		bottom: 2rem;
		margin-inline: auto;
	}
</style>
