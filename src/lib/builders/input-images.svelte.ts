import { IMAGE_FILE_TYPES_ARR } from '$lib/storage/media/constants';
import { isEventWithFileList } from '$lib/storage/media/utils';

/**
 * Handle a file input's value to generate in memory data useful to store image previews, extracted
 * colors, etc.
 */
export class InputImages<T> {
	#parse: (file: File) => T;
	#parsed = $state<InstanceType<typeof InputImages.ParsedImage<T>>[]>([]);
	onDelete?: (data: Awaited<T>) => void;
	resetData: boolean;
	resetValue: boolean;
	multiple = $state<boolean>();
	accept = $state<string[]>();

	constructor({
		parse,
		onDelete,
		multiple,
		accept = IMAGE_FILE_TYPES_ARR,
		resetData = true,
		resetValue = true,
	}: {
		parse: (file: File) => T;
		onDelete?: (data: Awaited<NoInfer<T>>) => void;
		multiple?: boolean;
		accept?: string[];
		resetData?: boolean;
		resetValue?: boolean;
	}) {
		this.#parse = parse;
		this.onDelete = onDelete;
		this.multiple = multiple;
		this.accept = accept;
		this.resetData = resetData;
		this.resetValue = resetValue;
	}

	private static ParsedImage = class<D> {
		#context;

		constructor(
			public data: Awaited<D>,
			context: InputImages<D>
		) {
			this.#context = context;
			context.parsed.push(this);
		}

		delete() {
			const index = this.#context.parsed.indexOf(this);
			if (index > -1) {
				this.#context.parsed.splice(index, 1);
			}
			if (this.#context.onDelete) {
				this.#context.onDelete(this.data);
			}
		}
	};

	get parsed() {
		return this.#parsed;
	}

	get inputAttributes() {
		const _this = this;
		return {
			type: 'file' as const,
			get multiple() {
				return _this.multiple;
			},
			get accept() {
				return _this.accept?.join(',');
			},
			async onchange(
				e: Event & {
					currentTarget: EventTarget & HTMLInputElement;
				}
			) {
				if (!isEventWithFileList(e)) {
					return;
				}
				if (_this.resetData) {
					_this.deleteAll();
				}
				if (!e.target.files.length) {
					return;
				}
				await Promise.all(
					Array.from(e.target.files).map(async (file) => {
						const data = await _this.#parse(file);
						new InputImages.ParsedImage(data, _this);
					})
				);
				if (_this.resetValue && 'value' in e.target) {
					e.target.value = '';
				}
			},
		};
	}

	deleteAll() {
		if (this.onDelete) {
			this.#parsed.forEach((image) => this.onDelete!(image.data));
		}
		this.#parsed = [];
	}
}
