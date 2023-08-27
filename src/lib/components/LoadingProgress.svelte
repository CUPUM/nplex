<!--
	@component
	# Loading Progress
	A simple loading progress indicator positioned absolutely inside its parent.

 -->
<!-- <script lang="ts" context="module">
	const progress: Tweened<number> = tweened(0, {
		duration: 250,
		easing: cubicOut,
	});

	let timeout: ReturnType<typeof setTimeout> | undefined;

	export function startProgress() {
		if (get(progress)) {
			clearTimeout(timeout);
			progress.set(0, { duration: 0 });
		}
		const init = Math.random() * 50;
		progress.set(init);
		(function increment() {
			const t = Math.max(Math.random() * 1000, 150);
			timeout = setTimeout(() => {
				progress.update((prev) => prev + ((100 - prev) * Math.random()) / 2);
				increment();
			}, t);
		})();
	}

	export function completeProgress(value: number = 100) {
		if (!timeout) {
			return;
		}
		clearTimeout(timeout);
		progress.set(value);
		timeout = setTimeout(() => {
			progress.set(0, { duration: 0 });
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
	import { fade } from 'svelte/transition';

	beforeNavigate((navigation) => {
		startProgress();
	});

	afterNavigate((navigation) => {
		completeProgress();
	});
</script>

{#if $progress}
	<div class="track" out:fade={{ duration: 250 }}>
		<div class="progress" style:width="{Math.round($progress)}%" />
	</div>
{/if}

<style lang="scss">
	.track {
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		height: 2px;
		background: var(--background-color);
		z-index: 9000;
	}

	.progress {
		border-radius: 2px;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: var(--color-primary-500);

		&::before {
			position: absolute;
			content: '';
			width: 50px;
			height: 100%;
			right: 0px;
			filter: blur(5px);
			background-image: linear-gradient(to right, transparent, var(--color-primary-700));
		}
	}
</style> -->
