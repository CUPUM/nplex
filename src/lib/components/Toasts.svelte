<script lang="ts" context="module">
	import { createToaster, type AddToastProps } from '@melt-ui/svelte';
	import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
	import { flip } from 'svelte/animate';
	import type { ValueOf } from 'type-fest';
	import Toast from './Toast.svelte';

	export const TOAST_TYPES = {
		SUCCESS: 'success',
		ERROR: 'error',
		NOTIFICATION: 'notification',
		DEFAULT: '',
	};

	export type ToastType = ValueOf<typeof TOAST_TYPES>;

	export type ToastData<C = ComponentType | undefined> = {
		title: string;
		description: string;
		type?: ToastType;
	} & (
		| {
				comp: C;
				props: C extends ComponentType ? ComponentProps<SvelteComponent<C>> : never;
		  }
		| {}
	);

	const {
		elements,
		helpers,
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;

	export const addSuccessToast = function (props: AddToastProps<Omit<ToastData, 'type'>>) {
		return addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.SUCCESS } });
	};

	export const addErrorToast = function (props: AddToastProps<Omit<ToastData, 'type'>>) {
		return addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.ERROR } });
	};

	export const addNotificationToast = function (props: AddToastProps<Omit<ToastData, 'type'>>) {
		return addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.NOTIFICATION } });
	};
</script>

<script>
</script>

<div id="toast-portal" use:portal>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 450 }}>
			<Toast {toast} {elements} />
		</div>
	{/each}
</div>

<style lang="scss">
	#toast-portal {
		// fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: var(--space-md);
		gap: var(--space-xs);
		pointer-events: none;
	}
</style>
