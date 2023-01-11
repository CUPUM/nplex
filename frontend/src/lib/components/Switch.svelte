<!--
	@component
	## Switch
	Generic switch set component used to contextualize a group of Switch Items.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'switch-context';

	type Variant = 'default' | 'outlined' | 'colored';

	interface SwitchContext {
		group: Writable<any>;
		name: string | undefined;
		currentRef: Writable<HTMLElement | null>;
	}

	export function getSwitchContext() {
		return getContext<SwitchContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { writable, type Writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import Ripple from './Ripple.svelte';

	export let name: string | undefined = undefined;
	export let variant: Variant = 'default';
	export let direction: 'column' | 'row' = 'row';
	export let compact: boolean | undefined = undefined;
	export let group: any = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let as: keyof HTMLElementTagNameMap | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let switchRef: HTMLElement;
	let currentRef: Writable<HTMLElement | null> = writable(null);
	let markBox = '';
	let resizeObserver: ResizeObserver;

	const _group = writable(group);
	$: group = $_group;
	$: _group.set(group);

	function getBox(element: HTMLElement | null) {
		if (!element) {
			return '';
		}
		return (
			`top: ${element.offsetTop}px;` +
			`left: ${element.offsetLeft}px;` +
			`width: ${element.offsetWidth}px;` +
			`height: ${element.offsetHeight}px;`
		);
	}

	onMount(() => {
		resizeObserver = new ResizeObserver(() => {
			markBox = getBox($currentRef);
		});
		resizeObserver.observe(switchRef);
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
	});

	$: markBox = getBox($currentRef);

	setContext<SwitchContext>(CTX_KEY, {
		group: _group,
		name,
		currentRef,
	});
</script>

<svelte:element
	this={as ? as : 'fieldset'}
	bind:this={switchRef}
	class="switch {variant} {direction} {className}"
	class:compact
	{style}
	{required}
	{readonly}
	{disabled}
>
	<Ripple color="white" />
	{#if currentRef}
		<div
			transition:scale|local={{ duration: 150, start: 0.9, opacity: 0, easing: cubicInOut }}
			class="mark"
			style={markBox}
		/>
	{/if}
	<slot />
</svelte:element>

<style lang="scss">
	:where(.switch) {
		--switch-inset: var(--ui-inset);
		--switch-radius: var(--ui-radius-md);
		position: relative;
		font-size: inherit;
		border: none;
		display: inline-flex;
		flex-direction: row;
		margin: 0;
		gap: 0;
		flex: none;
		padding: var(--switch-inset);
		border-radius: var(--switch-radius);
		font-weight: 400;
		transition: all 0.15s var(--ui-ease-out);
		&.column {
			flex-direction: column;
		}
	}
	.mark {
		position: absolute;
		border-radius: calc(var(--switch-radius) - var(--switch-inset));
		transition: all 0.15s var(--ui-ease-out);
	}

	// Variants

	:where(.default) {
		color: col(fg, 900);
		background: col(bg, 900, 0.5);
		.mark {
			background: col(fg, 500);
		}
		&:hover {
			background: col(bg, 900, 0.6);
		}
	}

	:where(.outlined) {
		color: col(fg, 900);
		transition: all 0.1s ease-out;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			border: 1px solid col(bg, 900);
			transition: all 0.1s ease-out;
			opacity: 0.5;
		}
		&:hover {
			color: col(fg, 300);
			&::before {
				opacity: 1;
			}
		}
		.mark {
			background: col(fg, 500);
		}
	}

	:where(.colored) {
		color: col(fg, 900);
		transition: all 0.2s var(--ui-ease-out);
		border: 1px solid col(fg, 100, 0.1);
		&:hover {
			color: col(fg, 300);
			border: 1px solid col(primary, 500, 0.2);
		}
		.mark {
			background: col(primary, 100, 0.2);
		}
	}
</style>
