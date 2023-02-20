<!--
	@component
	# Modal Confirm Navigation
	
-->
<svelte:options accessors={true} />

<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { resetProgress } from '$routes/ProgressBar.svelte';
	import type { NavigationTarget } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import Modal from './Modal.svelte';

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
	export function confirm(opts?: Parameters<typeof goto>[1]) {
		if (intercepted) {
			goto(intercepted.url, opts).then(() => {
				intercepted = null;
			});
		}
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

<Modal opened={!!intercepted} closeOnClickoutside={false} on:clickoutside={cancel}>
	<code>{!!intercepted}</code>
	<slot {confirm} {cancel} />
</Modal>

<style lang="scss">
</style>
