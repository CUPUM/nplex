<!--
	@component
	## Loading Progress
	A simple loading indicator singleton styled as a progress bar at the top of the viewport.

 -->
<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened, type Tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	export let n: Tweened<number> = tweened(0, {
		duration: 250,
		easing: cubicOut,
	});

	let timeout: ReturnType<typeof setTimeout> | undefined;

	export function start() {
		if ($n) {
			clearTimeout(timeout);
			n.set(0, { duration: 0 });
		}
		const init = Math.random() * 50;
		n.set(init);
		(function increment() {
			const t = Math.max(Math.random() * 1000, 150);
			timeout = setTimeout(() => {
				n.update((prev) => prev + ((100 - prev) * Math.random()) / 2);
				increment();
			}, t);
		})();
	}

	export function complete() {
		clearTimeout(timeout);
		n.set(100);
		timeout = setTimeout(() => {
			n.set(0, { duration: 0 });
		}, 500);
	}
</script>

{#if $n}
	<div class="track" out:fade={{ duration: 250 }}>
		<div class="progress" style:width="{Math.round($n)}%" />
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
</style>
