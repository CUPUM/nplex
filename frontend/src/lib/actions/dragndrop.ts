import type { AppCustomEvent } from '$types/utils';
import { CURSOR, type Cursor } from '$utils/enums';
import type { ValueOf } from 'ts-essentials';

export interface DragndropOptions {
	cursor?: Cursor;
	disabled?: boolean;
	moveThreshold?: number;
	transform?: boolean;
	root?: Document | HTMLElement;
}

const DRAGNDROP_EVENTS = {
	Start: 'dnd.start',
	Move: 'dnd.move',
	Enter: 'dnd.enter',
	Leave: 'dnd.leave',
	End: 'dnd.end',
} as const;

type DragndropEvent<
	T extends {
		target?: HTMLElement;
	} = {}
> = T & {
	originalEvent: PointerEvent;
	x0: number;
	y0: number;
	x: number;
	y: number;
	dx: number;
	dy: number;
};

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:dnd.start'?: (event: CustomEvent<DragndropEvent>) => unknown;
			'on:dnd.move'?: (event: CustomEvent<DragndropEvent>) => unknown;
			'on:dnd.end'?: (event: CustomEvent<DragndropEvent>) => unknown;
			'on:dnd.enter'?: (
				event: CustomEvent<
					DragndropEvent<{
						/* target: HTMLElement */
					}>
				>
			) => unknown;
			'on:dnd.leave'?: (
				event: CustomEvent<
					DragndropEvent<{
						/* target: HTMLElement */
					}>
				>
			) => unknown;
		}
	}
}

/**
 * Drag and drop helper for reorderable lists and flip animations.
 */
export function dragndrop(
	element: HTMLElement,
	{
		cursor = CURSOR.Grab,
		disabled = false,
		moveThreshold = 10,
		transform = true,
		root = document,
	}: DragndropOptions = {}
) {
	let x0: number | null = null;
	let y0: number | null = null;
	let draggingRef: HTMLElement | null;
	let resizeObserver: ResizeObserver | null;
	let x0offset: number | null = null;
	let y0offset: number | null = null;

	function dispatch<
		N extends ValueOf<typeof DRAGNDROP_EVENTS>,
		E extends keyof svelteHTML.HTMLAttributes = `on:${N}`,
		T = AppCustomEvent<E>['detail'] extends DragndropEvent<infer T> ? T : undefined
	>(name: N, e: PointerEvent, additional?: T) {
		element.dispatchEvent(
			new CustomEvent(name, {
				detail: {
					x0: x0 ?? 0,
					y0: y0 ?? 0,
					x: e.pageX,
					y: e.pageY,
					dx: e.pageX - (x0 ?? 0),
					dy: e.pageY - (y0 ?? 0),
					originalEvent: e,
					...additional,
				} satisfies DragndropEvent,
			})
		);
	}

	function removeDraggingListeners() {
		root.removeEventListener('pointermove', move);
		root.removeEventListener('pointerout', end);
		root.removeEventListener('pointerup', end);
		root.removeEventListener('contextmenu', end);
	}

	function addDraggingListeners() {
		root.addEventListener('pointermove', move);
		root.addEventListener('pointerout', end);
		root.addEventListener('pointerup', end);
		root.addEventListener('contextmenu', end);
	}

	function end(e: Event) {
		if (!(e instanceof PointerEvent)) return;
		if (e.type === 'pointerout' && e.target !== root) return;
		if (draggingRef) {
			draggingRef.remove();
			draggingRef = null;
		}
		if (resizeObserver) {
			resizeObserver.unobserve(element);
			resizeObserver = null;
		}
		x0 = null;
		y0 = null;
		document.documentElement.style.userSelect = '';
		removeDraggingListeners();
		dispatch(DRAGNDROP_EVENTS.End, e, { originalEvent: e });
	}

	function prestart(e: Event) {
		if (!(e instanceof PointerEvent)) return;
		x0 = e.pageX;
		y0 = e.pageY;
		x0offset = e.offsetX;
		y0offset = e.offsetY;
		addDraggingListeners();
	}

	function handleResize(entries: ResizeObserverEntry[]) {
		if (!draggingRef) return;
		draggingRef.style.inlineSize = entries[0].borderBoxSize[0].inlineSize + 'px';
		draggingRef.style.blockSize = entries[0].borderBoxSize[0].blockSize + 'px';
	}

	function applyTransform(e: PointerEvent) {
		if (!draggingRef) return;
		draggingRef.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
	}

	function start(e: PointerEvent) {
		document.documentElement.style.userSelect = 'none';
		if (transform) {
			draggingRef = element.cloneNode(true) as HTMLElement;
			resizeObserver = new ResizeObserver(handleResize);
			resizeObserver.observe(element);
			draggingRef.style.position = 'fixed';
			draggingRef.style.zIndex = '99';
			draggingRef.style.pointerEvents = 'none';
			draggingRef.style.top = -1 * (y0offset ?? 0) + 'px';
			draggingRef.style.left = -1 * (x0offset ?? 0) + 'px';
			draggingRef.id = draggingRef.id ? draggingRef.id + '-dnd-subject' : '';
			applyTransform(e);
			element.after(draggingRef);
		}
		dispatch(DRAGNDROP_EVENTS.Start, e);
	}

	function move(e: Event) {
		if (!(e instanceof PointerEvent)) return;
		if (disabled || x0 == null || y0 == null) return;
		const dx = e.pageX - x0;
		const dy = e.pageY - y0;
		const qualify = Math.hypot(dx, dy) > moveThreshold;
		if (!qualify) {
			return;
		} else if (!draggingRef) {
			start(e);
		} else {
			applyTransform(e);
		}
		dispatch(DRAGNDROP_EVENTS.Move, e, { originalEvent: e });
	}

	function dragenter(e: Event) {
		if (e instanceof PointerEvent) {
			dispatch(DRAGNDROP_EVENTS.Enter, e);
		}
	}

	function dragleave(e: Event) {
		if (e instanceof PointerEvent) {
			dispatch(DRAGNDROP_EVENTS.Leave, e);
		}
	}

	element.style.cursor = disabled ? '' : cursor;
	element.addEventListener('pointerdown', prestart);
	element.addEventListener('dragenter', dragenter);
	element.addEventListener('dragleave', dragleave);

	return {
		update(args) {
			disabled = args.disabled ?? disabled;
		},
		destroy() {
			element.removeEventListener('pointerdown', prestart);
			removeDraggingListeners();
		},
	} satisfies SvelteActionReturnType;
}
