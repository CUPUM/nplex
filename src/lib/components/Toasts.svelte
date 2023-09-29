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
	} as const;

	export type ToastType = ValueOf<typeof TOAST_TYPES>;

	export type ToastData<T extends ComponentType | undefined> = {
		title: string;
		description: string;
		type?: ToastType;
	} & (
		| {
				comp: T extends ComponentType ? SvelteComponent<T> : undefined;
				props: T extends ComponentType ? ComponentProps<SvelteComponent<T>> : never;
		  }
		| {
				body: string;
		  }
	);

	const {
		elements,
		helpers,
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData<ComponentType | undefined>>();

	function addToast<T extends ComponentType | undefined>(props: AddToastProps<ToastData<T>>) {
		return helpers.addToast(props);
	}

	// export const addSuccessToast = function (props: AddToastProps<Omit<ToastData, 'type'>>) {
	// 	return addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.SUCCESS } });
	// };

	export function addErrorToast<T extends ComponentType | never>(
		props: AddToastProps<Omit<ToastData<T>, 'type'>>
	) {
		return addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.ERROR } });
	}

	// export const addNotificationToast = function (props: AddToastProps<Omit<ToastData, 'type'>>) {
	// 	return addToast({ ...props, data: { ...props.data, type: TOAST_TYPES.NOTIFICATION } });
	// };
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
		padding: 1.25rem;
		gap: 0.75rem;
		pointer-events: none;
	}
</style>
