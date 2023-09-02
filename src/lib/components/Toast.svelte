<script lang="ts">
	import { createProgress, melt, type Toast, type ToastsElements } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { TOAST_TYPES, type ToastData } from './Toasts.svelte';

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

		return () => cancelAnimationFrame(frame);
	});
</script>

<div
	use:melt={$content(id)}
	in:fly={{ duration: 150, x: '100%' }}
	out:fly={{ duration: 150, x: '100%' }}
	class="container {data.type ?? TOAST_TYPES.DEFAULT}"
>
	<div use:melt={$progress} class="progress">
		<div
			class="percent"
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
				{#if 'comp' in data}
					<svelte:component this={data.comp} {...data.props} />
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

<style lang="scss">
	.container {
		// rounded-lg bg-neutral-700 text-white shadow-md
		pointer-events: initial;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-900);
		background-color: var(--color-neutral-50);
		box-shadow: var(--shadow-lg);

		@include dark {
			color: var(--color-neutral-100);
			background-color: var(--color-neutral-800);
		}
	}

	.progress {
		// absolute left-5 top-2 h-1 w-[10%] overflow-hidden rounded-full bg-black/40
	}

	.percent {
		// h-full w-full bg-magnum-500
	}

	.inner {
		// relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5
		position: relative;
		display: flex;
		width: 24rem;
		max-width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		padding: var(--space-md);
	}

	.title {
		// flex items-center gap-2 font-semibold
	}

	.close {
		// absolute right-4 top-4 grid place-items-center rounded-full text-magnum-500 square-6 hover:bg-magnum-900/50
	}
</style>
