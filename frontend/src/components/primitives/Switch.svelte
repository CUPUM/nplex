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
		variant: 'default' | 'secondary' | 'navbar' | 'ghost' | 'cta';
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
		group: Writable<any>;
	}
</script>

<script lang="ts">
	export let name: string;
	export let value: any;
	export let size: SizeInput = '1em';
	export let variant: SwitchContext['variant'] = 'default';
	export let orientation: 'column' | 'row' = 'row';

	let fieldset: HTMLFieldSetElement;
	let obs: ResizeObserver;
	let cursorBox: string;
	const currentRef: SwitchContext['currentRef'] = writable(null);
	const tempRef: SwitchContext['tempRef'] = writable(null);
	const group: SwitchContext['group'] = writable(value);

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		variant,
		currentRef,
		tempRef,
		group,
	});

	function updateBox(el: HTMLElement) {
		if (el) {
			return `
				top: ${el.offsetTop}px;
				left: ${el.offsetLeft}px;
				width: ${el.offsetWidth}px;`;
		}
		return null;
	}

	$: cursorBox = updateBox($tempRef || $currentRef);

	// Doing some manual two-way binding between value prop and context group store...
	$: {
		group.set(value);
	}
	$: {
		value = $group;
	}

	onMount(() => {
		obs = new ResizeObserver(() => {
			cursorBox = updateBox($tempRef || $currentRef);
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
	{#if cursorBox}
		<div
			transition:scale|local={{ duration: 150, start: 0.5, opacity: 0, easing: expoOut }}
			class:temp={Boolean($tempRef)}
			style={cursorBox}
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
		transition: all 0.18s cubic-bezier(0.8, 0, 0.2, 1.2);

		&.temp {
			transform: scale(0.95, 0.92);
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
		backdrop-filter: blur(12px);
		// box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-900), 0);
		transition: background-color 0.5s ease-out;
		&:hover,
		&:focus {
			background-color: var(--color-light-100);
		}
		& .selector {
			opacity: 0.25;
			background-color: var(--color-primary-100);

			&.temp {
				background-color: rgba(var(--rgb-dark-100), 0.2);
				opacity: 0.5;
			}
		}
	}

	/* Cta theme */
	.cta {
	}
</style>
