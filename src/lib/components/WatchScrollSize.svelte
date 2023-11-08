<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let scrollWidth: number | undefined = undefined;
	export let scrollHeight: number | undefined = undefined;

	let resizeObserver: ResizeObserver;
	let mutationObserver: MutationObserver;
	let hint: HTMLElement;

	function handleResize(entries?: ResizeObserverEntry[]) {
		const el = entries ? entries[0].target : hint.parentElement;
		if (el) {
			if (el.scrollHeight !== scrollHeight && el.scrollHeight > 0) {
				scrollHeight = el.scrollHeight;
			}
			if (el.scrollWidth !== scrollWidth && el.scrollWidth > 0) {
				scrollWidth = el.scrollWidth;
			}
		}
	}

	function handleMutation(entries: MutationRecord[]) {
		handleResize();
	}

	onMount(() => {
		resizeObserver = new ResizeObserver(handleResize);
		mutationObserver = new MutationObserver(handleMutation);
		if (hint.parentElement) {
			resizeObserver.observe(hint.parentElement);
			mutationObserver.observe(hint.parentElement, {
				childList: true,
				subtree: true,
				attributes: true,
			});
		}
		handleResize();
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
		mutationObserver?.disconnect();
	});
</script>

<div bind:this={hint} />

<style lang="scss">
	div {
		display: none;
	}
</style>
