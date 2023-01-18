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
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import Tether from './Tether.svelte';

	export let hover: boolean = false;
	export let opened: boolean = false;
	export let closeOnNav: boolean = true;
	export let bg: boolean = false;
	export let place: ComponentProps<Tether>['place'] = 'bottom';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: NonNullable<ComponentProps<Tether>['distance']> = 5;

	let tether: Tether;
	let contentRef: HTMLElement;
	let timeout: any;

	$: if (opened) {
		latest = tether?.anchorRef ?? null;
		tether.anchorRef?.setAttribute(POPOVER_OPEN_ATTR, '');
	} else {
		tether?.anchorRef?.removeAttribute(POPOVER_OPEN_ATTR);
	}

	function handleClick(e: Event) {
		opened = !opened;
	}

	function handleClickoutside(e: Event) {
		if (e instanceof CustomEvent<Event>) {
			if (e.detail.target instanceof Node && !contentRef?.contains(e.detail.target)) {
				opened = false;
			}
		}
	}

	async function handleLeave(e: Event) {
		if (!hover) {
			return;
		}
		timeout = setTimeout(() => {
			opened = false;
			timeout = null;
		}, TIME_BUFFER);
	}

	function handleEnter(e: Event) {
		if (!hover) {
			return;
		}
		opened = true;
		clearTimeout(timeout);
	}

	afterNavigate(async () => {
		if (closeOnNav) {
			// Awaiting a tick avoids conflict with other navigation-related logic
			// (ex.: button loading state check).
			await tick();
			opened = false;
		}
	});
</script>

{#if opened && bg}
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
	<slot name="control" slot="anchor" open={opened} />
	{#if opened}
		<div
			on:pointerleave|self={handleLeave}
			on:pointerenter|self={handleEnter}
			bind:this={contentRef}
			class="popover {align} {place}"
			style:--d={cssSize(distance)}
			in:scale={{ start: 0.95, easing: cubicOut, duration: 150, opacity: 0 }}
			out:scale|local={{
				start: 0.9,
				easing: cubicIn,
				duration: latest === tether?.anchorRef ? 100 : 0,
				opacity: 0,
			}}
		>
			{#if $$slots.default}
				<div class="inner nest">
					<slot open={opened} />
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
		--outset: 6px;
		// To cleanup once new auto nesting solution found. Current one depends on --radius and --inset for inheritance.
		--pad: calc(var(--outset) + var(--inset));
		color: col(fg, 300);
		position: relative;
		background: col(bg, 000, 0.9);
		backdrop-filter: blur(8px);
		display: flex;
		flex-direction: column;
		gap: var(--ui-inset);
		border-radius: calc(var(--radius) + var(--outset));
		padding: var(--pad);
		box-shadow: 0 0 0 1px col(bg, 500, 0.25), 0 3em 5em -4em rgb(0, 10, 30, 0.25);

		> :global(:where(hr)) {
			margin-inline: calc(-1 * var(--pad));
			margin-block: var(--inset);
		}
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
