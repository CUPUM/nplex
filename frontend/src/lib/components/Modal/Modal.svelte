<!--
	@component
	# Modal
	Overlays a modal in a blocking or non-blocking manner.
	Useful to require critical action form the user.
-->
<svelte:options accessors={true} />

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import Portal from '$components/Portal.svelte';
	import { rootScroll } from '$stores/rootScroll';
	import type { AppCustomEvent } from '$types/utils';
	import { col } from '$utils/css';
	import { closest, type ClosestReadable } from '$utils/store';
	import type { ThemeName } from '$utils/themes';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import { crossfade, fade, fly, scale } from 'svelte/transition';
	import { modalOutletRef } from './ModalOutlet.svelte';

	export let backgroundColor: string = col('bg', '100', 0.9);
	export let lockScroll: boolean = true;
	export let closeOnClickoutside = true;
	export let opened: boolean = false;
	export let theme: ThemeName | undefined = undefined;

	const key = Symbol('modal');

	const [send, receive] = crossfade({
		duration(d) {
			return 25 + Math.sqrt(d * 25);
		},
		fallback(node, params, intro) {
			return scale(node, { start: 0.98, duration: 100, easing: expoOut });
		},
		easing: expoOut,
	});

	let bgRef: HTMLElement;
	let openedOnce = false;
	let confirmed = false;
	let canceled = false;
	let probeRef: HTMLElement;
	let closestTheme: ClosestReadable<'data-theme'>;

	const dispatch = createEventDispatcher<{
		[e in 'open' | 'close']: {
			confirmed: boolean;
			canceled: boolean;
		};
	}>();

	$: if (lockScroll === false || !opened) {
		rootScroll.unlock(key);
		if (openedOnce) {
			dispatch('close', { canceled, confirmed });
		}
		confirmed = false;
		canceled = false;
	} else if (opened) {
		openedOnce = true;
		rootScroll.lock(key);
		dispatch('open', { canceled, confirmed });
		confirmed = false;
		canceled = false;
	}

	function open(e?: Event) {
		const el = e?.currentTarget ?? e?.target;
		if (el instanceof Element) {
			send(el, { key });
		}
		opened = true;
	}

	function close() {
		opened = false;
	}

	function cancel() {
		canceled = true;
		confirmed = false;
		close();
	}

	function handleClickoutside(e: AppCustomEvent<'on:clickoutside'>) {
		console.log(e);
		if (closeOnClickoutside && e.detail.originalEvent.target === bgRef) {
			opened = false;
		} else if (e.detail.originalEvent.target !== bgRef) {
			e.stopImmediatePropagation();
		}
	}

	/**
	 * Calls the callback, if any, and closes the modal.
	 */
	async function confirm() {
		canceled = false;
		confirmed = true;
		close();
	}

	/**
	 * Define a callback that requires confirmation before being completed. Users confirm or abort the
	 * callback.
	 */
	function requestConfirmation(e?: Event) {
		if (e) {
			e.preventDefault();
		}
		open();
	}

	onMount(() => {
		if (opened) openedOnce = true;
		closestTheme = closest(probeRef, 'data-theme');
	});

	onDestroy(() => {
		rootScroll.unlock(key);
	});
</script>

<slot name="control" {requestConfirmation} {open} />
<div class="modal-probe" hidden bind:this={probeRef} />
{#if $modalOutletRef && opened}
	<Portal target={$modalOutletRef}>
		<div
			bind:this={bgRef}
			data-theme={theme ?? $closestTheme}
			class="bg"
			style:--modal-background={backgroundColor}
			transition:fade|local={{ duration: 100 }}
		/>
		<dialog
			data-theme={theme ?? $closestTheme}
			use:clickoutside
			on:clickoutside={handleClickoutside}
			on:clickoutside
			in:receive={{ key }}
			out:fly|local={{ y: 8, duration: 80, easing: cubicIn }}
		>
			{#if $$slots.header}
				<header>
					<slot name="header" {close} {cancel} {confirm} />
				</header>
			{/if}
			<article class="main">
				<slot {close} {cancel} {confirm}>Modal content placeholder</slot>
			</article>
			{#if $$slots.footer}
				<footer>
					<slot name="footer" {close} {cancel} {confirm} />
				</footer>
			{/if}
		</dialog>
	</Portal>
{/if}

<style lang="scss">
	.bg {
		pointer-events: all;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: var(--modal-background);
	}

	dialog {
		pointer-events: all;
		position: absolute;
		flex: none;
		display: flex;
		flex-direction: column;
		background: col(bg, 500);
		color: col(fg, 100);
		max-width: min(var(--ui-width-sm), 100%);
		box-shadow: 0 1em 2em -1em rgb(0, 0, 0, 0.5);
		padding: 0;
		margin: 0 auto;
		overflow-y: auto;
		max-height: 100%;
		transform-origin: bottom;
		// border: 1px solid col(bg, 900);
		border-radius: var(--ui-radius-lg);
	}

	article {
		--modal-padding: 2rem;
		position: relative;
		padding: var(--modal-padding);
		flex: 1;
	}

	header {
		// background: col(fg, 000, 0.05);
		position: sticky;
		top: 0;
		padding: 1.5rem 2rem;
		border-bottom: 1px dashed col(fg, 100, 0.1);
		@include typography(heading, xs);
	}

	footer {
		display: flex;
		flex-direction: row;
		gap: 3px;
		align-items: center;
		justify-content: flex-end;
		font-size: var(--ui-text-sm);
		background: col(bg, 500);
		padding: 1.5rem;
		position: sticky;
		bottom: 0;
		border-top: 1px dashed col(fg, 100, 0.1);
		// background: col(bg, 100);
	}
</style>
