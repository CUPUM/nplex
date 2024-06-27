import type { Component, Snippet } from 'svelte';
import type { AriaRole } from 'svelte/elements';
import type { ValueOf } from 'type-fest';

export const TOAST_TYPES = {
	DEFAULT: 'default',
	ERROR: 'error',
	SUCCESS: 'success',
	NOTIFICATION: 'notification',
} as const;

export type ToastType = ValueOf<typeof TOAST_TYPES>;

const TOAST_ROLES: Partial<Record<ToastType, AriaRole>> = {
	[TOAST_TYPES.ERROR]: 'alert',
} as const;

type ToastBody = string | Snippet<[unknown]> | Component;

/**
 * Single toast instance with its own states.
 */
class Toast<T extends ToastBody> {
	#parent;

	close;
	progress = $derived.by(() => (this.#duration ? Math.min(this.#elapsed / this.#duration, 1) : 0));
	#type;
	#duration;
	#dismissable;
	#content;
	#playing = $state(true);
	#elapsed = $state(0);
	#prev: number | undefined;
	#run(t: number) {
		if (this.#prev) {
			if (this.#playing && this.#parent.playing) {
				this.#elapsed += t - this.#prev;
				if (this.#elapsed >= this.#duration) {
					return this.close();
				}
			}
		}
		this.#prev = t;
		requestAnimationFrame(this.#run.bind(this));
	}
	#pause() {
		this.#playing = false;
	}
	#resume() {
		this.#playing = true;
	}

	constructor(
		{
			type = TOAST_TYPES.DEFAULT,
			duration = 5000,
			dismissable = true,
			// collection,
			content,
		}: {
			type?: ToastType;
			duration?: number;
			dismissable?: boolean;
			// collection: Toasts['all'];
			content: T extends string
				? { body: T; title?: string }
				: T extends Component<infer P>
					? { component: T; props?: P }
					: T extends Snippet<[Toast<Snippet>]>
						? { snippet: T }
						: never;
		},
		collection: Toast<T>[],
		parent: Toasts
	) {
		this.#parent = parent;
		this.#type = type;
		this.#duration = duration;
		this.#dismissable = dismissable;
		this.#content = content;
		this.close = (e?: Event) => {
			const index = collection.indexOf(this);
			if (index > -1) {
				collection.splice(index, 1);
			}
			return collection;
		};
		collection.push(this);
		if (this.#duration) {
			requestAnimationFrame(this.#run.bind(this));
		}
	}

	get toastAttributes() {
		const _this = this;
		return {
			role: TOAST_ROLES[_this.#type],
			onpointerenter(e: PointerEvent) {
				_this.#pause();
			},
			onpointerleave(e: PointerEvent) {
				_this.#resume();
			},
		};
	}

	get closeAttributes() {
		const _this = this;
		return {
			onclick(e: MouseEvent) {
				if (_this.#dismissable) {
					_this.close(e);
				}
			},
		};
	}

	get dismissable() {
		return this.#dismissable;
	}

	get type() {
		return this.#type;
	}

	get duration() {
		return this.#duration;
	}

	get content() {
		return this.#content;
	}
}

export type ToastInstance<T extends ToastBody = ToastBody> = InstanceType<typeof Toast<T>>;

export type ToastParameters<T extends ToastBody = ToastBody> = ConstructorParameters<
	typeof Toast<T>
>[0];

/**
 * Toasts collection to manage messages.
 */
export class Toasts {
	options;
	#all = $state<InstanceType<typeof Toast>[]>([]);
	#playing = $state(true);
	#pause() {
		this.#playing = false;
	}
	#resume() {
		this.#playing = true;
	}

	// To do: add configurable defaults for relevant fields (duration, dismissable, etc.)
	constructor({ pauseAll = false }: { pauseAll?: boolean } = {}) {
		this.options = {
			pauseAll,
		};
	}

	get all() {
		return this.#all;
	}

	get playing() {
		return this.#playing;
	}

	get listAttributes() {
		const _this = this;
		return {
			onpointerenter(e: PointerEvent) {
				if (_this.options.pauseAll) {
					_this.#pause();
				}
			},
			onpointerleave(e: PointerEvent) {
				_this.#resume();
			},
		};
	}

	add<T extends ToastBody>(options: ToastParameters<T>) {
		const toast = new Toast(options, this.#all, this);
		return toast;
	}
}
