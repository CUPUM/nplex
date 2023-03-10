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
	export function confirm(opts?: Parameters<typeof goto>[1] | Event) {
		if (intercepted) {
			goto(intercepted.url, opts instanceof Event ? undefined : opts).then(() => {
				intercepted = null;
			});
		}
	}

	$: if (intercepted && !intercept) {
		// We are here because the modal is opened but the interception state changed. This may be due to a form being successfully submitted.
		// console.log('Should close and confirm');
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

{#if !!intercepted}
	<Modal closeOnClickoutside={false} on:clickoutside={cancel}>
		<svelte:fragment slot="header">Sauvegarder&thinsp;?</svelte:fragment>
		<slot {confirm} {cancel} />
		<svelte:fragment slot="footer">
			<slot name="footer" />
		</svelte:fragment>
	</Modal>
{/if}

<style lang="scss">
	div {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 3px;
	}
</style>
