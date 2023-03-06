<script lang="ts">
	import { page } from '$app/stores';
	import Dirty from '$components/Dirty.svelte';
	import DragndropContext from '$components/Dragndrop/DragndropContext.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { editorDirtyValues } from '../../../common';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import GalleryInput from './GalleryInput.svelte';
	import GalleryItem from './GalleryItem.svelte';

	export let data: PageData;

	const newItem = { newItem: true, id: 'NEW_ITEM' };

	function cloneData() {
		return [...data.project.gallery.map((img) => ({ ...img })), newItem];
	}

	let galleryItems = cloneData();

	function syncDown() {
		galleryItems = cloneData();
	}

	$: data.project.gallery, syncDown();
</script>

<Dirty
	specimen={galleryItems.slice(0, -1)}
	sample={$page.data.project.gallery}
	bind:dirty={$editorDirtyValues.gallery}
	strictOrder
/>
<EditorFormgroup legend="Galerie">
	<DragndropContext bind:items={galleryItems} let:dragndropZone let:dragndropItem>
		<ol use:dragndropZone>
			{#each galleryItems as item, i (item.id)}
				<li
					animate:flip={{ duration: 200, easing: cubicOut }}
					in:fly={{ opacity: 0, y: 12, duration: 250, easing: cubicOut, delay: 150 * i }}
					out:scale|local={{ duration: 200, start: 0.95, easing: cubicOut }}
					use:dragndropItem={{ item, disabled: item === newItem }}
				>
					{#if 'newItem' in item}
						<GalleryInput />
					{:else}
						<GalleryItem bind:data={item} {i} />
					{/if}
				</li>
			{/each}
		</ol>
	</DragndropContext>
</EditorFormgroup>

<style lang="scss">
	ol {
		display: grid;
		gap: 3rem 2rem;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		// width: 100%;
		// max-width: var(--ui-width-lg);
	}
</style>
