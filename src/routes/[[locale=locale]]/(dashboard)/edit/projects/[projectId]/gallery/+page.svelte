<script lang="ts">
	import { superForm } from '$lib/forms/client';
	import { flip } from 'svelte/animate';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import ImageCard from './ImageCard.svelte';
	import ImageInputForm from './ImageInputForm.svelte';

	export let data;

	const { form, enhance } = superForm(data.updateGalleryForm);
</script>

<ImageInputForm data={data.insertImagesForm} />
<form method="POST" use:enhance>
	<ul>
		{#each data.images as image, i (image.id)}
			<li
				animate:flip={{ duration: 250, easing: expoInOut }}
				in:fly={{ y: 6, easing: expoOut }}
				out:scale={{ duration: 50, start: 0.95 }}
			>
				<ImageCard
					{image}
					{form}
					on:delete={() => {
						data.images.splice(i, 1);
						data.images = data.images;
					}}
				/>
			</li>
		{/each}
	</ul>
</form>

<style lang="postcss">
	form {
		padding: 2rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
		border-radius: inherit;
		background-color: var(--color-neutral-50);
		:global(:--dark) & {
			background-color: var(--color-neutral-800);
		}
	}

	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
