import type { AppCustomEvent } from '$types/utils';
import { CURSOR, type Cursor } from '$utils/enums';
import { spring, type Spring, type Tweened } from 'svelte/motion';
import type { ValueOf } from 'ts-essentials';

export interface DragndropOptions<I = any> {
	/**
	 * Unique identifier for connecting across enter/leave events.
	 */
	key: string | number;
	/**
	 * Item values;
	 */
	item: I;
	/**
	 * Apply a cursor to communicate draggability.
	 */
	cursor?: Cursor;
	/**
	 * Disable dragging for the directive's host element?
	 */
	disabled?: boolean;
	/**
	 * Pin the item to prevent draggabled from being sorted after or before.
	 */
	pin?: 'first' | 'last' | false;
	/**
	 * Distance threshold before dragging is activated. Useful to avoid conflicts with nested
	 * interactive elements.
	 */
	moveThreshold?: number;
	/**
	 * Query selector for retrieving element reference(s) to use as drag handle(s). Useful when trying
	 * to avoid conflicts with nested interactive elements.
	 */
	gripSelector?: string;
	/**
	 * Should the directive apply transformation to the dragged element or simply emit events?.
	 */
	transform?: boolean;
	/**
	 * The container that delimits where drag-tracking forcefully ends.
	 */
	root?: Document | HTMLElement;
	/**
	 * Programatically force element to be included in other's dragging events.
	 */
	grouped?: boolean;
	/**
	 * Animation applied during transformation.
	 */
	motion?: Tweened<[x: number, y: number]> | Spring<[x: number, y: number]>;
	/**
	 * Should the dragged item(s) be centered on the cursor?
	 */
	center?: boolean;
	/**
	 * CSS class to apply to the cloned dragging subject. Accepts multiple space serparated
	 * classnames.
	 */
	placeholderClass?: string;
	/**
	 * CSS inline style to apply to the cloned dragging subject.
	 */
	placeholderStyle?: Partial<
		Omit<CSSStyleDeclaration, number | typeof Symbol.iterator | 'length' | 'parentRule'>
	>;
	/**
	 * Should the placeholder clone be a deep clone? I.e., should it include the dragged element's
	 * children?
	 */
	placeholderDeepClone?: boolean;
}

export const DRAGNDROP_EVENTS = {
	Start: 'dnd.start',
	Drag: 'dnd.drag',
	Sort: 'dnd.sort',
	End: 'dnd.end',
} as const;

type DragndropEvent<
	T extends {
		items?: unknown[];
	} = {}
> = T & {
	dragging: { key: DragndropOptions['key']; element: HTMLElement } | null;
	grouped: { [key: DragndropOptions['key']]: HTMLElement };
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
			'on:dnd.drag'?: (event: CustomEvent<DragndropEvent>) => unknown;
			'on:dnd.sort'?: (event: CustomEvent<DragndropEvent<{ items: unknown[] }>>) => unknown;
			'on:dnd.end'?: (event: CustomEvent<DragndropEvent>) => unknown;
		}
	}
}

/**
 * Global states:
 *
 * - Group: Array of element(s) with group option enabled. Will be dragged together.
 * - Dragging: Current element being dragged.
 */
const contexts = new Map<
	HTMLElement,
	{
		group: DragndropEvent['grouped'];
		dragging: DragndropEvent['dragging'] | null;
		sortedKeys: DragndropOptions['key'][];
		items: Map<DragndropOptions['key'], DragndropOptions['item']>;
	}
>();

/**
 * Drag and drop helper for reorderable lists and flip animations.
 */
export function dragndrop<I>(
	element: HTMLElement,
	{
		key,
		item,
		cursor = CURSOR.Grab,
		disabled = false,
		moveThreshold = 5,
		transform = true,
		root = document,
		grouped = false,
		gripSelector = undefined,
		motion = spring([0, 0], { stiffness: 0.3, damping: 0.8 }),
		placeholderClass = undefined,
		placeholderStyle = undefined,
		center = false,
	}: DragndropOptions<I>
) {
	let contextKey = element.parentElement;
	if (!contextKey) {
		throw new Error('Could not find a context for Dragndrop associated to element: ' + element);
	}
	if (!contexts.has(contextKey)) {
		contexts.set(contextKey, {
			group: {},
			dragging: null,
			sortedKeys: [],
			items: new Map(),
		});
	}
	let context = contexts.get(contextKey);
	if (context) {
		if (context.sortedKeys.indexOf(key) < 0) {
			context.sortedKeys.push(key);
		}
		context.items.set(key, item);
	}
	let dragging = false;
	let x0: number | null = null;
	let y0: number | null = null;
	let leftOffset: number = 0;
	let topOffset: number = 0;
	let xCenterOffset: number = 0;
	let yCenterOffset: number = 0;
	let placeholderRef: HTMLElement | null;
	let resizeObserver: ResizeObserver | null;
	let motionUnsub: ReturnType<(typeof motion)['subscribe']> | null = null;

	function dispatch<
		N extends ValueOf<typeof DRAGNDROP_EVENTS>,
		E extends keyof svelteHTML.HTMLAttributes = `on:${N}`,
		T = AppCustomEvent<E>['detail'] extends DragndropEvent<infer T> ? T : undefined
	>(name: N, e: PointerEvent, additional?: T, emitter: HTMLElement = element) {
		emitter.dispatchEvent(
			new CustomEvent(name, {
				detail: {
					x0: x0 ?? 0,
					y0: y0 ?? 0,
					x: e.pageX,
					y: e.pageY,
					dx: e.pageX - (x0 ?? 0),
					dy: e.pageY - (y0 ?? 0),
					originalEvent: e,
					grouped: context?.group ?? {},
					dragging: context?.dragging ?? { key, element },
					...additional,
				} satisfies DragndropEvent,
			})
		);
	}

	function removeDraggingListeners() {
		root.removeEventListener('pointermove', drag);
		root.removeEventListener('pointerleave', end);
		root.removeEventListener('pointerup', end);
		root.removeEventListener('contextmenu', end);
	}

	function addDraggingListeners() {
		root.addEventListener('pointermove', drag);
		root.addEventListener('pointerleave', end);
		root.addEventListener('pointerup', end);
		root.addEventListener('contextmenu', end);
	}

	function addItemListeners() {
		element.addEventListener('pointerenter', enter);
		// element.addEventListener('pointerleave', leave);
	}

	function removeItemListeners() {
		element.removeEventListener('pointerenter', enter);
		// element.removeEventListener('pointerleave', leave);
	}

	function handleResize(entries: ResizeObserverEntry[]) {
		element.style.inlineSize = entries[0].borderBoxSize[0].inlineSize + 'px';
		element.style.blockSize = entries[0].borderBoxSize[0].blockSize + 'px';
	}

	function setElementStyle(clear = false) {
		const s = getComputedStyle(element);
		element.style.pointerEvents = clear ? '' : 'none';
		element.style.position = clear ? '' : 'fixed';
		element.style.zIndex = clear ? '' : '99';
		element.style.top = clear ? '' : -1 * (topOffset ?? 0) + 'px';
		element.style.left = clear ? '' : -1 * (leftOffset ?? 0) + 'px';
		element.style.inlineSize = clear ? '' : s.inlineSize;
		element.style.blockSize = clear ? '' : s.blockSize;
		if (clear) {
			element.style.transform = '';
		}
	}

	function prestart(e: Event) {
		if (!(e instanceof PointerEvent)) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		x0 = e.pageX;
		y0 = e.pageY;
		leftOffset = e.clientX - rect.left;
		topOffset = e.clientY - rect.top;
		xCenterOffset = center ? leftOffset - element.offsetWidth / 2 : 0;
		yCenterOffset = center ? topOffset - element.offsetHeight / 2 : 0;
		addDraggingListeners();
		motion.set([x0, y0], { hard: true });
	}

	function start(e: PointerEvent) {
		dragging = true;
		document.documentElement.style.userSelect = 'none';
		if (transform) {
			placeholderRef = element.cloneNode(false) as HTMLElement;
			placeholderRef.id = placeholderRef.id ? placeholderRef.id + '-dnd-placeholder' : '';
			if (placeholderClass) placeholderRef.classList.add(placeholderClass);
			if (placeholderStyle) Object.assign(placeholderRef.style, placeholderStyle);
			setElementStyle();
			motionUnsub = motion.subscribe(([x, y]) => {
				element.style.transform = `translate3D(${x}px, ${y}px, 0px)`;
			});
			element.after(placeholderRef);
			resizeObserver = new ResizeObserver(handleResize);
			resizeObserver.observe(placeholderRef);
			motion.set([e.pageX, e.pageY]);
		}
		if (context) {
			context.dragging = { key, element };
		}
		dispatch(DRAGNDROP_EVENTS.Start, e);
	}

	function drag(e: Event) {
		if (!(e instanceof PointerEvent)) return;
		if (disabled || x0 == null || y0 == null) return;
		const dx = e.pageX - x0;
		const dy = e.pageY - y0;
		const qualify = Math.hypot(dx, dy) > moveThreshold;
		if (!qualify) return;
		if (!dragging) {
			start(e);
		} else {
			motion.set([e.pageX + xCenterOffset, e.pageY + yCenterOffset]);
		}
		dispatch(DRAGNDROP_EVENTS.Drag, e, { originalEvent: e });
	}

	async function end(e: Event) {
		if (!(e instanceof PointerEvent)) return;
		if (dragging) {
			dragging = false;
			removeDraggingListeners();
			if (placeholderRef) {
				const to = placeholderRef.getBoundingClientRect();
				if (motionUnsub) {
					await motion.set([
						to.left + document.documentElement.scrollLeft + document.body.scrollLeft + leftOffset,
						to.top + document.documentElement.scrollTop + document.body.scrollTop + topOffset,
					]);
					motionUnsub();
				}
				setElementStyle(true);
				if (resizeObserver) {
					resizeObserver.unobserve(placeholderRef);
					resizeObserver = null;
				}
				placeholderRef.remove();
				placeholderRef = null;
			}
		}
		x0 = null;
		y0 = null;
		leftOffset = 0;
		topOffset = 0;
		xCenterOffset = 0;
		yCenterOffset = 0;
		document.documentElement.style.userSelect = '';
		if (context) {
			if (context.dragging && context.dragging.key == key) {
				context.dragging = null;
			}
		}
		dispatch(DRAGNDROP_EVENTS.End, e, { originalEvent: e });
	}

	function enter(e: Event) {
		if (e instanceof PointerEvent && context?.dragging?.key) {
			const draggingIndex = context.sortedKeys.indexOf(context.dragging.key);
			const newSort = [...context.sortedKeys];
			newSort.splice(draggingIndex, 1);
			const currentItemIndex = newSort.indexOf(key);
			newSort.splice(currentItemIndex, 0, context.dragging.key);
			context.sortedKeys = newSort;
			newSort.forEach((k, i) => {
				newSort[i] = context?.items.get(k);
			});
			dispatch(DRAGNDROP_EVENTS.Sort, e, { items: newSort }, context.dragging.element);
		}
	}

	function getGrips() {
		return gripSelector
			? ([...element.querySelectorAll(gripSelector)].filter(
					(n) => n instanceof HTMLElement
			  ) as HTMLElement[])
			: [element];
	}

	let removeGripListeners: undefined | (() => void);
	function updateGripListeners() {
		if (removeGripListeners) {
			removeGripListeners();
		}
		const grips = getGrips();
		grips.forEach((el) => {
			el.style.cursor = disabled ? '' : cursor;
			el.addEventListener('pointerdown', prestart);
		});
		removeGripListeners = function () {
			grips.forEach((el) => {
				el.style.cursor = '';
				el.removeEventListener('pointerdown', prestart);
			});
			removeGripListeners = undefined;
		};
	}

	updateGripListeners();

	addItemListeners();

	return {
		update(args: DragndropOptions) {
			// console.log('Updating directive...', args);
			root = args.root ?? root;
			disabled = args.disabled ?? disabled;
			cursor = args.cursor ?? cursor;
			moveThreshold = args.moveThreshold ?? moveThreshold;
			transform = args.transform ?? transform;
			center = args.center ?? center;
			grouped = args.grouped ?? grouped;
			item = args.item ?? item;
			if (context) {
				const itemIndex = context.sortedKeys.indexOf(key);
				if (itemIndex > -1 && args.key != null && key !== args.key) {
					context.items.set(args.key, item);
					context.items.delete(key);
					key = args.key;
					context.sortedKeys.splice(itemIndex, 1, key);
				}
				if (grouped) {
					context.group[key] = element;
				} else {
					delete context.group[key];
				}
			}
			if (args.gripSelector !== gripSelector) {
				gripSelector = args.gripSelector;
				updateGripListeners();
			}
		},
		destroy() {
			// console.log('Destroying directive...');
			if (removeGripListeners) {
				removeGripListeners();
			}
			if (context) {
				const itemIndex = context.sortedKeys.indexOf(key);
				if (itemIndex > -1) {
					context.items.delete(key);
					context.sortedKeys.splice(itemIndex, 1);
				}
			}
			removeDraggingListeners();
			removeItemListeners();
		},
	} satisfies SvelteActionReturnType;
}
