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
</script>

<script lang="ts">
	import type { Properties } from 'csstype';

	export let src: string | undefined = undefined;
	export let srcset: SourceSpecification[] | undefined = undefined;
	export let alt: string;
	/**
	 * Useful to set a placeholder background color.
	 */
	export let background: string | undefined = undefined;
	export let objectFit: Properties['objectFit'] = 'cover';
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	function formatSrcset(input: typeof srcset) {
		if (!input) {
			return undefined;
		}
		return input.map((s) => `${s.src} ${s.width}w`).join(', ');
	}

	function formatSizes(input: typeof srcset) {
		if (!input) {
			return undefined;
		}
		return input
			.map((s) => `(${s.media.condition}: ${s.media.width}px) ${s.width}px`)
			.join(', ');
	}

	$: formattedSrcset = formatSrcset(srcset);
	$: formattedSizes = formatSizes(srcset);
</script>

<img
	class="image {className}"
	{style}
	style:background
	style:object-fit={objectFit}
	{alt}
	{src}
	srcset={formattedSrcset}
	sizes={formattedSizes}
	loading="lazy"
	decoding="async"
	on:click
	on:load
	on:mouseover
	on:mousedown
	on:focus
	on:blur
	on:keypress
	on:loadstart
	on:loadeddata
	on:load
/>

<style lang="scss">
</style>
