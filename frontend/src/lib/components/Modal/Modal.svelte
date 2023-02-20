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
	import { rootScroll } from '$stores/scroll';
	import { unsafeUid } from '$utils/random';
	import { cubicOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import { modalOutletRef } from './ModalOutlet.svelte';

	export let opened = false;
	export let background: string = 'rgb(10,15,20,.5)';
	export let lockScroll: false | string = false;
	export let closeOnClickoutside = true;

	const key = unsafeUid();

	export function close() {
		opened = false;
	}

	$: if (opened && lockScroll) {
		rootScroll.lock(key);
	} else {
		rootScroll.unlock(key);
	}
</script>

{#if opened && $modalOutletRef}
	<Portal target={$modalOutletRef}>
		<div class="bg" style:background transition:fade|local={{ duration: 150 }} />
		<dialog
			use:clickoutside
			on:clickoutside
			on:clickoutside={() => {
				if (closeOnClickoutside) {
					close();
				}
			}}
			transition:scale={{ start: 0.98, duration: 200, easing: cubicOut }}
		>
			{#if $$slots.header}
				<header>
					<slot name="header" />
				</header>
			{/if}
			<article class="main">
				<slot>Modal content placeholder</slot>
			</article>
			{#if $$slots.footer}
				<footer>
					<slot name="footer" />
				</footer>
			{/if}
		</dialog>
	</Portal>
{/if}

<style lang="scss">
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgb(10, 15, 20, 0.5);
	}

	dialog {
		--pad: 1.5rem;
		--bg: #{col(bg, 100)};
		pointer-events: all;
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--bg);
		max-width: var(--ui-width-sm);
		box-shadow: var(--ui-shadow-lg);
		padding: 0;
		margin: 0 auto;
		overflow-y: scroll;
		max-height: 100%;
		border-radius: var(--ui-radius-lg);
	}

	article {
		padding: var(--pad);
	}

	header {
		background: var(--bg);
		position: sticky;
		top: 0;
		padding: var(--pad);
		padding-bottom: 1rem;
		border-bottom: 1px solid col(fg, 100, 0.1);
	}

	footer {
		background: var(--bg);
		padding: var(--pad);
		padding-top: 1rem;
		position: sticky;
		bottom: 0;
		border-top: 1px solid col(fg, 100, 0.1);
	}
</style>
