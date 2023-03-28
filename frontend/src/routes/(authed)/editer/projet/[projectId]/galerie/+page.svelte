<script lang="ts">
	import AnimateHeight from '$components/AnimateHeight.svelte';
	import Dirty from '$components/Dirty.svelte';
	import DragndropProvider from '$components/Dragndrop/DragndropProvider.svelte';
	import { dirtyValues } from '$routes/(authed)/editer/common';
	import { offsetItem } from '$utils/array';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoIn, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { project } from '../common';
	import GalleryInput from './GalleryInput.svelte';
	import GalleryItem from './GalleryItem.svelte';

	export let data;

	const newImage = { newItem: true, id: 'NEW_ITEM' } as const;

	$: console.log($project.gallery);
</script>

<header class="editor-form-header">
	<h1 class="heading-lg">Galerie</h1>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde aspernatur minima enim
		praesentium blanditiis. Est culpa quia qui incidunt sequi.
	</p>
</header>
<Dirty
	sample={data.project.gallery}
	specimen={$project.gallery}
	bind:dirty={$dirtyValues.gallery}
	strictOrder
/>
<fieldset class="editor-form-group">
	<AnimateHeight>
		<DragndropProvider bind:items={$project.gallery} let:dragndropZone let:dragndropItem>
			<ol use:dragndropZone>
				{#each [...$project.gallery, newImage] as item, i (item.id)}
					<li
						animate:flip={{ duration: 150, easing: expoOut }}
						in:fly={{ opacity: 0, y: 12, duration: 250, easing: cubicOut, delay: 150 * i }}
						out:scale|local={{ duration: 150, start: 0.95, easing: expoIn }}
						use:dragndropItem={'newItem' in item ? { item: undefined, disabled: true } : { item }}
					>
						{#if 'newItem' in item}
							<GalleryInput />
						{:else}
							<GalleryItem
								on:shift={(e) => {
									$project.gallery = offsetItem($project.gallery, i, e.detail, [
										$project.gallery.length - 1,
									]);
								}}
								bind:data={item}
								{i}
							/>
						{/if}
					</li>
				{/each}
			</ol>
		</DragndropProvider>
	</AnimateHeight>
</fieldset>

<style lang="scss">
	ol {
		display: grid;
		gap: 3rem 2rem;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>
