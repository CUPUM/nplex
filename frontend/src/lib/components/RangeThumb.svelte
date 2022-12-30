<!--
	@component
	# Range Thumb
	Range input thumb control.
	
-->
<script lang="ts" context="module">
	export const rangeThumbSpringOptions: Parameters<typeof spring<number>>[1] = {
		stiffness: 0.25,
		damping: 0.75,
	};
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { spring } from 'svelte/motion';
	import { getRangeContext } from './Range.svelte';

	const {
		min: rangeMin,
		max: rangeMax,
		step,
		snap,
		direction,
		pc,
		map,
		disabled: rangeDisabled,
	} = getRangeContext();

	export let value: number;
	export let min: number = $rangeMin;
	export let max: number = $rangeMax;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	const dispatch = createEventDispatcher<'dragstart' | 'dragend' | 'drag'>();
	const relvalue = spring(pc(value), rangeThumbSpringOptions);

	let active = false;
	let thumbRef: HTMLElement;
	let startvalue: number | undefined;
	let startx: number | undefined;
	let starty: number | undefined;
	$: relvalue.set(pc(value));

	function drag(e: PointerEvent) {
		if (!thumbRef || startx === undefined || starty === undefined || startvalue === undefined) {
			return;
		}
		let delta = 0;
		if (direction === 'row') {
			delta = e.pageX - startx;
		} else {
			delta = e.pageY - starty;
		}
		value = snap(Math.max(Math.min(startvalue + map(delta), max), min));
	}

	function dragstart(e: PointerEvent) {
		active = true;
		startvalue = value;
		startx = e.pageX;
		starty = e.pageY;
		if (browser) {
			document.addEventListener('pointerup', dragend, { once: true });
			document.addEventListener('pointermove', drag);
		}
	}

	function dragend(e: PointerEvent) {
		active = false;
		startvalue = undefined;
		startx = undefined;
		starty = undefined;
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
	{min}
	{max}
/>
<button
	bind:this={thumbRef}
	style:--relvalue="{$relvalue}%"
	on:pointerdown={dragstart}
	disabled={$rangeDisabled ?? disabled}
	class:active
>
	{#if $$slots.default}
		<label>
			<slot {value} />
		</label>
	{/if}
</button>

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

		&:disabled {
			pointer-events: none;
		}

		:global(.row .inner) > & {
			left: var(--relvalue);
			transform: translateX(-50%);
		}

		:global(.column .inner) > & {
			top: var(--relvalue);
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
		z-index: 10;
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
