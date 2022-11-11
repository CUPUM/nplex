<!--
	@component
	## Switch
	Generic switch set component used to contextualize a group of Switch Items.
	
-->
<script lang="ts" context="module">
	const CTX_KEY = 'switch-context';

	type Variant = 'default' | 'outlined';

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

	function setMark(label?: HTMLLabelElement) {
		mark = label;
		if (label && tempMark === label) {
			tempMark = undefined;
		}
	}

	function setTempMark(label?: HTMLLabelElement) {
		if (label !== mark) {
			tempMark = label;
			return;
		}
		tempMark = undefined;
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
	this={as ? as : 'fieldset'}
	bind:this={switchRef}
	class="switch nest {variant} {orientation} {className}"
	class:temp={tempMark}
	{style}
	{required}
	{readonly}
	{disabled}
	on:mouseleave={() => setTempMark()}
>
	{#if mark || tempMark}
		<div
			transition:scale|local={{ duration: 150, start: 0.5, opacity: 0, easing: expoOut }}
			class="mark"
			class:temp={tempMark}
			style={markBox}
		/>
	{/if}
	<slot />
</svelte:element>

<style lang="scss">
	:where(.switch) {
		--height: calc(var(--ui-height) - 2 * var(--ui-inset-sum));
		--inset: var(--ui-inset);
		position: relative;
		font-size: 1em;
		position: relative;
		border: none;
		display: inline-flex;
		flex-direction: row;
		margin: 0;
		gap: min(3px, var(--inset));
		flex: none;
		padding: var(--inset);
		border-radius: calc(var(--ui-radius) - var(--ui-inset-sum));
		font-weight: 350;
		transition: all 0.15s ease-out;
		&.column {
			flex-direction: column;
		}
	}
	.mark {
		position: absolute;
		border-radius: calc(var(--ui-radius) - var(--ui-inset-sum) - var(--inset));
		transition: all 0.2s cubic-bezier(0.5, 0, 0.2, 1.2);
	}

	// Variants

	:where(.default) {
		color: col(fg, 300);
		background: col(fg, 900, 0.15);
		transition: all 0.1s ease-out;
		.mark {
			background: col(fg, 100);
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			// background: col(fg, 900, 0.2);
		}
		&.temp {
			.mark {
				background: col(fg, 300);
			}
		}
	}

	:where(.outlined) {
		color: col(fg, 300);
		background: transparent;
		transition: all 0.1s ease-out;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			border: 1px solid currentColor;
			transition: all 0.1s ease-out;
			opacity: 0.25;
		}
		.mark {
			background: col(fg, 500);
		}
		&.temp {
			color: col(fg, 900);
			.mark {
				opacity: 0.5;
				background: transparent;
				border: 1px solid currentColor;
			}
		}
	}
</style>
