<script lang="ts">
	import { page } from '$app/stores';
	import DragndropContext from '$components/Dragndrop/DragndropContext.svelte';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import GalleryInput from './GalleryInput.svelte';
	import GalleryItem from './GalleryItem.svelte';

	const newItem = { newItem: true, id: 'NEW_ITEM' };

	$: galleryItems = [...($page.data as PageData).project.gallery, newItem];
</script>

<EditorFormgroup legend="Galerie">
	<DragndropContext bind:items={galleryItems} let:dragndropZone let:dragndropItem>
		<ol use:dragndropZone>
			{#each galleryItems as item, i (item.id)}
				<li use:dragndropItem={{ item, disabled: item === newItem }}>
					{#if 'newItem' in item}
						<GalleryInput />
					{:else}
						<GalleryItem data={item} {i} />
					{/if}
				</li>
			{/each}
		</ol>
	</DragndropContext>
	<!-- <ol
		use:dndzone={{ items: galleryItems, flipDurationMs: 150 }}
		on:consider={consider}
		on:finalize={finalize}
	>
		{#each galleryItems as item, i (item.id)}
			<li animate:flip={{ duration: 200 }}>
				{#if 'newItem' in item}
					<GalleryInput />
				{:else}
					<GalleryItem data={item} {i} shadow={} />
					{#if SHADOW_ITEM_MARKER_PROPERTY_NAME in item && item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
						<div>Shalut</div>
					{/if}
				{/if}
			</li>
		{/each}
	</ol> -->
</EditorFormgroup>

<style lang="scss">
	ol {
		display: grid;
		gap: 0;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
		max-width: var(--ui-width-lg);
	}

	li {
		padding: 1rem;
	}
</style>
