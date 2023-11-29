<script lang="ts">
	import { imageSrc } from '$lib/media/url';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let image: PageData['randomImages'][number];
	export let i: number;

	let loaded = false;
	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 250);
	});
</script>

<img
	src={imageSrc(image.storageName)}
	on:load={() => {
		loaded = true;
	}}
	style:--d="{i * Math.random() * 500}ms"
	class:loaded={loaded && mounted}
/>

<style lang="postcss">
	img {
		border-radius: var(--radius-sm);
		opacity: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		transform: translateZ(-20px);
		transition: all 2s var(--d) var(--ease-out-expo);
	}

	.loaded {
		opacity: 0.5;
		transform: translateZ(0);
	}
</style>
