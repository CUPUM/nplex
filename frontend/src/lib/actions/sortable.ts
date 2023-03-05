import Sortable from 'sortablejs';

declare global {
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:sort'?: (event: Sortable.SortableEvent) => unknown;
		}
	}
}

export type SortableEvent = Sortable.SortableEvent;

interface SortableOptions<D> extends Sortable.Options {
	items: D[];
	getKey: (item: D) => string;
}

export default function sortable<D>(
	element: HTMLElement,
	{
		items,
		getKey,
		group = 'sortable',
		sort = true,
		delay = 0,
		delayOnTouchOnly = false,
		touchStartThreshold = 5,
		disabled = false,
		// store = null,
		animation = 200,
		easing = 'cubic-bezier(.8, 0, .2, 1)',
		handle = '',
		filter = '',
		preventOnFilter = true,
		draggable = '*',
		dataIdAttr = 'data-key',
		ghostClass = '',
		chosenClass = '',
		dragClass = '',
		swapThreshold = 1,
		invertSwap = false,
		invertedSwapThreshold = 1,
		direction = 'horizontal',
		forceFallback = true,
		fallbackClass = '',
		fallbackOnBody = false,
		fallbackTolerance = 0,
		dragoverBubble = false,
		removeCloneOnHide = true,
		emptyInsertThreshold = 5,
	}: SortableOptions<D>
) {
	const s = new Sortable(element, {
		group,
		sort,
		delay,
		delayOnTouchOnly,
		touchStartThreshold,
		disabled,
		animation,
		easing,
		handle,
		filter,
		preventOnFilter,
		draggable,
		dataIdAttr,
		ghostClass,
		chosenClass,
		dragClass,
		swapThreshold,
		invertSwap,
		invertedSwapThreshold,
		direction,
		forceFallback,
		fallbackClass,
		fallbackOnBody,
		fallbackTolerance,
		dragoverBubble,
		removeCloneOnHide,
		emptyInsertThreshold,
		onSort(event) {
			console.log(s.toArray());
		},
	});

	return {
		update(args) {
			// console.log(args);
			// s.option();
			s.sort(items.map((d) => getKey(d)));
		},
		destroy() {
			s.destroy();
		},
	} satisfies SvelteActionReturnType;
}
