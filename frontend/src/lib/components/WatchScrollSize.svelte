<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let scrollWidth: number | undefined = undefined;
	export let scrollHeight: number | undefined = undefined;

	let resizeObserver: ResizeObserver;
	let mutationObserver: MutationObserver;
	let hint: HTMLElement;

	function handleResize(entries: ResizeObserverEntry[]) {
		if (entries[0].target.scrollHeight !== scrollHeight) {
			scrollHeight = entries[0].target.scrollHeight;
		}
		if (entries[0].target.scrollWidth !== scrollWidth) {
			scrollWidth = entries[0].target.scrollWidth;
		}
	}

	function handleMutation(entries: MutationRecord[]) {
		if (hint.parentElement) {
			if (hint.parentElement.scrollHeight !== scrollHeight) {
				scrollHeight = hint.parentElement.scrollHeight;
			}
			if (hint.parentElement.scrollWidth !== scrollWidth) {
				scrollWidth = hint.parentElement.scrollWidth;
			}
		}
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
