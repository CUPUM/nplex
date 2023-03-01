const DIRTY_EVENTS = {
	Dirty: 'dirty',
	Clean: 'clean',
};

// const INPUT_TYPE = {
// 	Checkbox: 'checkbox',
// 	Radio: 'radio',
// } as const;

// const INPUT_VALUE_PROP = {
// 	[INPUT_TYPE.Checkbox]: 'checked',
// 	[INPUT_TYPE.Radio]: 'checked',
// } as const satisfies Record<ValueOf<typeof INPUT_TYPE>, string>;

interface DirtyOptions<T = any> {
	sample?: T;

	// compare?: () => boolean;
}

function getElementValue(element: HTMLElement) {
	// ...
}

function handleSelectInput(e: Event) {
	const select = e.target instanceof HTMLSelectElement ? e.target : undefined;
	if (select) {
		const value = select.multiple
			? Array.from(select.querySelectorAll<HTMLOptionElement>('option:checked')).map(
					(o) => o.__value
			  )
			: select.querySelector<HTMLOptionElement>('option:checked')?.__value;
	}
}

/**
 * This action should provide the ability to track if a given input's value is dirty in comparison
 * to a sample (either passed or automatically framed as the initial value). It should emit a
 * `fresh` event for cases where the input and sample value coincide, and a `dirty` event whenever
 * they stop coinciding. It should also passing dirt tracking store for reactively sharing the
 * state.
 *
 * For object bindings, see: https://github.com/sveltejs/svelte/issues/2734.
 *
 * For programmatic input tracking, see comments below.
 */
export default function dirty(
	element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
	{ sample }: DirtyOptions = {}
): SvelteActionReturnType {
	element.addEventListener('input', (e) => console.log(e));

	return {
		update(args) {},
		destroy() {},
	};
}

// export default function dirty(
// 	element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
// 	{ sample, compare }: DirtyOptions
// ): SvelteActionReturnType {
// 	const type = element.type.toLowerCase();
// 	const prop: ValueOf<typeof INPUT_VALUE_PROP> | 'value' =
// 		(INPUT_VALUE_PROP as any)[type] ?? 'value';

// 	function check(value: any) {
// 		console.log(value);
// 	}

// 	function checkEvent(e: Event) {
// 		if (e.target instanceof HTMLElement && prop in e.target) {
// 			check((e.target as any)[prop]);
// 		}
// 	}

// 	// Handling programmatic updates.
// 	const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), prop);
// 	if (descriptor) {
// 		Object.defineProperty(element, 'value', {
// 			get: descriptor.get,
// 			set: function set(v) {
// 				descriptor.set?.call(this, v);
// 				check(v);
// 			},
// 		});
// 	}

// 	// Handling user-inputs.
// 	element.addEventListener('input', checkEvent);

// 	return {
// 		update(args) {},
// 		destroy() {},
// 	};
// }
