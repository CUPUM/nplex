<!--
	@component
	## Image
	Primitive image component capable of handling modern web image formats (webp / source-sets),
	and providing optimization functionalities such as lazy-loading.
-->
<script lang="ts" context="module">
	interface SourceSpecification {
		src: string;
		width: number;
		media: {
			condition: 'max-width' | 'min-width';
			width: number;
		};
	}

	// Consts:
	const GRADIENT_SPREAD_MIN = 40;
	const GRADIENT_SPREAD_MAX = 110;
	const GRADIENT_OUTSET = 20;
	// Derived consts:
	const GRADIENT_AREA = 100 + 2 * GRADIENT_OUTSET;
	const GRADIENT_SPREAD_RANGE = GRADIENT_SPREAD_MAX - GRADIENT_SPREAD_MIN;
</script>

<script lang="ts">
	import type css from 'csstype';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import Loading from './Loading.svelte';

	export let src: string | undefined = undefined;
	export let srcset: SourceSpecification[] | undefined = undefined;
	export let alt: string;
	export let objectFit: css.Properties['objectFit'] = 'cover';
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let setsrc: string | undefined = undefined;
	let error = false;
	let loading = false;

	function handleError(e: Event) {
		error = Boolean(src);
		loading = false;
	}

	function handleLoad(e: Event) {
		error = false;
		loading = false;
	}

	function handleLoadStart(e: Event) {
		loading = true;
	}

	onMount(() => {
		setsrc = src;
	});
</script>

<picture class={className} {style} on:click on:mouseover on:mousedown on:focus on:blur on:keypress>
	{#if srcset}
		{#each srcset as s}
			<source srcset={s.src} media={String(s.media)} />
		{/each}
	{/if}
	<img
		{alt}
		src={setsrc}
		loading="lazy"
		decoding="async"
		class:none={error || !src}
		style:object-fit={objectFit}
		on:load
		on:loadstart
		on:error
		on:loadeddata
		on:loadstart={handleLoadStart}
		on:load={handleLoad}
		on:error={handleError}
	/>
	{#if loading}
		<slot name="loading">
			<Loading />
		</slot>
	{/if}
	{#if error || !src}
		<div class="placeholder">
			<slot />
			{#if error}
				<slot name="error">
					<Icon class="icon" name="image-delete" />
				</slot>
			{/if}
		</div>
	{/if}
</picture>

<style lang="scss">
	:where(picture) {
		position: relative;
		border-radius: inherit;
		display: inline-block;
	}

	:where(img) {
		border-radius: inherit;
		width: 100%;
		height: 100%;

		&.none {
			opacity: 0;
		}
	}

	.placeholder {
		border-radius: inherit;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		background: col(bg, 900);

		:global(.icon) {
			font-size: 1.5rem;
			opacity: 0.4;
		}
	}
</style>
