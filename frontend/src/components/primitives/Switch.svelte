<script lang="ts" context="module">
	import { cssSize, type SizeInput } from '$utils/css';
	import { Ctx } from '$utils/keys';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export interface SwitchContext {
		name: string;
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
		variant: 'default' | 'secondary' | 'navbar' | 'ghost' | 'cta';
		orientation: 'column' | 'row';
	}
</script>

<script lang="ts">
	export let name: string;
	export let value: any;
	export let size: SizeInput = '1em';
	export let variant: SwitchContext['variant'] = 'default';
	export let orientation: SwitchContext['orientation'] = 'row';

	let fieldset: HTMLFieldSetElement;
	let obs: ResizeObserver;
	/** Corresponds to the label element of the currently selected input. */
	let current: SwitchContext['currentRef'] = writable(null);
	let currentBox: string;
	/** Corresponds to the currently hovered label. */
	let temp: SwitchContext['tempRef'] = writable(null);

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		currentRef: current,
		variant,
		tempRef: temp,
		orientation,
	});

	function getBox(el: HTMLElement) {
		if (el) {
			return `
				top: ${el.offsetTop}px;
				left: ${el.offsetLeft}px;
				width: ${el.offsetWidth}px;`;
		}
		return null;
	}

	$: currentBox = getBox($current);
	$: if ($temp) {
		currentBox = getBox($temp);
	} else {
		currentBox = getBox($current);
	}

	onMount(() => {
		obs = new ResizeObserver(() => {
			currentBox = getBox($current);
		});
		obs.observe(fieldset);
	});

	onDestroy(() => {
		obs?.unobserve(fieldset);
		obs?.disconnect();
	});
</script>

<fieldset
	bind:this={fieldset}
	class="{variant} {orientation}"
	style:font-size={cssSize(size)}
	style:flex-direction={orientation}
>
	{#if currentBox}
		<div
			transition:scale|local={{ duration: 250, start: 0.75, opacity: 0, easing: expoOut }}
			class:temp={Boolean($temp)}
			style={currentBox}
			class="selector"
		/>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		--size: var(--default-size);
		--radius: var(--default-radius);
		--inset: 0px;
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
	}

	.selector {
		z-index: 1;
		position: absolute;
		height: calc(var(--size) - 2 * var(--inset));
		border-radius: calc(var(--radius) - var(--inset));
		transition: all 0.2s cubic-bezier(0.8, 0, 0.2, 1.2);

		&.temp {
			transform: scale(0.95, 0.9);
		}
	}

	/* Variants */

	/* Default theme */
	.default {
		--bg: var(--color-light-300);
		background-color: var(--bg);
		box-shadow: 0 0 0 0 var(--bg);
		&:hover,
		&:focus {
			box-shadow: 0 0 0 3px var(--bg);
		}
		& .selector {
			background-color: var(--color-dark-900);

			&.temp {
				background-color: rgba(var(--rgb-dark-900), 0.1);
			}
		}
	}

	/* Secondary theme */
	.secondary {
	}

	/* Ghost theme */
	.ghost {
	}

	/* Nav theme */
	.navbar {
		background-color: transparent;
		// box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-900), 0);
		// transition: all 0.15s ease-in-out, box-shadow 0.25s ease-in;
		&:hover,
		&:focus {
			background-color: var(--color-light-100);
		}
		& .selector {
			opacity: 0.25;
			background-color: var(--color-primary-100);

			&.temp {
				background-color: var(--color-light-700);
				opacity: 0.5;
			}
		}
	}

	/* Cta theme */
	.cta {
	}
</style>
