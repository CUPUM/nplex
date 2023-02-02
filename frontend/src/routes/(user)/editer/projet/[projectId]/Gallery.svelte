<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import { dirty } from './common';
	import GalleryImage from './GalleryImage.svelte';
	import GalleryInput from './GalleryInput.svelte';

	export let gallery: PageData['project']['gallery'];
	$: $dirty.gallery =
		_gallery.length !== gallery.length ||
		!_gallery.every(
			(image, i) =>
				gallery[i] &&
				gallery[i].id === image.id &&
				(gallery[i].description ?? '') === (image.description ?? '') &&
				(gallery[i].title ?? '') === (image.title ?? '')
		);

	/**
	 * Keep a local editable copy of gallery in sync with refreshed db data.
	 */
	let _gallery: typeof gallery = [];
	function syncGallery(sample: typeof gallery) {
		_gallery = gallery.map((i) => ({ ...i }));
	}
	$: syncGallery(gallery);

	const placeholder = {
		placeholder: true,
		id: '-1',
	} as const;

	function move(current: number, target: number) {
		if (target === current) {
			return;
		}
		const stash = _gallery.splice(current, 1)[0];
		_gallery.splice(target, 0, stash);
		_gallery = _gallery;
	}
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Galerie</legend>
	<section class="formfields">
		<ol>
			{#each [..._gallery, placeholder] as image, i (image.id)}
				<li
					animate:flip={{ duration: 150, easing: cubicInOut }}
					in:fly={{ duration: 300, y: 12, easing: cubicOut, delay: i * 100 }}
					out:scale|local={{ duration: 150, start: 0.95, easing: cubicIn }}
				>
					{#if 'placeholder' in image}
						<GalleryInput />
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
	</section>
</fieldset>

<style lang="scss">
	ol {
		--gap: 2rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap);

		@include laptop {
			grid-template-columns: repeat(3, 1fr);
		}

		@include breakpoint.tablet {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
