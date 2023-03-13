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
	import { onDestroy } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';
	import { modalOutletRef } from './ModalOutlet.svelte';

	export let backgroundColor: string = '';
	export let lockScroll: boolean = true;
	export let closeOnClickoutside = true;
	export let opened: boolean = false;

	// const dispatch = createEventDispatcher<{[e in 'open' | 'close']: CustomEvent<{originalEvent: PointerEvent}>}>();

	const key = Symbol('modal');

	$: if (lockScroll === false || !opened) {
		rootScroll.unlock(key);
	} else if (opened) {
		rootScroll.lock(key);
	}

	function close() {
		opened = false;
	}

	onDestroy(() => {
		rootScroll.unlock(key);
	});
</script>

{#if $modalOutletRef && opened}
	<Portal target={$modalOutletRef}>
		<div
			class="bg"
			style:--background={backgroundColor}
			transition:fade|local={{ duration: 150 }}
		/>
		<dialog
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
					<slot name="header" {close} />
				</header>
			{/if}
			<article class="main">
				<slot {close}>Modal content placeholder</slot>
			</article>
			{#if $$slots.footer}
				<footer>
					<slot name="footer" {close} />
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
		color: col(fg, 500);
	}

	header {
		color: col(fg, 000);
		// background: col(fg, 000, 0.05);
		position: sticky;
		font-size: var(--ui-text-lg);
		font-weight: 500;
		top: 0;
		padding: 1.5rem 2rem;
		border-bottom: 1px dashed col(fg, 100, 0.1);
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
