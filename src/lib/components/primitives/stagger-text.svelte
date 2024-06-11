<script lang="ts">
	import { ms } from '$lib/common/css';

	let {
		text,
		separator = /(\s)/,
		easing = 'var(--transition-timing-function-out)',
		duration = 'var(--transition-duration-xslow)',
		delay = 'calc(var(--i) * 25ms)',
		opacity = 0,
		transform = '',
		translate = '0',
		rotate = '0deg',
		scale = 1,
		maskPadding,
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
		maskPadding?: string | { start: string; end: string };
	} = $props();

	let split = $derived(text.split(separator));
</script>

{#key split}
	<span
		data-masked={maskPadding ? true : undefined}
		style:--duration={ms(duration)}
		style:--easing={easing}
		style:--mask-padding-start={typeof maskPadding === 'string' ? maskPadding : maskPadding?.start}
		style:--mask-padding-end={typeof maskPadding === 'string' ? maskPadding : maskPadding?.end}
		style:--opacity={opacity}
		style:--transform={transform}
		style:--translate={translate}
		style:--rotate={rotate}
		style:--scale={scale}
	>
		{#each split as unit, i}
			<span
				class="unit-mask inline-block whitespace-pre will-change-transform"
				style:--i={i}
				style:--delay={delay}
			>
				<span class="unit inline-block whitespace-pre">
					{unit}
				</span>
			</span>
		{/each}
	</span>
{/key}

<style>
	[data-masked='true'] > .unit-mask {
		overflow-y: hidden;
		animation-name: mask;
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
	}

	@keyframes mask {
		from {
			padding-block: var(--mask-padding-start, 0);
			margin-block: calc(-1 * var(--mask-padding-start, 0));
		}
		to {
			padding-block: var(--mask-padding-end, 0);
			margin-block: calc(-1 * var(--mask-padding-end, 0));
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
