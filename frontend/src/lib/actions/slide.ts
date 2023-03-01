import type { ValueOf } from 'ts-essentials';

interface SlideOptions {
	disabled?: boolean;
}

const SLIDE_EVENTS = {
	Start: 'slide.start',
	Move: 'slide.move',
	End: 'slide.end',
} as const;

interface SlideEvent {
	dx: number;
	dy: number;
	/**
	 * 1D delta computed from deltaX and deltaY.
	 */
	d: number;
	x0: number;
	y0: number;
	x: number;
	y: number;
}

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:slide.start'?: (event: CustomEvent<SlideEvent>) => unknown;
			'on:slide.move'?: (event: CustomEvent<SlideEvent>) => unknown;
			'on:slide.end'?: (event: CustomEvent<SlideEvent>) => unknown;
		}
	}
}

function computeDelta(dx: number, dy: number) {
	const a = Math.atan2(dy, dx);
	const sign = Math.sign(Math.sin(a) + Math.cos(a));
	return sign * Math.max(Math.abs(dx), Math.abs(dy));
}

/**
 * Dispatch an element's drag move information.
 */
export default function slide(
	element: HTMLElement,
	{ disabled = false }: SlideOptions = {}
): SvelteActionReturnType {
	/**
	 * Reference position.
	 */
	let x0: number | null = null;
	let y0: number | null = null;

	function dispatch(name: ValueOf<typeof SLIDE_EVENTS>, e: PointerEvent) {
		if (disabled || x0 == null || y0 == null) {
			return;
		}
		const dx = e.pageX - x0;
		const dy = e.pageY - y0;
		element.dispatchEvent(
			new CustomEvent(name, {
				detail: {
					x0,
					y0,
					x: e.pageX,
					y: e.pageY,
					dx,
					dy,
					d: computeDelta(dx, y0 - e.pageY),
				} satisfies SlideEvent,
			})
		);
	}

	function handleMove(e: PointerEvent) {
		dispatch(SLIDE_EVENTS.Move, e);
	}

	function end(e: PointerEvent) {
		dispatch(SLIDE_EVENTS.End, e);
		x0 = null;
		y0 = null;
		document.removeEventListener('pointermove', handleMove);
		document.removeEventListener('pointerup', end);
		document.removeEventListener('pointercancel', end);
	}

	function start(e: PointerEvent) {
		if (x0 == null) {
			x0 = e.pageX;
		}
		if (y0 == null) {
			y0 = e.pageY;
		}
		dispatch(SLIDE_EVENTS.Start, e);
		document.addEventListener('pointerup', end, { once: true });
		document.addEventListener('pointercancel', end, { once: true });
		document.addEventListener('pointermove', handleMove);
	}

	element.addEventListener('pointerdown', start);

	return {
		update(args) {
			disabled = args.disabled ?? disabled;
		},
		destroy() {
			document.removeEventListener('pointerup', end);
			document.removeEventListener('pointermove', handleMove);
			document.removeEventListener('pointerdown', start);
			document.removeEventListener('pointercancel', end);
		},
	};
}
