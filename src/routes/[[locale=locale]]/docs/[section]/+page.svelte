<script lang="ts">
	import { page } from '$app/stores';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let data;
</script>

{#key $page.params.section}
	<div class="bg" in:fly={{ y: 12, duration: 500, easing: expoOut }}>{$page.params.section}</div>
	<h1 in:fly={{ x: '-0.2em', duration: 350, easing: cubicOut }}>{$page.params.section}</h1>
{/key}
<svelte:component this={data.doc} />

<style lang="postcss">
	h1 {
		text-transform: capitalize;
	}

	.bg {
		text-transform: capitalize;
		color: var(--color-neutral-200);
		font-weight: 900;
		line-height: 1;
		position: fixed;
		z-index: -1;
		font-size: 50vh;
		top: 50%;
		left: -0.6em;
		opacity: 0.35;
		width: 100%;
		height: 0;
		transform: rotateZ(90deg);
		/* background: linear-gradient(30deg, transparent -25%, currentColor 90%); */
		:global(:--dark) & {
			color: var(--color-neutral-950);
		}
	}
</style>
