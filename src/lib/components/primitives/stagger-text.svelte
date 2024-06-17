<script lang="ts">
	import { ms } from '$lib/common/css';

	let {
		text = '',
		separator = /(\s)/,
		easing = 'var(--transition-timing-function-out)',
		duration = 'var(--transition-duration-xslow)',
		delay = 'calc(var(--i) * 25ms)',
		opacity = 0,
		transform = '',
		translate = '0',
		rotate = '0deg',
		scale = 1,
		clipPath,
	}: {
		text: string;
		separator?: string | RegExp;
		easing?: string;
		duration?: number | string;
		delay?: number | string;
		// cursorEasing?: string;
		opacity?: number | string;
		transform?: string;
		translate?: string;
		rotate?: string;
		scale?: number | string;
		clipPath?: string | { start: string; end: string };
	} = $props();

	let split = $derived(text.split(separator));
</script>

{#key split}
	<span
		class="stagger-text"
		data-clipped={clipPath ? true : undefined}
		style:--duration={ms(duration)}
		style:--easing={easing}
		style:--clip-path-start={typeof clipPath === 'string' ? clipPath : clipPath?.start}
		style:--clip-path-end={typeof clipPath === 'string' ? clipPath : clipPath?.end}
		style:--opacity={opacity}
		style:--transform={transform}
		style:--translate={translate}
		style:--rotate={rotate}
		style:--scale={scale}
	>
		{#each split as unit, i}
			<span
				class="unit-wrapper inline-block whitespace-pre will-change-transform"
				style:--i={i}
				style:--delay={delay}
			>
				<span class="unit inline-block whitespace-pre">
					{@html unit}
				</span>
			</span>
		{/each}
	</span>
{/key}

<style>
	.stagger-text {
		text-decoration: inherit;
	}
	.unit-wrapper {
		text-decoration: inherit;
	}
	[data-clipped='true'] > .unit-wrapper {
		animation-name: clip;
		animation-duration: var(--duration);
		animation-timing-function: var(--easing);
		animation-delay: var(--delay);
		animation-fill-mode: both;
	}

	.unit {
		animation-name: transform;
		animation-duration: var(--duration);
		animation-timing-function: var(--easing);
		animation-delay: var(--delay);
		animation-fill-mode: both;
		text-decoration: inherit;
	}

	@keyframes clip {
		from {
			clip-path: var(--clip-path-start);
		}
		to {
			clip-path: var(--clip-path-end);
		}
	}

	@keyframes transform {
		from {
			opacity: var(--opacity);
			translate: var(--translate);
			rotate: var(--rotate, 0);
			scale: var(--scale);
		}
	}
</style>
