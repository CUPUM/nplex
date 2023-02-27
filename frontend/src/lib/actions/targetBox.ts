interface TargetBoxOptions {
	target?: HTMLElement | null;
}

/**
 * Directive to get an...
 */
export function targetBox(
	element: HTMLElement,
	{ target }: TargetBoxOptions = {}
): SvelteActionReturnType {
	element.style.position = 'absolute';

	function setBox() {
		if (!target) {
			// element.style.top = '';
			// element.style.left = '';
			// element.style.width = '';
			// element.style.height = '';
			return;
		}
		element.style.top = target.offsetTop + 'px';
		element.style.left = target.offsetLeft + 'px';
		element.style.width = target.offsetWidth + 'px';
		element.style.height = target.offsetHeight + 'px';
	}

	setBox();

	const resizeObserver = new ResizeObserver(() => {
		setBox();
	});

	if (element.parentElement) {
		resizeObserver.observe(element.parentElement);
	}

	return {
		update(args) {
			target = args.target;
			setBox();
		},
		destroy() {
			resizeObserver.disconnect();
		},
	};
}
