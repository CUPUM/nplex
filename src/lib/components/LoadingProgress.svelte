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
	import { css } from 'styled-system/css';
	import { circOut, cubicOut } from 'svelte/easing';
	import { tweened, type Tweened } from 'svelte/motion';
	import { get } from 'svelte/store';
	import { slide } from 'svelte/transition';

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
	<progress
		{value}
		max={100}
		out:slide={{ axis: 'x', duration: 350, easing: circOut }}
		class={css({
			'all': 'unset',
			'--progress-color': 'colors.primary.500',
			'--progress-size': '3px',
			'--inset': '2px',
			'WebkitAppearance': 'none',
			'position': 'fixed',
			'top': 'var(--inset)',
			'right': 'var(--inset)',
			'width': 'calc(100% - 2 * var(--inset))',
			'height': 'var(--progress-size)',
			'accentColor': 'var(--progress-color)',
			'opacity': '0.75',
			'&::-webkit-progress-bar': {
				borderRadius: 'var(--progress-size)',
				backgroundColor: 'transparent',
			},
			'&::-webkit-progress-value, &::moz-progress-bar': {
				borderRadius: 'var(--progress-size)',
				backgroundColor: 'var(--progress-color)',
			},
		})}
	/>
{/if}
