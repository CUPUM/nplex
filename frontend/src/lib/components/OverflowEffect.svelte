<!--
	@component
	# Overflow Effect
	Create visual cues to signal presence of available (unreached) overflow content.
	
-->
<script lang="ts" context="module">
	const TRANSITION_PARAMS: FadeParams = {
		duration: 150,
		delay: 0,
	};

	const SCROLL_DIRECTION = {
		Up: 'up',
		Right: 'right',
		Down: 'down',
		Left: 'left',
	} as const;
	type ScrollDirection = ValueOf<typeof SCROLL_DIRECTION>;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { debounce } from '$utils/modifiers';
	import { onDestroy, onMount } from 'svelte';
	import { fade, type FadeParams } from 'svelte/transition';
	import type { ValueOf } from 'ts-essentials';
	import Icon from './Icon.svelte';

	export let x: boolean | 'auto' | 'scroll' = 'auto';
	export let y: boolean | 'auto' | 'scroll' = 'auto';
	export let bufferDistance = 5;
	export let scrollDistance = 200;

	let observer: ResizeObserver;
	let scrollRef: HTMLDivElement;
	let top: boolean = false;
	let right: boolean = false;
	let bottom: boolean = false;
	let left: boolean = false;

	function checkOverflow() {
		if (scrollRef) {
			top = scrollRef.scrollTop > bufferDistance;
			right = scrollRef.scrollLeft + scrollRef.offsetWidth < scrollRef.scrollWidth - bufferDistance;
			bottom =
				scrollRef.scrollTop + scrollRef.offsetHeight < scrollRef.scrollHeight - bufferDistance;
			left = scrollRef.scrollLeft > bufferDistance;
		}
	}

	function scroll(direction: ScrollDirection) {
		const top =
			direction === SCROLL_DIRECTION.Up
				? -scrollDistance
				: direction === SCROLL_DIRECTION.Down
				? scrollDistance
				: 0;
		const left =
			direction === SCROLL_DIRECTION.Left
				? -scrollDistance
				: direction === SCROLL_DIRECTION.Right
				? scrollDistance
				: 0;
		scrollRef?.scrollBy({ top, left, behavior: 'smooth' });
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
			if (scrollRef) {
				observer.observe(scrollRef);
				checkOverflow();
			}
		}
	});

	onDestroy(() => {
		if (browser) {
			if (scrollRef) {
				observer.unobserve(scrollRef);
				observer.disconnect();
			}
		}
	});
</script>

<div class="container">
	<div
		class="scroll noscrollbar"
		style:overflow-x={typeof x === 'string' ? x : x ? 'auto' : undefined}
		style:overflow-y={typeof y === 'string' ? y : y ? 'auto' : undefined}
		bind:this={scrollRef}
		on:scroll={handleScroll}
	>
		<slot />
	</div>
	<div class="effect">
		{#if top}
			<div class="end top" transition:fade|local={TRANSITION_PARAMS}>
				<button on:pointerdown={() => scroll(SCROLL_DIRECTION.Up)}>
					<Icon name="chevron-up" />
				</button>
			</div>
		{/if}
		{#if right}
			<div class="end right" transition:fade|local={TRANSITION_PARAMS}>
				<button on:pointerdown={() => scroll(SCROLL_DIRECTION.Right)}>
					<Icon name="chevron-right" />
				</button>
			</div>
		{/if}
		{#if bottom}
			<div class="end bottom" transition:fade|local={TRANSITION_PARAMS}>
				<button on:pointerdown={() => scroll(SCROLL_DIRECTION.Down)}>
					<Icon name="chevron-down" />
				</button>
			</div>
		{/if}
		{#if left}
			<div class="end left" transition:fade|local={TRANSITION_PARAMS}>
				<button on:pointerdown={() => scroll(SCROLL_DIRECTION.Left)}>
					<Icon name="chevron-left" />
				</button>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		--ui-overflow-effect-size: var(--overflow-effect-size, min(30%, 120px));
		--ui-overflow-effect-color: var(--overflow-effect-color, #{col(bg, 100)});
		border-radius: inherit;
		position: relative;
		// display: grid;
		// grid-template-areas: 'contents';
	}

	.scroll {
		position: relative;
		border-radius: inherit;
		// grid-area: contents;
	}

	.effect {
		pointer-events: none;
		position: absolute;
		border-radius: inherit;
		overflow: hidden;
		// grid-area: contents;
		inset: 0;
	}

	.end {
		position: absolute;
		display: flex;
		flex-direction: row;
		padding: 6px;
		align-items: center;
		justify-content: flex-start;
	}

	.right,
	.left {
		height: 100%;
		width: var(--ui-overflow-effect-size);
		background: linear-gradient(90deg, var(--ui-overflow-effect-color), transparent);
	}

	.right {
		right: 0;
		flex-direction: row-reverse;
		background: linear-gradient(-90deg, var(--ui-overflow-effect-color), transparent);
	}

	.top,
	.bottom {
		width: 100%;
		height: var(--ui-overflow-effect-size);
		flex-direction: column;
		background: linear-gradient(0deg, var(--ui-overflow-effect-color), transparent);
	}

	.bottom {
		bottom: 0;
		flex-direction: column-reverse;
		background: linear-gradient(180deg, var(--ui-overflow-effect-color), transparent);
	}

	button {
		pointer-events: all;
		position: relative;
		display: flex;
		flex: none;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		height: clamp(2em, 100%, 3em);
		color: col(fg, 000);
		border-radius: 99px;
		opacity: 0;
		background: var(--ui-overflow-effect-color);
		transition: all 0.15s;

		&:hover {
			opacity: 1;
		}
	}
</style>
