<script lang="ts" context="module">
	export interface SwitchContext {
		name: string;
		variant: 'default' | 'secondary' | 'nav' | 'ghost' | 'cta';
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
		group: Writable<any>;
		setCurrent: (element: HTMLElement, value: any) => void;
		setTemp: (element: HTMLElement) => void;
		clearTemp: (element: HTMLElement) => void;
	}
</script>

<script lang="ts">
	import { cssSize } from '$utils/css';
	import { Ctx } from '$utils/values/keys';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export let name: string = undefined;
	export let size: string | number = '1em';
	export let variant: SwitchContext['variant'] = 'default';
	export let orientation: 'column' | 'row' = 'row';
	export let value: any = undefined;
	export let display: 'inline' | 'block' = 'block';

	const currentRef: SwitchContext['currentRef'] = writable(null);
	const tempRef: SwitchContext['tempRef'] = writable(null);
	let fieldset: HTMLFieldSetElement;
	let observer: ResizeObserver;
	let indicatorBox = '';

	/**
	 * Group should only be used to let context aware of value.
	 */
	const group: Writable<typeof value> = writable(value);
	$: $group = value;
	$: if ($group === null || $group === undefined) {
		setCurrent($group, $group);
	}

	function getElementBox(element: HTMLElement) {
		if (!element) return '';
		return (
			`top: ${element.offsetTop}px;` +
			`left: ${element.offsetLeft}px;` +
			`width: ${element.offsetWidth}px;` +
			`height: ${element.offsetHeight}px;`
		);
	}

	function setCurrent(element: HTMLElement, itemValue: any) {
		$currentRef = element;
		indicatorBox = getElementBox($currentRef);
		value = itemValue;
	}

	function setTemp(element: HTMLElement) {
		$tempRef = element;
		indicatorBox = getElementBox($tempRef);
	}

	function clearTemp(element: HTMLElement) {
		if ($tempRef === element) {
			$tempRef = null;
		}
		indicatorBox = getElementBox($currentRef);
	}

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		variant,
		currentRef,
		tempRef,
		group,
		setCurrent,
		setTemp,
		clearTemp,
	});

	onMount(() => {
		observer = new ResizeObserver(() => {
			indicatorBox = getElementBox($tempRef || $currentRef || null);
		});
		observer.observe(fieldset);
	});

	onDestroy(() => {
		observer?.unobserve(fieldset);
		observer?.disconnect();
	});
</script>

<fieldset bind:this={fieldset} class="{variant} {orientation}" style:--size={cssSize(size)}>
	{#if indicatorBox}
		<div
			transition:scale|local={{ duration: 150, start: 0.5, opacity: 0, easing: expoOut }}
			class="indicator"
			class:temp={!!$tempRef}
			style={indicatorBox}
		/>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		--inset: 3px;
		--radius-ratio: 1;
		--height-ratio: 3;
		--computed-height: calc(var(--size) * var(--height-ratio));
		--computed-radius: calc(var(--size) * var(--radius-ratio));
		--ctx-computed-height: calc((var(--height-ratio) * var(--size)) - (2 * var(--inset, 0px)));
		--ctx-computed-size: calc(var(--ctx-computed-height) / var(--height-ratio));
		--ctx-computed-radius: calc(var(--radius-ratio) * var(--ctx-computed-size));
		font-size: var(--computed-size);
		position: relative;
		border: none;
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		padding: var(--inset);
		border-radius: var(--computed-radius);
		overflow: visible;
		transition: all 0.1s ease-out;

		&.row {
			flex-direction: row;
		}

		&.column {
			flex-direction: column;
		}

		&.inline {
			display: inline-flex;
		}
	}

	.indicator {
		z-index: 1;
		position: absolute;
		border-radius: var(--ctx-computed-radius);
		transition: all 0.15s cubic-bezier(0.5, 0, 0.2, 1.2);
	}

	//
	// Variants
	//

	.default {
		background-color: var(--color-light-500);

		&:hover,
		&:focus {
			background-color: var(--color-light-300);
		}

		& .indicator {
			background-color: var(--color-dark-900);

			&.temp {
				background-color: rgba(var(--rgb-dark-900), 0.1);
			}
		}
	}

	.nav {
		--inset: 3px;
		--radius-ratio: 1.5;
		background-color: rgba(255, 255, 255, 1);
		transition: all 0.25s ease-out;

		&:hover,
		&:focus {
			// background-color: rgba(255, 255, 255, 0.2);
		}

		& .indicator {
			opacity: 0.2;
			box-shadow: 0 0 0 1px var(--color-primary-300);
			background-color: var(--color-primary-100);

			&.temp {
				opacity: 0.1;
			}
		}
	}
</style>
