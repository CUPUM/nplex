<script lang="ts" context="module">
	import { page } from '$app/stores';
	import { createToaster, type AddToastProps } from '@melt-ui/svelte';
	import type { SvelteComponent } from 'svelte';
	import { flip } from 'svelte/animate';
	import { getFlash } from 'sveltekit-flash-message/client';
	import Toast, { TOAST_TYPES, type ToastData } from './Toast.svelte';

	const {
		elements,
		helpers,
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData>();

	export function addToast<T extends SvelteComponent>({
		closeDelay,
		...props
	}: AddToastProps<ToastData<T>>) {
		return helpers.addToast({ closeDelay: closeDelay ?? 5000, ...props });
	}

	export function addErrorToast<T extends SvelteComponent>(
		props: AddToastProps<Omit<ToastData, 'type'>>
	) {
		console.log('dispatching toast!');
		return helpers.addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.ERROR } });
	}

	export function addSuccessToast<T extends SvelteComponent>(
		props: AddToastProps<Omit<ToastData, 'type'>>
	) {
		return helpers.addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.SUCCESS } });
	}

	export function addNotificationToast<T extends SvelteComponent>(
		props: AddToastProps<Omit<ToastData, 'type'>>
	) {
		return helpers.addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.NOTIFICATION } });
	}
</script>

<script lang="ts">
	const flash = getFlash(page);

	$: if ($flash) {
		$flash.forEach((m) => {
			const { closeDelay, ...data } = m;
			addToast({
				closeDelay,
				data,
			});
		});
		flash.set(undefined);
	}
</script>

<div id="toast-portal" use:portal>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 450 }}>
			<Toast {toast} {elements} />
		</div>
	{/each}
</div>

<style lang="postcss">
	#toast-portal {
		perspective: 500px;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 1.25rem;
		gap: 0.75rem;
		pointer-events: none;
		> * {
			pointer-events: initial;
		}
	}

	div {
		transform-style: preserve-3d;
	}
</style>
