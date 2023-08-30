<!--
	@component
	# Loading Progress
	A simple loading progress indicator positioned absolutely inside its parent.
 -->
<script lang="ts" context="module">
	const rootProgress: Tweened<number> = tweened(0, {
		duration: 250,
		easing: cubicOut,
	});

	let timeout: ReturnType<typeof setTimeout> | undefined;

	export function startProgress() {
		if (get(rootProgress)) {
			clearTimeout(timeout);
			rootProgress.set(0, { duration: 0 });
		}
		const init = Math.random() * 50;
		rootProgress.set(init);
		(function increment() {
			const t = Math.max(Math.random() * 1000, 150);
			timeout = setTimeout(() => {
				rootProgress.update((prev) => prev + ((100 - prev) * Math.random()) / 2);
				increment();
			}, t);
		})();
	}

	export function completeProgress(value: number = 100) {
		if (!timeout) {
			return;
		}
		clearTimeout(timeout);
		rootProgress.set(value);
		timeout = setTimeout(() => {
			rootProgress.set(0, { duration: 0 });
			timeout = undefined;
		}, 500);
	}

	export function resetProgress() {
		completeProgress(0);
	}
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { cubicOut } from 'svelte/easing';
	import { tweened, type Tweened } from 'svelte/motion';
	import { get } from 'svelte/store';

	export let indeterminate = false;
	export let progress: number | undefined = undefined;

	$: value = progress != undefined ? progress : $rootProgress;

	beforeNavigate((navigation) => {
		startProgress();
	});

	afterNavigate((navigation) => {
		completeProgress();
	});
</script>

{#if value}
	<progress {value} max={100} />
{/if}

<style lang="scss">
	progress {
		all: unset;
		--color: var(--color-primary-500);
		--br: 2px;
		-webkit-appearance: none;
		position: fixed;
		top: 2px;
		left: 2px;
		right: 2px;
		height: 2px;
		border-radius: var(--br);
		accent-color: var(--color);
		opacity: 0.75;

		@include dark {
			accent-color: var(--color);
		}
	}

	::-webkit-progress-bar {
		border-radius: var(--br);
		background-color: transparent;
	}

	::-webkit-progress-value {
		border-radius: var(--br);
		background-color: var(--color);
	}

	::-moz-progress-bar {
		border-radius: var(--br);
		background-color: var(--color);
	}
</style>
