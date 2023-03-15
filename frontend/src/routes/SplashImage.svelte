<script lang="ts">
	import Image from '$components/Image/Image.svelte';
	import { browserDb } from '$utils/database/client';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import type { PageData } from './$types';

	export let image: PageData['splashImages'][number];
	export let i: number;

	let loaded = false;

	const url = browserDb.storage.from(STORAGE_BUCKETS.PROJECTS).getPublicUrl(image.name!)
		.data.publicUrl;

	const d = Math.random() * 250 + 250;
	const s = Math.random() * 0.4 + 0.8;
	const x = Math.random() * 80 + 10;
	const y = Math.random() * 80 + 10;
	const z = Math.round(Math.random());
</script>

<div
	class="splash-image"
	style:--scale={s}
	style:--x="{x}%"
	style:--y="{y}%"
	style:--d="{d}ms"
	style:--i={i}
	style:z-index={z}
	class:loaded
>
	<Image
		on:load={() => {
			loaded = true;
		}}
		src={url}
		alt={image.title ?? 'Image de projet aléatoire.'}
	/>
</div>

<style lang="scss">
	.splash-image {
		position: absolute;
		object-fit: contain;
		width: calc(200px * var(--scale));
		border-radius: var(--ui-radius-lg);
		top: var(--y);
		left: var(--x);
		transform: translate(-50%, -50%) scale(0.9);
		opacity: 0;
		// background-color: col(bg, 000, 0.25);
		backdrop-filter: blur(12px);
		// border: 1px solid col(bg, 900, 0.2);
		transition-property: transform, opacity;
		transition-duration: var(--d);
		transition-timing-function: var(--ui-ease-out);
		transition-delay: calc(var(--i) * 0.15s + 1s);

		:global(img) {
			opacity: 0.75;
		}
	}

	.loaded {
		opacity: 1;
		box-shadow: 0 1rem 5rem -2rem col(bg, 100);
		transform: translate(-50%, -50%) scale(1);
	}
</style>
