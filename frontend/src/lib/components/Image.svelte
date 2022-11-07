<!--
	@component
	## Image
	Primitive image component capable of handling modern web image formats (webp / source-sets),
	and providing optimization functionalities such as lazy-loading.

-->
<script lang="ts" context="module">
	// export function getLocalImageDataUrl() {}
</script>

<script lang="ts">
	export let src: string;
	export let srcset;
	export let alt: string;
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
	<img />
</picture>

<style>
	:where(.image) {
	}
</style>
