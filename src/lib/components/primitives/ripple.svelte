<script lang="ts" context="module">
	import { mount, unmount, type ComponentProps } from 'svelte';
	import Ripple from './ripple.svelte';

	const HOST_ATTRIBUTE = 'data-ripple-host';

	export function ripple(target: HTMLElement, props?: ComponentProps<Ripple>) {
		const comp = mount(Ripple, {
			target,
			props,
			anchor: target.firstChild || undefined,
		});
		return {
			destroy() {
				unmount(comp);
			},
		} satisfies SvelteActionReturnType;
	}
</script>

<script lang="ts">
	import { px } from '$lib/common/css';
	import { onDestroy, onMount } from 'svelte';

	let {
		blur,
		speedSpread = 0.5,
		durationSpread,
		speedOutro,
		durationOutro = 1_000,
		easingSpread,
		easingOutro,
		color,
		colorStart,
		colorEnd,
	}: {
		blur?: string | number;
		easingSpread?: string;
		easingOutro?: string;
	} & (
		| {
				speedSpread?: number;
				durationSpread?: undefined;
		  }
		| {
				speedSpread?: undefined;
				durationSpread?: number;
		  }
	) &
		(
			| {
					speedOutro: number;
					durationOutro?: undefined;
			  }
			| {
					speedOutro?: undefined;
					durationOutro?: number;
			  }
		) &
		(
			| {
					color?: string;
					colorStart?: undefined;
					colorEnd?: undefined;
			  }
			| {
					color?: undefined;
					colorStart?: string;
					colorEnd?: string;
			  }
		) = $props();

	let containerRef: HTMLDivElement;
	let hostRef: HTMLElement | null;
	let ripples: {
		x: number;
		y: number;
		d: number;
		outro: boolean;
		canceled: boolean;
		outside: boolean;
		done: {
			spread: boolean;
			outro: boolean;
		};
	}[] = $state([]);

	function add(e: PointerEvent) {
		if (
			containerRef.parentElement &&
			// Catching only the directly descending events, prevents conflict between nested ripple triggers.
			e.target instanceof Element &&
			e.target.closest(`[${HOST_ATTRIBUTE}]`) === containerRef.parentElement
		) {
			// Using bounding client rect, even if a bit more expensive, to account for
			// child element event targets that steal the offsetX and offsetY value referentials.
			const rect = containerRef.parentElement.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const rx = Math.max(x, rect.right - e.clientX);
			const ry = Math.max(y, rect.bottom - e.clientY);
			const d = 2 * Math.hypot(rx, ry);
			const ripple = $state({
				x,
				y,
				d,
				outro: false,
				canceled: false,
				outside: false,
				done: {
					spread: false,
					outro: false,
				},
			});
			ripples.push(ripple);
			function enter(e: PointerEvent) {
				ripple.outside = false;
				return e;
			}
			function leave(e: PointerEvent) {
				ripple.outside = true;
				return e;
			}
			function end(e: Event) {
				document.removeEventListener('pointerup', end);
				document.removeEventListener('pointercancel', end);
				containerRef.parentElement?.removeEventListener('pointerenter', enter);
				containerRef.parentElement?.removeEventListener('pointerleave', leave);
				ripple.outro = true;
				if (e.type === 'pointercancel' || ripple.outside) {
					ripple.canceled = true;
				}
			}
			document.addEventListener('pointerup', end);
			document.addEventListener('pointercancel', end);
			containerRef.parentElement.addEventListener('pointerenter', enter);
			containerRef.parentElement.addEventListener('pointerleave', leave);
		}
	}

	function cleanup(e: AnimationEvent, ripple: (typeof ripples)[number]) {
		if (e.target !== e.currentTarget || !(e.target instanceof Element)) {
			return;
		}
		if (e.animationName === 'ripple-spread') {
			ripple.done.spread = true;
		} else if (e.animationName === 'ripple-outro') {
			ripple.done.outro = true;
		}
		if (ripple.done.spread && ripple.done.outro) {
			ripples.splice(ripples.indexOf(ripple), 1);
		}
	}

	onMount(() => {
		if (containerRef) {
			hostRef = containerRef.parentElement;
		}
		if (hostRef) {
			hostRef.addEventListener('pointerdown', add);
			hostRef.setAttribute(HOST_ATTRIBUTE, '');
		}
	});

	onDestroy(() => {
		if (hostRef) {
			hostRef.removeEventListener('pointerdown', add);
			hostRef.removeAttribute(HOST_ATTRIBUTE);
		}
	});
</script>

<div
	bind:this={containerRef}
	class="rounded-inherit pointer-events-none absolute inset-0 overflow-hidden"
	style:--ripple-color={color}
	style:--ripple-blur={blur != null ? px(blur) : undefined}
	style:--ripple-color-start={colorStart}
	style:--ripple-color-end={colorEnd}
	style:--ripple-easing-spread={easingSpread}
	style:--ripple-easing-outro={easingOutro}
>
	{#each ripples as r (r)}
		<div
			class="ripple"
			class:outroing={r.outro}
			class:canceled={r.canceled}
			class:outside={r.outside}
			style:--x="{r.x}px"
			style:--y="{r.y}px"
			style:--d="{r.d}px"
			style:--ripple-duration-spread="{durationSpread ?? Math.round(r.d / speedSpread)}ms"
			style:--ripple-duration-outro="{speedOutro ? Math.round(r.d / speedOutro) : durationOutro}ms"
			onanimationendcapture={(e) => cleanup(e, r)}
		></div>
	{/each}
</div>

<style>
	.ripple {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: var(--x);
		top: var(--y);
		width: 10px;
		background: var(--ripple-color-start, var(--ripple-color));
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		translate: -50% -50%;
		filter: blur(var(--ripple-blur));
		transition: opacity var(--ripple-duration-outro) var(--ripple-easing-outro);
		animation: var(--ripple-duration-spread) var(--ripple-easing-spread) 0s 1 forwards ripple-spread;
	}

	.outroing {
		animation:
			var(--ripple-duration-outro) var(--ripple-easing-outro) var(--ripple-duration-spread) 1
				forwards ripple-outro,
			var(--ripple-duration-spread) var(--ripple-easing-spread) 0s 1 forwards ripple-spread;
	}

	.canceled {
		animation-delay: 0s;
	}

	.outside {
		opacity: 0;
	}

	@keyframes -global-ripple-outro {
		to {
			opacity: 0;
		}
	}

	@keyframes -global-ripple-spread {
		to {
			width: calc(var(--d) + 2 * var(--ripple-blur));
			background: var(--ripple-color-end, var(--ripple-color));
		}
	}
</style>
