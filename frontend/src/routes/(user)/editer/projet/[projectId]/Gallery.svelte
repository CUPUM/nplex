<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import GalleryImage from './GalleryImage.svelte';
	import GalleryInput from './GalleryInput.svelte';

	export let gallery: PageData['project']['gallery'];

	let _gallery = [...gallery];

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
		const stash = _gallery.splice(current, 1)[0];
		_gallery.splice(target, 0, stash);
		_gallery = _gallery;
	}
</script>

<fieldset>
	<legend>Galerie</legend>
	<ol>
		{#each [..._gallery, placeholder] as image, i (image.id)}
			<li
				animate:flip={{ duration: 150, easing: cubicInOut }}
				in:fly={{ duration: 300, y: 12, easing: cubicOut, delay: i * 100 }}
				out:scale|local={{ duration: 150, start: 0.95, easing: cubicIn }}
			>
				{#if 'placeholder' in image}
					<GalleryInput
						on:change={() => formRef.requestSubmit(uploadInputRef)}
						loading={currentAction === ACTION.upload}
					/>
				{:else}
					<GalleryImage
						bind:image
						on:forward={() => move(i, i - 1)}
						on:backward={() => move(i, i + 1)}
						on:drop={(e) => move(i, e.detail.destination)}
						{i}
					/>
				{/if}
			</li>
		{/each}
	</ol>
</fieldset>

<style lang="scss">
	ol {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;

		@include medium {
			grid-template-columns: repeat(3, 1fr);
		}

		@include small {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
