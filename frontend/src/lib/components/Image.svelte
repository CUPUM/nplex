<!--
	@component
	## Image
	Primitive image component capable of handling modern web image formats (webp / source-sets),
	and providing optimization functionalities such as lazy-loading.

-->
<script lang="ts" context="module">
	interface SourceSpecification {
		srcset: string;
		media: string;
		type?: string;
	}
</script>

<script lang="ts">
	import type { Properties } from 'csstype';

	export let src: string = undefined;
	export let sources: SourceSpecification[];
	export let alt: string;
	export let objectFit: Properties['objectFit'] = 'cover';
	export let layout: Properties[''];
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
	{#each srcset as s}
		<source />
	{/each}
	<img on:loadstart on:loadeddata on:load />
</picture>

<style>
	.image {
	}
</style>
