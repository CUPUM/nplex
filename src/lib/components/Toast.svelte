<script lang="ts" context="module">
	export const TOAST_TYPES = {
		SUCCESS: 'success',
		ERROR: 'error',
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
	import { createProgress, melt, type Toast, type ToastsElements } from '@melt-ui/svelte';
	import { Component, X } from 'lucide-svelte';
	import { onMount, SvelteComponent, type ComponentProps, type ComponentType } from 'svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
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
	in:fly|global={{ y: '100%', easing: expoOut, duration: 300 }}
	out:scale|global={{ start: 0.9, duration: 150, easing: cubicOut, opacity: 0 }}
	class="container {data.type ?? TOAST_TYPES.DEFAULT}"
>
	<div use:melt={$progress} class="toast-progress">
		<div
			class="toast-percent"
			style:transform={`translateX(${(100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
		/>
	</div>
	<div class="inner">
		<div>
			<h3 use:melt={$title(id)} class="title">
				{data.title}
				<span class={data.type} />
			</h3>
			<div use:melt={$description(id)} class="description">
				{#if 'component' in data}
					<svelte:component this={data.component} {...data.props} />
				{:else}
					{data.description}
				{/if}
			</div>
		</div>
		<button use:melt={$close(id)} class="button ghost round close compact">
			<X class="button-icon" />
		</button>
	</div>
</div>

<style lang="postcss">
	.container {
		--toast-progress-color: var(--color-primary-500);
		--toast-title-color: var(--color-neutral-900);
		--toast-description-color: var(--color-neutral-600);
		--toast-background-color: var(--color-neutral-50);
		pointer-events: initial;
		font-size: var(--size-sm);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-md);
		transform-origin: center;
		color: var(--toast-description-color);
		background-color: var(--toast-background-color);
		:global(:--dark) & {
			--toast-title-color: var(--color-neutral-100);
			--toast-description-color: var(--color-neutral-400);
			--toast-background-color: var(--color-neutral-800);
		}

		&.error {
			--toast-progress-color: var(--color-error-600);
			--toast-title-color: var(--color-error-700);
			:global(:--dark) & {
				--toast-progress-color: var(--color-error-600);
				--toast-title-color: var(--color-error-400);
			}
		}

		&.success {
			--toast-progress-color: var(--color-success-500);
			--toast-title-color: var(--color-success-600);
			:global(:--dark) & {
				--toast-progress-color: var(--color-success-500);
				--toast-title-color: var(--color-success-400);
			}
		}
	}

	.toast-progress {
		position: absolute;
		top: 0;
		left: var(--radius-sm);
		right: var(--radius-sm);
		height: 3px;
		overflow: hidden;
		border-radius: var(--radius-full);
	}

	.toast-percent {
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: var(--radius-full);
		background-color: var(--toast-progress-color);
	}

	.inner {
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
		color: var(--toast-title-color);
		font-size: var(--size-md);
		font-weight: 450;
	}

	.description {
		margin-top: 1em;
	}

	.close {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		font-size: var(--size-xs);
	}
</style>
