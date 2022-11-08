<!--
	@component
	## Switch
	Generic switch set component used to contextualize a group of Switch Items.
	
-->
<script lang="ts" context="module">
	const CTX_KEY = 'switch-context';

	type Variant = 'default' | 'secondary' | 'nav' | 'ghost' | 'cta';

	interface SwitchContext {
		group: Writable<any>;
		name: string | undefined;
		setMark: (label: HTMLLabelElement, clear?: boolean) => void;
		setTempMark: (label: HTMLLabelElement, clear?: boolean) => void;
	}

	export function getSwitchContext() {
		return getContext<SwitchContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { writable, type Writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export let name: string | undefined = undefined;
	export let variant: Variant = 'default';
	export let orientation: 'column' | 'row' = 'row';
	export let group: any = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let as: string | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let switchRef: HTMLElement;
	let mark: HTMLLabelElement | undefined;
	let tempMark: HTMLLabelElement | undefined;
	let markBox = '';
	let resizeObserver: ResizeObserver;

	const _group = writable(group);
	$: group = $_group;
	$: _group.set(group);

	// const [_getVariant, _variant] = writeReadable(variant);
	// $: _variant.set(variant);

	function updateMarkBox() {
		const element = tempMark ?? mark;
		if (!element) {
			markBox = '';
			return;
		}
		markBox =
			`top: ${element.offsetTop}px;` +
			`left: ${element.offsetLeft}px;` +
			`width: ${element.offsetWidth}px;` +
			`height: ${element.offsetHeight}px;`;
	}

	function setMark(label: HTMLLabelElement, clear: boolean = false) {
		if (!clear) {
			mark = label;
			if (tempMark === label) {
				tempMark = undefined;
			}
			return;
		}
		if (clear && mark === label) {
			mark = undefined;
		}
	}

	function setTempMark(label: HTMLLabelElement, clear: boolean = false) {
		if (!clear && mark !== label) {
			tempMark = label;
			return;
		}
		if (clear && tempMark === label) {
			tempMark = undefined;
		}
	}

	onMount(() => {
		resizeObserver = new ResizeObserver(updateMarkBox);
	});

	$: if (mark || tempMark) {
		updateMarkBox();
	}

	$: if (switchRef) {
		resizeObserver?.observe(switchRef);
	}

	setContext<SwitchContext>(CTX_KEY, {
		group: _group,
		name,
		setMark,
		setTempMark,
	});
</script>

<svelte:element
	this={as ? as : name ? 'fieldset' : 'form'}
	bind:this={switchRef}
	class="switch {variant} {orientation} {className}"
	class:temp={tempMark}
	{style}
	{required}
	{readonly}
	{disabled}
>
	{#if mark || tempMark}
		<div
			transition:scale|local={{ duration: 150, start: 0.5, opacity: 0, easing: expoOut }}
			class="mark"
			class:temp={!!tempMark}
			style={markBox}
		/>
	{/if}
	<slot />
</svelte:element>

<style lang="scss">
	.switch {
		--inset: 3px;
		--radius: var(--default-radius);
		--height: var(--default-height);
		--computed-height: calc(var(--height) - 2 * var(--inset, 0px));
		--computed-radius: calc(var(--radius) - var(--inset, 0px));
		position: relative;
		font-size: 1em;
		position: relative;
		border: none;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		gap: min(3px, var(--inset));
		padding: var(--inset);
		border-radius: var(--radius);
		transition: all 0.15s ease-out;
		&.column {
			flex-direction: column;
		}
	}

	.mark {
		position: absolute;
		border-radius: var(--computed-radius);
		transition: all 0.2s cubic-bezier(0.5, 0, 0.2, 1.2);
	}

	.default {
		background: rgba(var(--rgb-base-700), 0.75);
		transition: background-color 0.1s ease-out;
		.mark {
			background: rgb(var(--rgb-contrast-900), 1);
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			background: rgba(var(--rgb-base-900), 0.8);
			.mark {
				background: rgb(var(--rgb-contrast-900), 1);
			}
		}
	}
</style>
