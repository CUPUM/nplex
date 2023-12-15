<script context="module" lang="ts">
	/**
	 * Dialog builder with presets to enforce staying open unless unmounted (i.e.: navigated away
	 * from).
	 *
	 * Uses anchors in lieu of actions for close button and overlay.
	 */
	export function createDialogRoute({
		onOpenChange,
		...options
	}: Omit<CreateDialogProps, 'defaultOpen' | 'open' | 'closeOnOutsideClick'> = {}) {
		return createDialog({
			preventScroll: true,
			...options,
			defaultOpen: true,
			closeOnOutsideClick: false,
			onOpenChange: (e) => {
				onOpenChange && onOpenChange(e);
				return false;
			},
		});
	}
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import type { TransitionFunction } from '$lib/utils/types';
	import { createDialog, melt, type CreateDialogProps, type DialogElements } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { dialogIn, dialogOut, dialogOverlayTransition } from './Dialog.svelte';

	export let portalled: DialogElements['portalled'];
	export let overlay: DialogElements['overlay'];
	export let close: HTMLAnchorAttributes;
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	// export let description: DialogElements['description'];

	let _in: TransitionFunction = dialogIn;
	export { _in as in };

	export let out: TransitionFunction = dialogOut;

	function preventScroll(e: WheelEvent) {
		e.preventDefault();
		e.stopPropagation();
	}
</script>

<div use:melt={$portalled}>
	<!-- svelte-ignore a11y-missing-content -->
	<a
		class="dialog-overlay"
		use:melt={$overlay}
		{...close}
		transition:dialogOverlayTransition
		data-sveltekit-noscroll
		on:wheel={preventScroll}
	/>
	<div class="dialog-wrap">
		<article class="dialog-content" use:melt={$content} in:_in out:out>
			<header>
				<hgroup use:melt={$title}>
					{#if $$slots.header}
						<slot name="header" />
					{/if}
				</hgroup>
				<menu>
					<a
						use:ripple
						class="button danger square rounded ghost"
						{...close}
						data-sveltekit-noscroll
					>
						<X class="button-icon" />
					</a>
				</menu>
			</header>
			<slot>Content</slot>
			{#if $$slots.footer || $$slots.actions}
				<footer>
					<slot name="footer" />
					{#if $$slots.actions}
						<menu>
							<slot name="actions" />
						</menu>
					{/if}
				</footer>
			{/if}
		</article>
	</div>
</div>

<style lang="postcss">
	@import '$styles/scoped/dialog.css';
</style>
