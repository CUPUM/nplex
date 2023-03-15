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
	import { closest, type ClosestReadable } from '$utils/store';
	import type { ThemeName } from '$utils/themes';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';
	import { modalOutletRef } from './ModalOutlet.svelte';

	export let backgroundColor: string = '';
	export let lockScroll: boolean = true;
	export let closeOnClickoutside = true;
	export let opened: boolean = false;
	export let theme: ThemeName | undefined = undefined;

	const key = Symbol('modal');

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

	function close() {
		opened = false;
	}

	function cancel() {
		canceled = true;
		confirmed = false;
		close();
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
		opened = true;
	}

	onMount(() => {
		if (opened) openedOnce = true;
		closestTheme = closest(probeRef, 'data-theme');
	});

	onDestroy(() => {
		rootScroll.unlock(key);
	});
</script>

<slot name="control" {requestConfirmation} />
<div class="modal-probe" hidden bind:this={probeRef} />
{#if $modalOutletRef && opened}
	<Portal target={$modalOutletRef}>
		<div
			class="bg"
			style:--background={backgroundColor}
			transition:fade|local={{ duration: 150 }}
		/>
		<dialog
			data-theme={theme ?? $closestTheme}
			use:clickoutside
			on:clickoutside
			on:clickoutside={() => {
				if (closeOnClickoutside) {
					opened = false;
				}
			}}
			in:scale={{ start: 0.98, duration: 100, easing: cubicOut }}
			out:fly|local={{ y: 8, duration: 100, easing: cubicIn }}
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
		background: var(--background, rgb(24, 26, 30, 0.75));
	}

	dialog {
		pointer-events: all;
		position: relative;
		flex: none;
		display: flex;
		flex-direction: column;
		background: col(bg, 300);
		color: col(fg, 100);
		max-width: var(--ui-width-sm);
		box-shadow: var(--ui-shadow-lg);
		padding: 0;
		margin: 0 auto;
		overflow-y: auto;
		max-height: 100%;
		border-radius: var(--ui-radius-lg);
	}

	article {
		padding: 1.5rem 2rem;
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
		background: col(bg, 300);
		padding: 1.5rem;
		position: sticky;
		bottom: 0;
		border-top: 1px dashed col(fg, 100, 0.1);
		// background: col(bg, 100);
	}
</style>
