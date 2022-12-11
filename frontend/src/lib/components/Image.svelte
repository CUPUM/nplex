<!--
	@component
	## Image
	Primitive image component capable of handling modern web image formats (webp / source-sets),
	and providing optimization functionalities such as lazy-loading.

-->
<script lang="ts" context="module">
	interface SourceSpecification {
		src: string;
		media: string;
		type?: string;
	}
</script>

<script lang="ts">
	import type { Properties } from 'csstype';

	export let src: string | undefined = undefined;
	export let srcset: SourceSpecification[] | undefined = undefined;
	export let alt: string;
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	/**
	 * Useful to set a placeholder background color.
	 */
	export let background: string | undefined = undefined;
	export let objectFit: Properties['objectFit'] = 'cover';
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
</script>

<picture
	class="image {className}"
	{style}
	{alt}
	on:click
	on:load
	on:mouseover
	on:mousedown
	on:focus
	on:blur
	on:keypress
>
	{#if srcset && srcset.length}
		{#each srcset as source}
			<source {...source} />
		{/each}
	{/if}
	<img
		{src}
		{alt}
		{width}
		{height}
		loading="lazy"
		decoding="async"
		on:loadstart
		on:loadeddata
		on:load
		style:background
		style:objectFit
	/>
</picture>

<style lang="scss">
	:where(.image) {
		position: relative;
		display: inline-block;
	}

	img {
		height: 100%;
		width: 100%;
	}
</style>
