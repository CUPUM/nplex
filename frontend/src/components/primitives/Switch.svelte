<script lang="ts" context="module">
	export interface SwitchContext {
		name: string;
		variant: 'default' | 'secondary' | 'navbar' | 'ghost' | 'cta';
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
		group: Writable<any>;
		setCurrent: (element: HTMLElement, value: any) => void;
		setTemp: (element: HTMLElement) => void;
		clearTemp: (element: HTMLElement) => void;
	}
</script>

<script lang="ts">
	import { cssSize, type SizeInput } from '$utils/css';
	import { Ctx } from '$utils/keys';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export let name: string = undefined;
	export let size: SizeInput = '1em';
	export let variant: SwitchContext['variant'] = 'default';
	export let orientation: 'column' | 'row' = 'row';
	export let value: any = undefined;

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
		// console.log('Setting current', element);
	}

	function setTemp(element: HTMLElement) {
		$tempRef = element;
		indicatorBox = getElementBox($tempRef);
		// console.log('Setting temp', element);
	}

	function clearTemp(element: HTMLElement) {
		if ($tempRef === element) {
			$tempRef = null;
		}
		indicatorBox = getElementBox($currentRef);
		// console.log('Clearing temp', element);
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

<fieldset bind:this={fieldset} class="{variant} {orientation}" style:font-size={cssSize(size)}>
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
		--size: var(--default-size);
		--radius: var(--default-radius);
		--inset: 3px;
		position: relative;
		border: none;
		display: inline-flex;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		padding: var(--inset);
		border-radius: var(--radius);
		overflow: visible;
		transition: all 0.1s ease-out;
		&.row {
			flex-direction: row;
		}
		&.column {
			flex-direction: column;
		}
	}

	.indicator {
		flex: none;
		z-index: 1;
		position: absolute;
		border-radius: calc(var(--radius) - var(--inset));
		transition: all 0.15s cubic-bezier(0.5, 0, 0.2, 1.2);
		// &.temp {
		// 	transform: scale(0.95, 0.92);
		// }
	}

	/* Variants */

	/* Default theme */
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

	/* Nav theme */
	.navbar {
		--inset: 0px;
		background-color: rgba(255, 255, 255, 0.1);
		transition: all 0.25s ease-out;
		&:hover,
		&:focus {
			background-color: rgba(255, 255, 255, 0.2);
		}
		& .indicator {
			opacity: 0.2;
			box-shadow: 0 0 0 1px var(--color-primary-300);
			background-color: var(--color-primary-100);
			&.temp {
				// box-shadow: 0 0 0 0 var(--color-primary-300);
				// background-color: var(--color-primary-100);
				opacity: 0.1;
			}
		}
	}
</style>
