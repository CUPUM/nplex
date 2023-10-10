<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import ImageInput from './ImageInput.svelte';

	export let data;
</script>

<form action="?/update" method="POST" use:enhance enctype="multipart/form-data">
	<ul>
		<ImageInput />
		{#each data.images as image, i (image.id)}
			<li animate:flip in:fly={{ y: 6, easing: expoOut }}>
				<img src={image.urlSm} alt="image-{image.id}" />
				<menu class="compact">
					<button class="button danger square" type="submit" formaction="?/delete&id={image.id}">
						<Trash class="button-icon" />
					</button>
				</menu>
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
	}

	ul {
		--card-height: 300px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	li {
		position: relative;
		height: var(--card-height);
		flex: none;
		border-radius: var(--radius-2xs);
	}

	img {
		object-fit: cover;
		height: 100%;
		border-radius: inherit;
	}

	menu {
		border-radius: calc(var(--base-radius) + var(--base-inset));
		background-color: var(--color-neutral-100);
		position: absolute;
		bottom: 0;
		margin: 0.5rem;
		padding: var(--base-inset);
		font-size: var(--size-sm);
	}
</style>
