<script lang="ts" context="module">
	let latest: HTMLElement | null = null;

	const OPEN_CLASS = 'popover-control-open';
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';

	import { afterNavigate } from '$app/navigation';
	import { cssSize } from '$utils/css';
	import { tick, type ComponentProps } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import Tether from './Tether.svelte';

	export let open: boolean = false;
	export let hover: boolean = false;
	export let closeOnNav: boolean = true;
	export let bg: boolean = false;
	export let place: ComponentProps<Tether>['place'] = 'bottom';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: ComponentProps<Tether>['distance'] = 5;

	let controlRef: HTMLElement;
	let destructors: () => void;
	let timeBuffer = 25;
	let timer: any;

	$: if (open) {
		const cl = ['active'];
		if (bg) {
			cl.push(OPEN_CLASS);
		}
		controlRef?.classList.add(...cl);
	} else {
		controlRef?.classList.remove('active', OPEN_CLASS);
	}

	function show(e?: Event) {
		latest = controlRef;
		clearTimeout(timer);
		open = true;
	}

	function hide(e?: Event) {
		if (!e || !(e.type === 'mouseleave')) {
			open = false;
			return;
		}
		timer = setTimeout(() => {
			open = false;
		}, timeBuffer);
	}

	function setTriggers(ref: HTMLElement) {
		if (destructors) destructors();
		const start = hover ? 'mouseenter' : 'click';
		const end = hover ? 'mouseleave' : null;
		ref.addEventListener(start, show);
		if (end) ref.addEventListener(end, hide);
		destructors = () => {
			ref.removeEventListener(start, show);
			if (end) ref.removeEventListener(end, hide);
		};
	}

	$: if (controlRef) {
		setTriggers(controlRef);
	}

	afterNavigate(async () => {
		if (closeOnNav) {
			// Awaiting a tick avoids conflict with other navigation-related logic (ex.: button loading state check).
			await tick();
			hide();
		}
	});
</script>

{#if open && bg}
	<div class="bg" transition:fade|local={{ duration: 350 }} />
{/if}
<Tether bind:controlRef {place} {align} distance="0">
	<slot name="control" slot="control" {open} />
	{#if open}
		<div
			on:mouseenter={show}
			on:mouseleave={hide}
			use:clickoutside
			on:clickoutside={hide}
			class="popover {align} {place}"
			style:--d={cssSize(distance)}
			in:scale={{ start: 0.9, easing: expoOut, duration: 100, opacity: 0 }}
			out:scale|local={{
				start: 0.8,
				easing: expoIn,
				duration: latest === controlRef ? 100 : 0,
				opacity: 0,
			}}
		>
			{#if $$slots.default}
				<div class="inner">
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

	:global(.popover-control-open) {
		z-index: 999 !important;
	}

	.popover {
		--radius: var(--ui-radius-md);
		display: block;
		flex-shrink: 0;
		width: auto;
		pointer-events: all;
		user-select: initial;
		z-index: 100;
		position: relative;
		padding: 0;
		margin: 0;
		overflow: visible;
		transform-origin: inherit;
		z-index: 1000;
	}

	.inner {
		position: relative;
		background: col(bg, 000);
		box-shadow: 0 1rem 3.5rem -2rem rgba(0, 10, 20, 0.25);
		border-radius: var(--radius);
		display: inline-flex;
		flex-direction: column;
		// border: 1px solid col(bg, 000);
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
