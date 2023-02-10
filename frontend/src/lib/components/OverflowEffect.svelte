<!--
	@component
	# Overflow Effect
	Create visual cues to signal presence of available (unreached) overflow content.
-->
<script lang="ts" context="module">
	/**
	 * Distance from an end within which the overflow effect is considered unnecessary.
	 */
	const BUFFER_DISTANCE = 50;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { col } from '$utils/css';
	import { onDestroy, onMount } from 'svelte';

	export let top: boolean = false;
	export let right: boolean = true;
	export let bottom: boolean = false;
	export let left: boolean = true;
	export let color: string = col('bg', 300);

	let contentRef: HTMLDivElement;
	let overflowTop: boolean = false;
	let overflowRight: boolean = false;
	let overflowBottom: boolean = false;
	let overflowLeft: boolean = false;
	let observer: ResizeObserver;

	function checkOverflow() {
		if (contentRef.parentElement) {
			overflowTop = contentRef.parentElement.scrollTop > BUFFER_DISTANCE;
			overflowRight =
				contentRef.parentElement.scrollLeft + contentRef.parentElement.offsetWidth <
				contentRef.parentElement.scrollWidth - BUFFER_DISTANCE;
			overflowBottom =
				contentRef.parentElement.scrollTop + contentRef.parentElement.offsetHeight <
				contentRef.parentElement.scrollHeight - BUFFER_DISTANCE;
			overflowLeft = contentRef.parentElement.scrollLeft > BUFFER_DISTANCE;
		}
	}

	function handleScroll(e: Event & { target: EventTarget | null }) {
		if (e.target instanceof HTMLElement) {
			checkOverflow();
		}
	}

	onMount(() => {
		if (browser) {
			observer = new ResizeObserver(checkOverflow);
			if (contentRef.parentElement) {
				observer.observe(contentRef.parentElement);
				contentRef.parentElement.addEventListener('scroll', handleScroll);
				checkOverflow();
			}
		}
	});

	onDestroy(() => {
		if (browser) {
			if (contentRef.parentElement) {
				observer.unobserve(contentRef.parentElement);
				observer.disconnect();
				contentRef.parentElement.removeEventListener('scroll', handleScroll);
			}
		}
	});
</script>

{#if left}
	<div aria-hidden="true" class="end left" class:active={overflowLeft} style:--fx-color={color}>
		<div class="fx" />
	</div>
{/if}
{#if top}
	<div aria-hidden="true" class="end top" class:active={overflowTop} style:--fx-color={color}>
		<div class="fx" />
	</div>
{/if}
<div class="content" bind:this={contentRef}>
	<slot />
</div>
{#if right}
	<div aria-hidden="true" class="end right" class:active={overflowRight} style:--fx-color={color}>
		<div class="fx" />
	</div>
{/if}
{#if bottom}
	<div aria-hidden="true" class="end bottom" class:active={overflowBottom} style:--fx-color={color}>
		<div class="fx" />
	</div>
{/if}

<style lang="scss">
	.content {
		all: inherit;
		display: contents;
	}

	.end {
		pointer-events: none;
		position: sticky;
		flex: none;
		z-index: 1;
		overflow: visible;

		&.left {
			top: 0;
			left: 0;
			max-height: 100%;
			overflow: visible;

			.fx {
				left: 0;
				height: 100%;
				width: var(--fx-size);
				background: linear-gradient(90deg, var(--fx-color) 0%, transparent 100%);
			}
		}

		&.top {
			top: 0;
			left: 0;
			width: 100%;

			.fx {
				top: 0;
				width: 100%;
				height: var(--fx-size);
				background: var(--fx-color);
			}
		}

		&.right {
			right: 0;
			bottom: 0;
			max-height: 100%;

			.fx {
				right: 0;
				height: 100%;
				width: var(--fx-size);
				background: linear-gradient(-90deg, var(--fx-color) 0%, transparent 100%);
			}
		}

		&.bottom {
			bottom: 0;
			right: 0;
			max-width: 100%;

			.fx {
				bottom: 0;
				width: 100%;
				height: var(--fx-size);
				background: var(--fx-color);
			}
		}
	}

	.fx {
		--fx-size: 100px;
		opacity: 0;
		position: absolute;
		transition: all 0.25s ease-out;

		.active & {
			opacity: 0.8;
		}
	}
</style>
