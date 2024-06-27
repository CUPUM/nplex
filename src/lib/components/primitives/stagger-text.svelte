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
	<div
		class="whitespace-pre-wrap [text-decoration:inherit]"
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
			<span class="unit-wrapper" style:--i={i} style:--delay={delay}>
				<span class="unit" class:space={unit.match(/^\s+$/)}>
					{@html unit}
				</span>
			</span>
		{/each}
	</div>
{/key}

<style>
	.unit-wrapper {
		will-change: transform;
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
		display: inline-block;
		animation-name: transform;
		animation-duration: var(--duration);
		animation-timing-function: var(--easing);
		animation-delay: var(--delay);
		animation-fill-mode: both;
		text-decoration: inherit;

		&.space {
			display: inline;
		}
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
