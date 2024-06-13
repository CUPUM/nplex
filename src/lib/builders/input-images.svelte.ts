import { IMAGE_FILE_TYPES_ARR } from '$lib/storage/media/constants';
import { isEventWithFileList } from '$lib/storage/media/utils';

/**
 * Handle a file input's value to generate in memory data useful to store image previews, extracted
 * colors, etc.
 */
export class InputImages<TData> {
	parse: (file: File) => TData;
	resetData: boolean;
	resetValue: boolean;
	multiple = $state<boolean>();
	accept = $state<string[]>();
	data = $state<Awaited<TData>[]>([]);

	constructor({
		parse,
		multiple,
		accept = IMAGE_FILE_TYPES_ARR,
		resetData = true,
		resetValue = true,
	}: {
		parse: (file: File) => TData;
		multiple?: boolean;
		accept?: string[];
		resetData?: boolean;
		resetValue?: boolean;
	}) {
		this.parse = parse;
		this.multiple = multiple;
		this.accept = accept;
		this.resetData = resetData;
		this.resetValue = resetValue;
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
					_this.data = [];
				}
				if (!e.target.files.length) {
					return;
				}
				await Promise.all(
					Array.from(e.target.files).map(async (file) => {
						const fileData = await _this.parse(file);
						_this.data.push(fileData);
					})
				);
				if (_this.resetValue && 'value' in e.target) {
					e.target.value = '';
				}
			},
		};
	}
}
