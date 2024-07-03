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

	let units = $derived(text.split(separator));
</script>

<div
	class="contents [text-decoration:inherit]"
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
	{#key units}
		{#each units as unit, i}
			<span
				class="clip-anim will-change-transform [text-decoration:inherit] data-[breaking-space=true]:whitespace-pre-wrap"
				style:--i={i}
				style:--delay={delay}
				data-breaking-space={unit.match(' ') ? true : undefined}
			>
				<span class="transform-anim inline-block will-change-transform [text-decoration:inherit]">
					{@html unit}
				</span>
			</span>
		{/each}
	{/key}
</div>

<style>
	[data-clipped='true'] .clip-anim {
		animation-name: clip;
		animation-duration: var(--duration);
		animation-timing-function: var(--easing);
		animation-delay: var(--delay);
		animation-fill-mode: both;
	}

	.transform-anim {
		animation-name: transform;
		animation-duration: var(--duration);
		animation-timing-function: var(--easing);
		animation-delay: var(--delay);
		animation-fill-mode: both;
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
