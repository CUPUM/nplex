<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import Dialog from '$lib/components/Dialog.svelte';
	import { imageThumbnailUrl } from '$lib/media/url';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Pen, Trash } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let image: PageData['images'][number];

	const {
		elements: { trigger, ...dialogElements },
		states: { open },
	} = createDialog();
</script>

<figure>
	<img src={imageThumbnailUrl(image.storageName)} alt="image-{image.id}" />
	<menu class="toolbar">
		<button
			use:ripple
			class="button ghost danger square"
			type="submit"
			formaction="?/delete&id={image.id}"
		>
			<Trash class="button-icon" />
		</button>
		<button class="button ghost square" type="button" use:ripple use:melt={$trigger}>
			<Pen class="button-icon" />
		</button>
	</menu>
</figure>

<Dialog {...dialogElements} {open}></Dialog>

<style lang="postcss">
	figure {
		position: relative;
		height: 250px;
		min-width: 150px;
		flex: none;
		border-radius: var(--radius-xs);
	}

	img {
		object-fit: cover;
		height: 100%;
		width: 100%;
		border-radius: inherit;
		cursor: zoom-in;
	}

	menu {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1rem;
		font-size: var(--size-sm);
		backdrop-filter: blur(6px);
		background-color: color-mix(in srgb, var(--color-neutral-100) 90%, transparent);
		:global(:--dark) & {
			background-color: color-mix(in srgb, var(--color-neutral-800) 90%, transparent);
		}
	}
</style>
