<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { InputImages } from '$lib/builders/input-images.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { transformImage } from '$lib/storage/media/utils';
	import convert from 'color-convert';
	import { prominent } from 'color.js';
	import { ImagePlus } from 'lucide-svelte';
	import { get } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import type { PresignedResponse } from './presign/types';

	let { newImageForm }: PageData = $props();

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
					const extracted = (await prominent(item, { amount: 5, group: 40 })) as [
						number,
						number,
						number,
					][];
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
	});

	const { form, errors, enhance } = extendSuperForm(
		superForm(newImageForm, {
			dataType: 'json',
			resetForm: true,
			async onSubmit(input) {
				await Promise.allSettled(
					inputImages.data.map(async (preview) => {
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
						formData.append('file', preview.file);
						const uploadRes = await fetch(presignedJson.post.url, {
							method: 'POST',
							body: formData,
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
					inputImages.data.forEach(cleanupData);
					inputImages.data = [];
				}
			},
		})
	);

	function cleanupData(datum: (typeof inputImages)['data'][number]) {
		URL.revokeObjectURL(datum.url);
	}

	function deleteImage(index: number) {
		const datum = inputImages.data[index];
		if (datum) {
			cleanupData(datum);
			inputImages.data.splice(index, 1);
		}
	}
</script>

<form
	action="?/insert"
	method="POST"
	class="dashboard-section p-card-padding gap-card-gutter flex flex-row items-start justify-start"
>
	<label class="button button-dashed" use:ripple>
		<input form="omit" class="sr-only" name="images" {...inputImages.inputAttributes} />
		{m.project_gallery_add_prompt()}
		<ImagePlus />
	</label>
	<!-- {#each memory as image, i (image.url)}
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
	{#if memory.length}
		<button
			id="upload"
			class="button cta"
			type="submit"
			use:ripple
			use:melt={$loading}
			in:fly={{ y: 8, easing: expoOut, duration: 750 }}
		>
			{m.project_gallery_upload()}
			<Send class="button-icon" />
		</button>
	{/if} -->
</form>
