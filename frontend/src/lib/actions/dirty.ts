import type { ValueOf } from 'ts-essentials';

const INPUT_TYPE = {
	Checkbox: 'checkbox',
	Radio: 'radio',
} as const;

const INPUT_VALUE_PROP = {
	[INPUT_TYPE.Checkbox]: 'checked',
	[INPUT_TYPE.Radio]: 'checked',
} as const satisfies Record<ValueOf<typeof INPUT_TYPE>, string>;

interface DirtyOptions {
	comparer: any;
}

export default function dirty(
	element: HTMLInputElement | HTMLTextAreaElement,
	{}: DirtyOptions = {}
): SvelteActionReturnType {
	const type = element.type.toLowerCase();
	const prop: ValueOf<typeof INPUT_VALUE_PROP> | 'value' =
		(INPUT_VALUE_PROP as any)[type] ?? 'value';

	function check(value: any) {
		console.log(value);
	}

	function checkEvent(e: Event) {
		if (e.target instanceof HTMLElement && prop in e.target) {
			check((e.target as any)[prop]);
		}
	}

	// Handling programmatic updates.
	const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), prop);
	if (descriptor) {
		Object.defineProperty(element, 'value', {
			get: descriptor.get,
			set: function set(v) {
				descriptor.set?.call(this, v);
				check(v);
			},
		});
	}

	// Handling user-inputs.
	element.addEventListener('input', checkEvent);

	return {
		update(args) {},
		destroy() {},
	};
}
