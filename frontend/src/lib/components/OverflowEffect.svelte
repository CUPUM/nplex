<!--
	@component
	# Overflow Effect
	Create visual cues to signal presence of available (unreached) overflow content.
	
-->
<script lang="ts">
	import { browser } from '$app/environment';
	import { debounce } from '$utils/modifiers';
	import { onDestroy, onMount } from 'svelte';
	import Icon from './Icon.svelte';

	export let top: boolean = false;
	export let right: boolean = true;
	export let bottom: boolean = false;
	export let left: boolean = true;
	export let bufferDistance = 50;
	export let scrollDistance = 200;

	let contentRef: HTMLDivElement;
	let overflowTop: boolean = false;
	let overflowRight: boolean = false;
	let overflowBottom: boolean = false;
	let overflowLeft: boolean = false;
	let observer: ResizeObserver;

	function checkOverflow() {
		if (contentRef.parentElement) {
			overflowTop = contentRef.parentElement.scrollTop > bufferDistance;
			overflowRight =
				contentRef.parentElement.scrollLeft + contentRef.parentElement.offsetWidth <
				contentRef.parentElement.scrollWidth - bufferDistance;
			overflowBottom =
				contentRef.parentElement.scrollTop + contentRef.parentElement.offsetHeight <
				contentRef.parentElement.scrollHeight - bufferDistance;
			overflowLeft = contentRef.parentElement.scrollLeft > bufferDistance;
		}
	}

	function scroll(direction: 'up' | 'right' | 'down' | 'left') {
		const top = direction === 'up' ? -scrollDistance : direction === 'down' ? scrollDistance : 0;
		const left =
			direction === 'left' ? -scrollDistance : direction === 'right' ? scrollDistance : 0;
		contentRef.parentElement?.scrollBy({ top, left, behavior: 'smooth' });
	}

	function handleScroll(e: Event & { target: EventTarget | null }) {
		if (e.target instanceof HTMLElement) {
			checkOverflow();
		}
	}

	const handleResize = debounce(() => {
		checkOverflow();
	}, 100);

	onMount(() => {
		if (browser) {
			observer = new ResizeObserver(handleResize);
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
	<div aria-hidden="true" class="end left" class:active={overflowLeft}>
		<div class="fx">
			<button on:pointerdown={() => scroll('left')} disabled={!overflowLeft}>
				<Icon name="chevron-left" />
			</button>
		</div>
	</div>
{/if}
{#if top}
	<div aria-hidden="true" class="end top" class:active={overflowTop}>
		<div class="fx">
			<button on:pointerdown={() => scroll('up')} disabled={!overflowTop}>
				<Icon name="chevron-right" />
			</button>
		</div>
	</div>
{/if}
<div class="contents" bind:this={contentRef}>
	<slot />
</div>
{#if right}
	<div aria-hidden="true" class="end right" class:active={overflowRight}>
		<div class="fx">
			<button on:pointerdown={() => scroll('right')} disabled={!overflowRight}>
				<Icon name="chevron-right" />
			</button>
		</div>
	</div>
{/if}
{#if bottom}
	<div aria-hidden="true" class="end bottom" class:active={overflowBottom}>
		<div class="fx">
			<button on:pointerdown={() => scroll('down')} disabled={!overflowBottom}>
				<Icon name="chevron-right" />
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.contents {
		all: inherit;
		display: contents;
	}

	button {
		pointer-events: all;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		color: col(fg, 000, 0.5);
		border-radius: 99px;
		opacity: 0.8;
		background: var(--ui-overflow-color);
		transition: all 0.15s;

		&:disabled {
			pointer-events: none;
		}

		&:hover {
			opacity: 1;
			color: col(fg, 500);
			filter: brightness(1.1);
		}
	}

	i {
		position: relative;
		top: -0.1em;
	}

	.end {
		--ui-overflow-outset: var(--overflow-outset, 0px);
		--ui-overflow-color: var(--overflow-color, #{col(bg, 500)});
		--corr: calc(-1 * var(--ui-overflow-outset));
		border-radius: inherit;
		pointer-events: none;
		position: sticky;
		flex: none;
		z-index: 999;
		overflow: visible;

		&.left {
			top: 0;
			left: 0;
			max-height: 100%;

			.fx {
				top: var(--corr);
				left: var(--corr);
				height: calc(100% - 2 * var(--corr));
				width: var(--fx-size);
				background: linear-gradient(90deg, var(--ui-overflow-color) 0%, transparent 100%);
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
				background: var(--ui-overflow-color);
			}
		}

		&.right {
			right: 0;
			bottom: 0;
			max-height: 100%;

			.fx {
				right: var(--corr);
				top: var(--corr);
				height: calc(100% - 2 * var(--corr));
				width: var(--fx-size);
				background: linear-gradient(-90deg, var(--ui-overflow-color) 0%, transparent 100%);
				justify-content: flex-end;
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
				background: var(--ui-overflow-color);
			}
		}
	}

	.fx {
		--fx-size: 120px;
		border-radius: inherit;
		padding: 5px;
		display: flex;
		align-items: stretch;
		opacity: 0;
		position: absolute;
		transition: all 0.25s ease-out;

		.active & {
			opacity: 1;
		}
	}
</style>
