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
		transform: translateZ(-20px);
		height: 100%;
		width: 100%;
		object-fit: cover;
		transition: all var(--duration-medium) ease-out;
	}

	@keyframes intro {
		to {
			opacity: 1;
			transform: translateZ(0);
		}
	}

	.loaded {
		animation: intro 2s var(--ease-out-expo) var(--d) forwards;
	}
</style>
