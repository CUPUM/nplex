<!--
	@component
	## Switch
	Generic switch set component used to contextualize a group of switch items.
	
-->
<script lang="ts" context="module">
	const CTX_KEY = 'switch-context';

	interface SwitchContext {
		name: Writable<string>;
		variant: Writable('default' | 'secondary' | 'nav' | 'ghost' | 'cta';
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
		group: Writable<any>;
		setCurrent: (element: HTMLElement, value: any) => void;
		setTemp: (element: HTMLElement) => void;
		clearTemp: (element: HTMLElement) => void;
	}

	export function getSwitchContext() {
		return getContext<SwitchContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let name: string | undefined = undefined;
	export let variant: SwitchContext['variant'] = 'default';
	export let orientation: 'column' | 'row' = 'row';
	export let value: any = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let as: string | undefined = undefined;

	let switchRef: HTMLElement;

	const _value = writable(value);
	$: value = $_value;
	$: _value.set(value);

	setContext<SwitchContext>({});
</script>

<svelte:element
	this={as ? as : name ? 'fieldset' : 'form'}
	bind:this={switchRef}
	class="switch {variant} {orientation}"
	{required}
	{readonly}
	{disabled}
>
	<!-- {#if indicatorBox}
		<div
			transition:scale|local={{ duration: 150, start: 0.5, opacity: 0, easing: expoOut }}
			class="indicator"
			class:temp={!!$tempRef}
			style={indicatorBox}
		/>
	{/if} -->
	<slot />
</svelte:element>

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
			flex: none;
		}
	}

	.indicator {
		// z-index: 1;
		position: absolute;
		border-radius: var(--ctx-computed-radius);
		transition: all 0.2s cubic-bezier(0.5, 0, 0.2, 1.2);
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
		--inset: 1px;
		--radius-ratio: 1.5;
		background-color: white;
		transition: all 0.25s ease-out;

		& .indicator {
			background-color: var(--color-dark-700);

			&.temp {
				background-color: rgba(var(--rgb-primary-500), 0.15);
			}
		}
	}
</style>
