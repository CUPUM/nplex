<script lang="ts">
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { FORMID, formProject } from '../common';
	import type { PageData } from './$types';
	import GalleryImage from './GalleryImage.svelte';
	import ImageInput from './ImageInput.svelte';

	export let data: PageData;

	const placeholder = {
		placeholder: true,
		id: '-1',
	};

	const ACTION = {
		upload: '?/upload',
		update: '?/update',
	};

	let formRef: HTMLFormElement;
	let uploadInputRef: HTMLInputElement;
	let currentAction: string | null = null;

	function move(current: number, target: number) {
		if (target === current) {
			return;
		}
		const stash = $formProject.gallery.splice(current, 1)[0];
		$formProject.gallery.splice(target, 0, stash);
		$formProject.gallery = $formProject.gallery;
	}
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
	<h2 class="formgroup-legend">Galerie</h2>
	<input bind:this={uploadInputRef} type="submit" hidden formaction={ACTION.upload} />
	<ol>
		{#each [...$formProject.gallery, placeholder] as image, i (image.id)}
			<li
				animate:flip={{ duration: 150, easing: cubicInOut }}
				in:fly={{ duration: 300, y: 12, easing: cubicOut, delay: i * 100 }}
				out:scale|local={{ duration: 150, start: 0.95, easing: cubicIn }}
			>
				{#if 'placeholder' in image}
					<ImageInput
						on:change={() => formRef.requestSubmit(uploadInputRef)}
						loading={currentAction === ACTION.upload}
					/>
				{:else}
					<GalleryImage
						sample={data.project.gallery[i]}
						{image}
						on:forward={() => move(i, i - 1)}
						on:backward={() => move(i, i + 1)}
						on:drop={(e) => move(i, e.detail.destination)}
						{i}
					/>
				{/if}
			</li>
		{/each}
	</ol>
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
	}

	h2 {
		top: 0;
		position: relative;
		margin-block: 2rem;
		margin-inline: 3rem;
	}

	ol {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
		padding: calc(0.5 * 1.5rem);

		@include laptop {
			grid-template-columns: repeat(3, 1fr);
		}

		@include tablet {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
