<!--
	@component
	# Popover
	
-->
<script lang="ts" context="module">
	export const POPOVER_OPEN_ATTR = 'data-popover-open' as const;
	const TIME_BUFFER = 25;

	let latest: HTMLElement | null = null;
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { cssSize } from '$utils/css';
	import { tick, type ComponentProps } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import Tether from './Tether.svelte';

	export let hover: boolean = false;
	export let open: boolean = false;
	export let closeOnNav: boolean = true;
	export let bg: boolean = false;
	export let place: ComponentProps<Tether>['place'] = 'bottom';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: NonNullable<ComponentProps<Tether>['distance']> = 5;

	let tether: Tether;
	let contentRef: HTMLElement;
	let timeout: any;

	$: if (open) {
		latest = tether?.anchorRef ?? null;
		tether.anchorRef?.setAttribute(POPOVER_OPEN_ATTR, '');
	} else {
		tether?.anchorRef?.removeAttribute(POPOVER_OPEN_ATTR);
	}

	function handleClick(e: Event) {
		open = !open;
	}

	function handleClickoutside(e: Event) {
		if (e instanceof CustomEvent<Event>) {
			if (e.detail.target instanceof Node && !contentRef?.contains(e.detail.target)) {
				open = false;
			}
		}
	}

	async function handleLeave(e: Event) {
		if (!hover) {
			return;
		}
		timeout = setTimeout(() => {
			open = false;
			timeout = null;
		}, TIME_BUFFER);
	}

	function handleEnter(e: Event) {
		if (!hover) {
			return;
		}
		open = true;
		clearTimeout(timeout);
	}

	afterNavigate(async () => {
		if (closeOnNav) {
			// Awaiting a tick avoids conflict with other navigation-related logic
			// (ex.: button loading state check).
			await tick();
			open = false;
		}
	});
</script>

{#if open && bg}
	<div class="bg" transition:fade|local={{ duration: 350 }} />
{/if}
<Tether
	bind:this={tether}
	{place}
	{align}
	distance="0"
	on:pointerdown={handleClick}
	on:clickoutside={handleClickoutside}
	on:pointerleave={handleLeave}
	on:pointerenter={handleEnter}
>
	<slot name="control" slot="anchor" {open} />
	{#if open}
		<div
			on:pointerleave|self={handleLeave}
			on:pointerenter|self={handleEnter}
			bind:this={contentRef}
			class="popover {align} {place}"
			style:--d={cssSize(distance)}
			in:scale={{ start: 0.9, easing: expoOut, duration: 100, opacity: 0 }}
			out:scale|local={{
				start: 0.8,
				easing: expoIn,
				duration: latest === tether?.anchorRef ? 100 : 0,
				opacity: 0,
			}}
		>
			{#if $$slots.default}
				<div class="inner nest">
					<slot {open} />
				</div>
			{/if}
			<slot name="content" />
		</div>
	{/if}
</Tether>

<style lang="scss">
	.bg {
		pointer-events: none;
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgb(10, 20, 30);
		opacity: 0.1;
	}

	:global([popover-control-open]) {
		z-index: 999 !important;
	}

	.popover {
		display: block;
		flex-shrink: 0;
		width: auto;
		pointer-events: all;
		user-select: initial;
		position: relative;
		padding: 0;
		margin: 0;
		transform-origin: inherit;
		z-index: 1000;
	}

	.inner {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		position: relative;
		background: col(bg, 000);
		display: flex;
		flex-direction: column;
		gap: var(--ui-inset);
		border-radius: var(--radius);
		padding: var(--inset);
		box-shadow: 0 0.5em 3em -2em rgb(0, 20, 40, 0.2);
	}

	.top {
		bottom: 0;
		padding-bottom: var(--d);
	}

	.bottom {
		top: 0;
		padding-top: var(--d);
	}

	.right {
		left: 0;
		padding-left: var(--d);
	}

	.left {
		right: 0;
		padding-right: var(--d);
	}
</style>
