<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { InputImages } from '$lib/builders/input-images.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { PROJECT_IMAGE_PALETTE_LENGTH } from '$lib/db/constants';
	import { transformImage } from '$lib/storage/media/utils';
	import convert from 'color-convert';
	import { prominent } from 'color.js';
	import { ImagePlus, Upload, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { elasticOut, expoInOut, expoOut } from 'svelte/easing';
	import { get } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import type { PresignedResponse } from './presign/types';

	let { newImagesForm }: PageData = $props();

	let submitRef = $state<HTMLButtonElement>();

	const inputImages = new InputImages({
		multiple: true,
		resetData: false,
		async parse(file) {
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
				new Promise<{ hex: string[]; lab: [number, number, number][] }>(async (res) => {
					const item = URL.createObjectURL(file);
					const extracted = (await prominent(item, {
						amount: PROJECT_IMAGE_PALETTE_LENGTH,
						group: 40,
					})) as [number, number, number][];
					URL.revokeObjectURL(item);
					res({
						hex: extracted.map((col) => convert.rgb.hex(col)),
						lab: extracted.map((col) => convert.rgb.lab(col)),
					});
				}),
			]);
			const url = URL.createObjectURL(preview.file);
			return { ...parsed, url, ...palettes };
		},
		onDelete(data) {
			URL.revokeObjectURL(data.url);
		},
	});

	const { form, errors, enhance, submitter } = extendedSuperForm(newImagesForm, {
		dataType: 'json',
		resetForm: true,
		async onSubmit(input) {
			const images: PageData['newImagesForm']['data']['images'] = [];
			await Promise.allSettled(
				inputImages.parsed.map(async (preview) => {
					// Get a presigned url
					const presignedRes = await fetch(
						`/edit/projects/${get(page).params.projectId}/gallery/presign`,
						{ method: 'GET' }
					);
					const presignedJson = (await presignedRes.json()) as PresignedResponse;
					// Upload to storage
					const formData = new FormData();
					Object.entries(presignedJson.post.fields).forEach(([k, v]) => {
						if (v) {
							formData.append(k, v);
						}
					});
					formData.append('file', preview.data.file);
					const uploadRes = await fetch(presignedJson.post.url, {
						method: 'POST',
						body: formData,
					});
					if (uploadRes.ok) {
						images.push({
							storageName: presignedJson.name,
							colorPaletteLAB: preview.data.lab,
							height: preview.data.height,
							width: preview.data.width,
						});
					}
				})
			);
			form.set({ images });
		},
		onResult(event) {
			if (event.result.type === 'success') {
				inputImages.deleteAll();
			}
		},
	});
</script>

<form
	use:enhance
	id="new-images"
	action="?/upload"
	method="POST"
	class="dashboard-section p-card-padding gap-card-gutter flex flex-row items-start justify-start"
>
	<label class="button button-dashed" use:ripple>
		<input form="omit" class="sr-only" name="images" {...inputImages.inputAttributes} />
		{m.project_gallery_add_prompt()}
		<ImagePlus />
	</label>
	{#each inputImages.parsed as image, i (image.data.url)}
		<div
			animate:flip={{
				duration(l) {
					return 150 + l / 25;
				},
				easing: expoInOut,
			}}
			in:scale={{ start: 0.9, duration: 500, easing: elasticOut, delay: i * 50 }}
		>
			<img src={image.data.url} alt="Preview image for {image.data.url}" />
			<div>
				{#each image.data.hex as color}
					<div data-hex="#{color}" class="bg-[data(hex)]"></div>
				{/each}
			</div>
			<menu>
				<button
					class="button button-ghost aspect-square"
					data-danger
					type="button"
					onclick={() => image.delete()}
					use:ripple
				>
					<X />
				</button>
			</menu>
		</div>
	{/each}
	{#if inputImages.parsed.length}
		<button
			class="button button-cta"
			type="submit"
			use:ripple
			bind:this={submitRef}
			in:fly={{ y: 8, easing: expoOut, duration: 750 }}
		>
			{m.project_gallery_upload()}
			<IconSpinner busy={submitRef === $submitter} icon={Upload} />
		</button>
	{/if}
</form>
