import OverlayScrollbars from 'overlayscrollbars';

export function customScrollbar(element: HTMLElement, options: OverlayScrollbars.Options = {}) {
	const scroll = OverlayScrollbars(element, options);

	console.log(element);

	return {
		update(newOptions) {
			scroll?.options(newOptions);
		},
		destroy() {
			console.log(scroll);
			scroll?.destroy();
		},
	};
}
