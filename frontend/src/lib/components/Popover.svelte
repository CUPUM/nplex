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
	import Menu from './Menu/Menu.svelte';
	import Tether from './Tether.svelte';
	import Tip from './Tip.svelte';

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
				<Menu>
					<slot open={opened} />
				</Menu>
				<Tip />
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
		--tip-pad: calc(0.5 * var(--w));
		--tip-size: 1em;
		--d-sum: calc(var(--d) + 0.5 * var(--tip-size));
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

		:global(.ui-tip) {
			font-size: var(--tip-size);
			color: col(bg, 000, 0.85);
		}
	}

	.top {
		bottom: 0;
		padding-bottom: var(--d);
		& :global(.ui-tip) {
			bottom: var(--d);
			left: 50%;
			transform: translate(-50%, 100%);
		}
	}

	.bottom {
		top: 0;
		padding-top: var(--d);
		& :global(.ui-tip) {
			top: var(--d);
			left: 50%;
			transform: translate(-50%, -100%) rotate(180deg);
		}
	}

	.right {
		left: 0;
		padding-left: var(--d);
		& :global(.ui-tip) {
			left: var(--d);
			top: 50%;
			transform: translate(-100%, -50%) rotate(90deg);
		}
	}

	.left {
		right: var(--d);
		padding-right: var(--d);
		& :global(.ui-tip) {
			right: 0;
			top: 50%;
			transform: translate(100%, -50%) rotate(-90deg);
		}
	}

	// Tip

	.top,
	.bottom {
		&.start {
			& :global(.ui-tip) {
				left: var(--tip-pad);
			}
		}
		&.end {
			& :global(.ui-tip) {
				left: calc(100% - var(--tip-pad));
			}
		}
	}

	.left,
	.right {
		&.start {
			& :global(.ui-tip) {
				top: var(--tip-pad);
			}
		}
		&.end {
			& :global(.ui-tip) {
				top: calc(100% - var(--tip-pad));
			}
		}
	}
</style>
