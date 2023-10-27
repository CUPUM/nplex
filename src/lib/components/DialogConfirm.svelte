<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { createDialog } from '@melt-ui/svelte';
	import type { NavigationTarget } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import Dialog from './Dialog.svelte';
	import { resetProgress } from './LoadingProgress.svelte';

	const { elements, states } = createDialog();

	/**
	 * Storing the interrupted navigation destination.
	 */
	let intercepted: NavigationTarget | null = null;

	/**
	 * Condition used to determine if modal should open and prevent navigation.
	 */
	export let intercept: boolean;

	/**
	 * Confirm the previously interrupted navigation and proceed to the expected destination.
	 */
	export function confirm(opts?: Parameters<typeof goto>[1] | Event) {
		if (intercepted) {
			goto(intercepted.url, opts instanceof Event ? undefined : opts).then(() => {
				intercepted = null;
			});
		}
	}

	$: if (intercepted && !intercept) {
		// We are here because the modal is opened but the interception state changed.
		// This may be encountered following a successful form submission.
		confirm();
	}

	/**
	 * Forget the interrupted navigation and stay on current page.
	 */
	export function cancel() {
		intercepted = null;
	}

	beforeNavigate(async (navigation) => {
		if (!intercept) {
			return;
		}
		if (intercepted) {
			if (navigation.type === 'popstate') {
				if (navigation.delta === -1) {
					// If client is trying to go back, simply cancel the confirm dialog and stay on the page.
					cancel();
				}
			}
			return;
		}
		navigation.cancel();
		intercepted = navigation.to;
		await tick();
		resetProgress();
	});
</script>

<Dialog {...elements} {...states}>
	<svelte:fragment slot="header">CONFIRM PLZ</svelte:fragment>
</Dialog>

<style lang="postcss">
</style>
