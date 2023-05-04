<!--
	@component
	# Popover
	
-->
<svelte:options accessors />

<script lang="ts" context="module">
	export const POPOVER_OPEN_ATTR = 'data-popover-open' as const;
	const INTRO_DISTANCE = 16;

	let latest: {} | null = null;
</script>

<script lang="ts">
	import { navigating } from '$app/stores';
	import flyScale from '$motion/transitions/flyScale';
	import type { ComponentProps } from 'svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import Menu from './Menu/Menu.svelte';
	import Tether from './Tether/Tether.svelte';
	import Tip from './Tip.svelte';

	export let useTip: boolean = false;
	export let background: false | undefined | string = false;
	export let opened: ComponentProps<Tether>['opened'] = false;
	export let useClick: ComponentProps<Tether>['useClick'] = false;
	export let disabled: ComponentProps<Tether>['disabled'] = undefined;
	export let distance: ComponentProps<Tether>['distance'] = '6px';
	export let place: ComponentProps<Tether>['place'] = 'bottom';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let closeOnNav: ComponentProps<Tether>['closeOnNav'] = true;
	export let closeOnClickoutside: ComponentProps<Tether>['closeOnClickoutside'] = true;

	const key = {};
	let timeout: any;

	$: inY = place === 'bottom' ? -INTRO_DISTANCE : place === 'top' ? +INTRO_DISTANCE : 0;
	$: inX = place === 'right' ? -INTRO_DISTANCE : place === 'left' ? +INTRO_DISTANCE : 0;

	function handleOpen() {
		latest = key;
	}

	function handleClose() {
		if (latest === key) {
			latest = null;
		}
	}
</script>

{#if opened && background}
	<div class="bg" style:background transition:fade|local={{ duration: 350 }} />
{/if}
<Tether
	bind:opened
	{place}
	{align}
	{distance}
	{disabled}
	{useClick}
	{closeOnNav}
	{closeOnClickoutside}
	on:open={handleOpen}
	on:close={handleClose}
>
	<svelte:fragment slot="anchor" let:open let:close let:toggle>
		<slot name="control" {opened} {open} {close} {toggle} />
	</svelte:fragment>
	<svelte:fragment slot="content" let:open let:close let:toggle>
		<div
			class="popover {align} {place}"
			in:flyScale={{ scale: 0.94, y: inY, x: inX, easing: expoOut, duration: 200, opacity: 0 }}
			out:scale|local={{
				start: 0.96,
				easing: cubicIn,
				duration: (latest && latest !== key) || $navigating ? 0 : 125,
				opacity: 0,
			}}
		>
			{#if $$slots.default}
				<Menu>
					<slot {opened} {open} {close} />
				</Menu>
				{#if useTip}
					<Tip class="popover-tip" />
				{/if}
			{/if}
			<slot name="content" {opened} {open} {close} {toggle} />
		</div>
	</svelte:fragment>
</Tether>

<style lang="scss">
	.bg {
		--popover-background: black;
		pointer-events: none;
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	.popover {
		--tip-pad: calc(0.5 * var(--tether-w));
		--tip-size: 1em;
		display: block;
		flex-shrink: 0;
		width: auto;
		pointer-events: all;
		user-select: initial;
		position: relative;
		padding: 0;
		margin: 0;
		transform-origin: inherit;
		z-index: 999;

		:global(.popover-tip) {
			position: relative;
			font-size: var(--tip-size);
			color: var(--popover-background);
		}
	}

	.top {
		bottom: 0;
		& :global(.ui-tip) {
			left: 50%;
			transform: translate(-50%, 100%);
		}
	}

	.bottom {
		top: 0;
		& :global(.ui-tip) {
			left: 50%;
			transform: translate(-50%, -100%) rotate(180deg);
		}
	}

	.right {
		left: 0;
		& :global(.ui-tip) {
			top: 50%;
			transform: translate(-100%, -50%) rotate(90deg);
		}
	}

	.left {
		right: 0;
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
