<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { getRangeContext } from './Range.svelte';

	export let value: number;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	const { min, max, step, direction, pc, px, disabled: rangeDisabled } = getRangeContext();
	const dispatch = createEventDispatcher<'dragstart' | 'dragend' | 'drag'>();

	let active = false;
	let thumbRef: HTMLElement;
	let prevx: number | undefined;
	let prevy: number | undefined;
	$: dist = pc(value);

	function drag(e: PointerEvent) {
		if (!thumbRef || prevx === undefined || prevy === undefined) {
			return;
		}
		let delta = 0;
		if (direction === 'row') {
			delta = e.pageX - prevx;
		} else {
			delta = e.pageY - prevy;
		}
		value = Math.max(Math.min(value + px(delta), $max), $min);
		prevx = e.pageX;
		prevy = e.pageY;
	}

	function dragstart(e: PointerEvent) {
		if ($rangeDisabled || disabled) {
			return;
		}
		active = true;
		prevx = e.pageX;
		prevy = e.pageY;
		if (browser) {
			document.addEventListener('pointerup', dragend, { once: true });
			document.addEventListener('pointermove', drag);
		}
	}

	function dragend(e: PointerEvent) {
		active = false;
		prevx = undefined;
		prevy = undefined;
		document.removeEventListener('pointermove', drag);
	}

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('pointerup', dragend);
			document.removeEventListener('pointermove', drag);
		}
	});
</script>

<input
	type="range"
	hidden
	disabled={$rangeDisabled ?? disabled}
	bind:value
	on:input
	on:change
	on:reset
	{name}
	{id}
	step={$step}
	min={$min}
	max={$max}
/>
<button
	bind:this={thumbRef}
	style:--dist="{dist}%"
	on:pointerdown={dragstart}
	disabled={$rangeDisabled ?? disabled}
	class:active
/>

<style lang="scss">
	button {
		position: absolute;
		cursor: pointer;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 99px;
		background: blue;
		user-select: none;
		outline: none;

		:global(.row .inner) > & {
			left: var(--dist);
			transform: translateX(-50%);
		}

		:global(.column .inner) > & {
			top: var(--dist);
			transform: translateY(-50%);
		}

		&::before {
			content: '';
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 99px;
			background: blue;
			transition: all 0.15s var(--ui-ease-out);
		}
	}

	.active,
	button:focus-visible {
		z-index: 1;
		background: red;

		&::before {
			opacity: 0.5;
			top: -5px;
			left: -5px;
			bottom: -5px;
			right: -5px;
		}
	}
</style>
