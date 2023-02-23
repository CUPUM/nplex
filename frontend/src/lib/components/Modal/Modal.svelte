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
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';
	import { modalOutletRef } from './ModalOutlet.svelte';

	export let opened = false;
	export let background: string = '';
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
		<div class="bg" style:--background={background} transition:fade|local={{ duration: 150 }} />
		<dialog
			use:clickoutside
			on:clickoutside
			on:clickoutside={() => {
				if (closeOnClickoutside) {
					close();
				}
			}}
			in:scale={{ start: 0.98, duration: 100, easing: cubicOut }}
			out:fly|local={{ y: 8, duration: 100, easing: cubicIn }}
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
		background: var(--background, rgb(24, 26, 30, 0.75));
	}

	dialog {
		--bg: #{col(bg, 300)};
		pointer-events: all;
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--bg);
		max-width: var(--ui-width-sm);
		box-shadow: var(--ui-shadow-lg);
		padding: 0;
		margin: 0 auto;
		overflow-y: auto;
		max-height: 100%;
		border-radius: var(--ui-radius-lg);
	}

	article {
		padding: 2rem;
		flex: 1;
		font-size: var(--ui-text-sm);
		color: col(fg, 500);
	}

	header {
		color: col(fg, 000);
		background: var(--bg);
		position: sticky;
		font-size: var(--ui-text-md);
		font-weight: 500;
		top: 0;
		padding: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid col(fg, 100, 0.1);
	}

	footer {
		display: flex;
		flex-direction: row;
		gap: 3px;
		align-items: center;
		justify-content: flex-end;
		font-size: var(--ui-text-sm);
		background: var(--bg);
		padding: 1rem;
		padding-top: 1rem;
		position: sticky;
		bottom: 0;
		border-top: 1px solid col(fg, 100, 0.1);
	}
</style>
