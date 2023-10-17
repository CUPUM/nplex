<script lang="ts" context="module">
	export const TOAST_TYPES = {
		SUCCESS: 'success',
		ERROR: 'error',
		NOTIFICATION: 'notification',
		DEFAULT: '',
	} as const;

	export type ToastType = ValueOf<typeof TOAST_TYPES>;

	export type ToastData<T extends Component = SvelteComponent> = {
		title: string;
		description: string;
		type?: ToastType;
		component?: ComponentType<T>;
		props?: ComponentProps<T & object>;
	};
</script>

<script lang="ts">
	import { transform } from '$lib/transitions/transform';
	import { createProgress, melt, type Toast, type ToastsElements } from '@melt-ui/svelte';
	import { Component, X } from 'lucide-svelte';
	import { onMount, SvelteComponent, type ComponentProps, type ComponentType } from 'svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import type { ValueOf } from 'type-fest';

	export let elements: ToastsElements;
	$: ({ content, title, description, close } = elements);

	export let toast: Toast<ToastData>;
	$: ({ data, id, getPercentage } = toast);

	const percentage = writable(0);
	const {
		elements: { root: progress },
		options: { max },
	} = createProgress({
		max: 100,
		value: percentage,
	});

	onMount(() => {
		let frame: number;
		const updatePercentage = () => {
			percentage.set(getPercentage());
			frame = requestAnimationFrame(updatePercentage);
		};
		frame = requestAnimationFrame(updatePercentage);

		return function onUnmount() {
			cancelAnimationFrame(frame);
		};
	});
</script>

<div
	use:melt={$content(id)}
	in:transform|global={{ rotate: [90, 0, 0], easing: cubicOut, duration: 350 }}
	out:scale|global={{ start: 0.9, duration: 150, easing: expoOut, opacity: 0 }}
	class="container {data.type ?? TOAST_TYPES.DEFAULT}"
>
	<div use:melt={$progress} class="toast-progress">
		<div
			class="toast-percent"
			style:transform={`translateX(-${100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
		/>
	</div>
	<div class="inner">
		<div>
			<h3 use:melt={$title(id)} class="title">
				{data.title}
				<span class={data.type} />
			</h3>
			<div use:melt={$description(id)}>
				{#if 'component' in data}
					<svelte:component this={data.component} {...data.props} />
				{:else}
					{data.description}
				{/if}
			</div>
		</div>
		<button use:melt={$close(id)} class="close">
			<X />
		</button>
	</div>
</div>

<style lang="postcss">
	.container {
		/* rounded-lg bg-neutral-700 text-white shadow-md */
		pointer-events: initial;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-700);
		background-color: var(--color-neutral-50);
		box-shadow: var(--shadow-md), var(--shadow-2xl);
		transform-origin: bottom center;

		:global(:--dark) & {
			color: var(--color-neutral-300);
			background-color: var(--color-neutral-800);
		}
	}

	.toast-progress {
		/* absolute left-5 top-2 h-1 w-[10%] overflow-hidden rounded-full bg-black/40 */
		position: absolute;
		inset: var(--base-inset);
		bottom: unset;
		height: 3px;
		overflow: hidden;
		border-radius: var(--radius-full);
	}

	.toast-percent {
		/* h-full w-full bg-magnum-500 */
		heigth: 100%;
		width: 100%;
		background-color: var(--color-primary-500);
	}

	.inner {
		/* relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5 */
		position: relative;
		display: flex;
		width: 24rem;
		max-width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.25rem;
	}

	.title {
		/* flex items-center gap-2 font-semibold */
	}

	.close {
		/* absolute right-4 top-4 grid place-items-center rounded-full text-magnum-500 square-6 hover:bg-magnum-900/50 */
	}
</style>
