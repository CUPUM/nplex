<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Image from '$components/Image.svelte';
	import Loading from '$components/Loading.svelte';
	import { img } from '$routes/api/image/[bucket]/[...path]/common';
	import { StorageBucket } from '$utils/enums';
	import { EDITOR_FORM_ID } from '../common';
	import type { PageData } from './$types';
	import { GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

	export let data: PageData;

	let uploading = false;
	let files: FileList;
	let previews: string[] = [];

	function del(imageId: string) {
		return `${imageId}-delete`;
	}

	function preview(e: Event) {
		if (e.target instanceof HTMLInputElement && e.target.form) {
			e.target.form.requestSubmit();
			// previews = files ? Array.from(files).map((f) => URL.createObjectURL(f)) : [];
		}
	}
</script>

<form
	method="POST"
	action="?/upload"
	use:enhance={({ form, data, action, cancel }) => {
		uploading = true;
		return async ({ update, result }) => {
			update({ reset: true });
			uploading = false;
		};
	}}
	class="upload"
>
	<h2>Ajouter des photos</h2>
	<label class:uploading>
		Ajouter des photos pour présenter votre projet...
		<input
			hidden
			type="file"
			name={GALLERY_INPUT_NAME}
			accept={GALLERY_IMAGE_TYPES.join(',')}
			multiple
			on:change={preview}
		/>
	</label>
	{#if uploading}
		<Loading />
	{/if}
	<button type="submit">Téléverser</button>
</form>
<h2>Galerie</h2>
<form method="POST" action="?/update" id={EDITOR_FORM_ID} use:enhance>
	<ol>
		{#each data.project.gallery as image, i}
			<li>
				<Image
					src={img(StorageBucket.Projects, image.name, {
						width: 800,
						withoutEnlargement: true,
					})}
					alt={image.id}
				/>
				<button type="submit" form={del(image.id)}>Supprimer</button>
				<input type="hidden" name="image[{i}][id]" readonly value={image.id} />
				<label>
					Titre
					<textarea name="image[{i}][title]" />
				</label>
				<label>
					Description
					<textarea name="image[{i}][description]" />
				</label>
			</li>
		{/each}
	</ol>
</form>
{#each data.project.gallery as image}
	<form hidden method="POST" action="?/delete" id={del(image.id)} use:enhance>
		<input type="hidden" readonly name="file_name" value={image.name} />
	</form>
{/each}

<style lang="scss">
	.upload {
		position: relative;
		margin: 0 auto;
		label {
			border-radius: var(--ui-radius-md);
			border: 2px dashed col(bg, 900);
			color: col(fg, 900);
			font-size: var(--ui-text-md);
			font-weight: 300;
			line-height: 1.5;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			height: 100%;
			width: 100%;
			padding: 3rem;
			text-align: center;
		}
	}

	code {
		padding: 2rem;
		min-height: 500px;
	}
</style>
