<script lang="ts" context="module">
	export interface SwitchContext {
		name: string;
		variant: 'default' | 'secondary' | 'navbar' | 'ghost' | 'cta';
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
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

	let fieldset: HTMLFieldSetElement;
	let observer: ResizeObserver;
	const currentRef: SwitchContext['currentRef'] = writable(null);
	const tempRef: SwitchContext['tempRef'] = writable(null);

	type IndicatorBox = {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	let indicatorBox = '';

	function getElementBox(element: HTMLElement) {
		return `top: ${element.offsetTop}px; right: ${element.offsetLeft + element.offsetWidth}px; bottom: ${
			element.offsetTop + element.offsetHeight
		}px; left: ${element.offsetLeft}px;`;
	}

	function updateIndicatorBox(element: HTMLElement) {
		if (!element) return (indicatorBox = '');
		indicatorBox = getElementBox(element);
	}

	$: if ($tempRef) updateIndicatorBox($tempRef);
	$: if ($currentRef) updateIndicatorBox($currentRef);
	$: if (!$tempRef && !$currentRef) updateIndicatorBox(null);

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		variant,
		currentRef,
		tempRef,
	});

	onMount(() => {
		observer = new ResizeObserver(() => {
			updateIndicatorBox($tempRef || $currentRef || null);
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
			style={indicatorBox}
			class:temp={Boolean($tempRef)}
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

		& > .row {
			flex-direction: row;
		}

		& > .column {
			flex-direction: column;
		}
	}

	.indicator {
		z-index: 1;
		position: absolute;
		border-radius: calc(var(--radius) - var(--inset));
		transition: all 0.15s cubic-bezier(0.8, 0, 0.2, 1.2);

		&.temp {
			// transform: scale(0.95, 0.92);
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
		& .indicator {
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
		// backdrop-filter: blur(18px);
		// box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-500), 0);
		transition: all 0.25s ease-out;
		&:hover,
		&:focus {
			background-color: rgba(var(--rgb-light-100), 1);
			// box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-500), 0.1);
		}
		& .indicator {
			opacity: 0.2;
			background-color: var(--color-primary-100);

			&.temp {
				background-color: var(--color-dark-500);
				opacity: 0.05;
			}
		}
	}

	/* Cta theme */
	.cta {
	}
</style>
