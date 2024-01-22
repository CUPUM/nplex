<script lang="ts" context="module">
	import { page } from '$app/stores';
	import { createToaster, type AddToastProps } from '@melt-ui/svelte';
	import { onMount, type SvelteComponent } from 'svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
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
		return helpers.addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.ERROR } });
	}

	export function addSuccessToast<T extends SvelteComponent>(
		props: AddToastProps<Omit<ToastData, 'type'>>
	) {
		return helpers.addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.SUCCESS } });
	}
</script>

<script lang="ts">
	const flash = getFlash(page);

	onMount(() => {
		const unsub = flash.subscribe((v) => {
			if (v) {
				const { closeDelay, ...data } = v;
				addToast({ closeDelay, data });
				flash.set(undefined);
			}
		});
		return unsub;
	});
</script>

<div id="toast-portal" use:portal>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 200, easing: cubicOut }}>
			<Toast {toast} {elements} />
		</div>
	{/each}
</div>

<style lang="postcss">
	#toast-portal {
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
