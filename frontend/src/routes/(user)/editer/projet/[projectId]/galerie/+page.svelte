<script lang="ts">
	import { enhance } from '$app/forms';
	import { FORMID } from '../common';
	import type { PageData } from './$types';
	import GalleryImage from './GalleryImage.svelte';
	import ImageInput from './ImageInput.svelte';

	export let data: PageData;

	const ACTION = {
		upload: '?/upload',
		update: '?/update',
	};

	let formRef: HTMLFormElement;
	let uploadInputRef: HTMLInputElement;
	let currentAction: string | null = null;
</script>

<form
	bind:this={formRef}
	class="update"
	method="POST"
	action="?/update"
	id={FORMID}
	use:enhance={({ form, data, action, cancel }) => {
		currentAction = action.search;
		return async ({ update, result }) => {
			update({ reset: false });
			currentAction = null;
		};
	}}
>
	<h2>Galerie</h2>
	<input bind:this={uploadInputRef} type="submit" hidden formaction={ACTION.upload} />
	<section>
		<ol>
			{#each data.project.gallery as image, i (image.id)}
				<li>
					<GalleryImage {image} {i} />
				</li>
			{/each}
		</ol>
		<ImageInput
			on:change={() => formRef.requestSubmit(uploadInputRef)}
			loading={currentAction === ACTION.upload}
		/>
	</section>
	>
</form>

<style lang="scss">
	form {
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		margin: 0 auto;
		gap: 0;
		padding: var(--ui-gutter);
	}

	section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0;
		padding: calc(0.5 * var(--ui-gutter));
	}

	ol {
		display: contents;
	}

	li {
		padding: calc(0.5 * var(--ui-gutter));
	}
</style>
