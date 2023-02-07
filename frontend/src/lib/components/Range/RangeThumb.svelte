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
	import { KEY } from '$utils/enums';
	import { onDestroy } from 'svelte';
	import { spring } from 'svelte/motion';
	import { scale } from 'svelte/transition';
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
	export let labelPosition: 'top' | 'right' | 'bottom' | 'left' =
		direction === 'row' ? 'top' : 'right';

	const relvalue = spring(pc(value), rangeThumbSpringOptions);

	let thumbRef: HTMLElement;
	let startvalue: number | undefined;
	let startx: number | undefined;
	let starty: number | undefined;
	let focused = false;
	$: relvalue.set(pc(value)), value;

	function handleKey(e: KeyboardEvent) {
		if (!focused) {
			return;
		}
		const jump = e.shiftKey ? ($rangeMax - $rangeMin) / 10 : $step;
		switch (e.key) {
			case KEY.ArrowUp:
			case KEY.ArrowRight:
				value += jump;
				break;
			case KEY.ArrowDown:
			case KEY.ArrowLeft:
				value -= jump;
				break;
		}
	}

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
		startvalue = value;
		startx = e.pageX;
		starty = e.pageY;
		document.addEventListener('pointerup', dragend, { once: true });
		document.addEventListener('pointermove', drag);
	}

	function dragend(e: PointerEvent) {
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

<svelte:window on:keydown={handleKey} />

<input
	type="range"
	hidden
	readonly
	disabled={$rangeDisabled ?? disabled}
	{value}
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
	type="button"
	on:focus={() => {
		focused = true;
	}}
	on:blur={() => {
		focused = false;
	}}
>
	{#if $$slots.default && focused}
		<label class={labelPosition} transition:scale|local={{ duration: 200, start: 0.95 }}>
			<slot {value} />
		</label>
	{/if}
</button>

<style lang="scss">
	button {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 50%;
		user-select: none;
		outline: none;
		transition: box-shadow 0.25s var(--ui-ease-out), background 0.25s var(--ui-ease-out);

		&:disabled {
			pointer-events: none;
		}

		&:active,
		&:focus-visible {
			z-index: 10;
		}

		:global(.row .inner) > & {
			left: var(--relvalue);
			transform: translateX(-50%);

			label {
			}
		}

		:global(.column .inner) > & {
			top: var(--relvalue);
			transform: translateY(-50%);

			label {
			}
		}
	}

	label {
		--gap: 5px;
		position: absolute;
		width: max-content;

		&.top {
			transform-origin: bottom center;
			bottom: 100%;
			margin-bottom: var(--gap);
		}
	}

	// Variants

	:global(.default .inner) {
		> button {
			background: col(fg, 300);
			box-shadow: 0 0 0 0 col(primary, 500, 0);
			&:active,
			&:focus {
				background: col(primary, 700);
				box-shadow: 0 0 0 var(--outline-width) col(primary, 300, 0.5);
			}
			&:hover {
				background: col(primary, 500);
			}
		}
		&:focus-within {
			button:not(:focus) {
				background: col(primary, 900);
			}
		}
	}

	:global(.cta .inner) > {
		button {
			background: col(primary, 700, 1);
			box-shadow: 0 0 0 0 col(primary, 500, 0);
			&:active,
			&:focus-visible {
				z-index: 10;
				background: col(fg, 300);
				box-shadow: 0 0 0 var(--outline-width) col(primary, 300, 0.5);
			}
		}
	}
</style>
