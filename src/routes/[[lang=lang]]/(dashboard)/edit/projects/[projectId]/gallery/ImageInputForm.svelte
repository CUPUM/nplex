<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import { MODES } from '$lib/modes/constants';
	import { IMAGE_FILE_TYPES_ARR } from '$lib/storage/media/constants';
	import { transformImage } from '$lib/storage/media/utils';
	import { melt } from '@melt-ui/svelte';
	import convert from 'color-convert';
	import { prominent } from 'color.js';
	import { ImagePlus, Send, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { elasticOut, expoInOut, expoOut } from 'svelte/easing';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import type { PresignedResponse } from './presigned/types';

	let inmemory: {
		url: string;
		file: File;
		width: number;
		height: number;
		hex: string[];
		lab: [number, number, number][];
	}[] = [];

	type ParsedPalettes = Pick<(typeof inmemory)[number], 'hex' | 'lab'>;

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
				const [parsed, preview, palettes] = await Promise.all([
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
					new Promise<ParsedPalettes>(async (res) => {
						const item = URL.createObjectURL(file);
						const extracted = await prominent(item, { amount: 5, group: 40 });
						const palettes = {
							lab: [],
							hex: [],
						} as ParsedPalettes;
						URL.revokeObjectURL(item);
						(extracted as [number, number, number][]).forEach((col) => {
							palettes.lab.push(convert.rgb.lab(col));
							palettes.hex.push(convert.rgb.hex(col));
						});
						res(palettes);
					}),
				]);
				const url = URL.createObjectURL(preview.file);
				inmemory.push({ ...parsed, url, ...palettes });
				inmemory = inmemory;
			})
		);
		e.target.value = '';
	}

	function deletePreview(index: number) {
		URL.revokeObjectURL(inmemory[index].url);
		inmemory.splice(index, 1);
		inmemory = inmemory;
	}

	export let data: PageData['newImageForm'];

	const {
		form,
		errors,
		enhance,
		elements: {
			submitter: { root: submitter },
			loading: { root: loading },
		},
	} = superForm(data, {
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
						$form.images.push({
							storageName: presignedJson.name,
							palette: preview.lab,
							height: preview.height,
							width: preview.width,
						});
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
			<span>
				<LangKey>{m.project_gallery_add_prompt()}</LangKey>
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
				in:scale={{ start: 0.9, duration: 500, easing: elasticOut, delay: i * 50 }}
			>
				<img src={image.url} alt="Preview image for {image.url}" />
				<div class="palette">
					{#each image.hex as color}
						<div class="swatch" style:background-color="#{color}"></div>
					{/each}
				</div>
				<menu class="toolbar" data-mode={MODES.DARK}>
					<button
						class="button square danger ghost"
						type="button"
						on:click={() => deletePreview(i)}
					>
						<X />
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
			use:melt={$loading}
			in:fly={{ y: 8, easing: expoOut, duration: 750 }}
		>
			<LangKey>{m.project_gallery_upload()}</LangKey>
			<Send class="button-icon" />
		</button>
	{/if}
</form>

<style>
	form {
		grid-column: 1/-1;
		position: relative;
		display: flex;
		padding: 1rem;
		flex-direction: column;
		border-radius: var(--dashboard-radius);
		background: var(--base-bg);
		border: var(--base-border-width) dashed
			color-mix(in srgb, var(--color-neutral-500) 15%, transparent);
		transition: all var(--duration-fast) ease-out;

		&.has-images {
			border-style: solid;
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
		border-radius: var(--radius-md);
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

		.palette {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			max-with: 50%;
			pointer-events: none;
			display: flex;
			flex-direction: row;
			padding: 1px;
			margin: var(--base-nesting);
			border-radius: var(--radius-full);
			pointer-events: none;
			transition: all var(--duration-medium) ease-out;
			backdrop-filter: blur(8px);
		}

		.swatch {
			aspect-ratio: 1;
			flex: none;
			height: 1.25em;
			border-radius: var(--radius-full);
			box-shadow: var(--shadow-xs);
			border: var(--base-border-dim);
			&:not(:first-child) {
				margin-left: -0.25em;
			}
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

		span {
			opacity: var(--opacity-muted);
			font-size: var(--size-sm);
			text-align: center;
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
