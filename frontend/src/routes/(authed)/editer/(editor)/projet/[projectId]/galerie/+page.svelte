<script lang="ts">
	import { page } from '$app/stores';
	import Dragndrop from '$components/Dragndrop/Dragndrop.svelte';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import GalleryInput from './GalleryInput.svelte';

	const newItem = { id: 'new' } as const;

	$: galleryItems = [...($page.data as PageData).project.gallery, newItem];
</script>

<EditorFormgroup legend="Galerie">
	<ol>
		<Dragndrop data={galleryItems} let:items let:dnditem>
			{#each items as item}
				{#if item.datum == newItem}
					<li><GalleryInput /></li>
				{:else}
					<li use:dnditem>Item: {JSON.stringify(item.datum)}</li>
				{/if}
			{/each}
		</Dragndrop>
		<!-- {#each galleryItems as item, i (item.id)}
			<li
				animate:flip={{ duration: 150, easing: cubicInOut }}
				in:fly={{ duration: 300, y: 12, easing: cubicOut, delay: i * 100 }}
				out:scale|local={{ duration: 150, start: 0.95, easing: cubicIn }}
			>
				{#if item.id === 'new'}
					<GalleryInput />
				{:else}
					<GalleryItem
						bind:image
						on:forward={() => move(i, i - 1)}
						on:backward={() => move(i, i + 1)}
						on:drop={(e) => move(i, e.detail.destination)}
						{i}
					/>
				{/if}
			</li>
		{/each} -->
	</ol>
</EditorFormgroup>

<style lang="scss">
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fit, 300px);
	}
</style>
