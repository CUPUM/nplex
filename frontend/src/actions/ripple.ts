import { parseCSSValue } from '$utils/helpers/strings';

const RIPPLE_GLOBALS = {
	HOST_ATTRIBUTE: 'ripple-host',
	SHEET_ATTRIBUTE: 'ripple-keyframes',
	SPREAD_ANIMATION: 'ripple-spread',
	FADE_ANIMATION: 'ripple-fade',
	PRESS_ANIMATION: 'ripple-host-press',
	END_SIZE: '--ripple-end-size',
	END_COLOR: '--ripple-end-color',
	SCALE: '--ripple-host-scale'
};

interface RippleOptions {
	spreadDuration?: number;
	fadeDuration?: number;
	fadeDelay?: number;
	opacity?: number;
	startColor?: string;
	startSize?: number | string;
	endColor?: string;
	endSize?: number | string;
	scale?: number;
}

/**
 * Action to add ripple effect on host element, triggered on click event.
 */
export function ripple(element: HTMLElement, {
	spreadDuration = 650,
	fadeDuration = 1000,
	fadeDelay = 350,
	opacity = .5,
	startColor = 'white',
	startSize = 0,
	scale = .98,
	endSize = undefined,
	endColor = undefined
}: RippleOptions = {}) {

	if (!document.head.querySelector(`[${RIPPLE_GLOBALS.SHEET_ATTRIBUTE}]`)) {
		createRippleStylesheet();
	}

	const style = getComputedStyle(element);

	element.setAttribute(RIPPLE_GLOBALS.HOST_ATTRIBUTE, '');
	element.style.overflow = 'hidden';
	element.style.setProperty(RIPPLE_GLOBALS.SCALE, scale + '');
	if (style.position === 'static') {
		element.style.position = 'relative';
	}

	const parsedStartSize = startSize + (parseCSSValue(startSize).unit ? '' : 'px');
	const parsedEndSize = endSize ? endSize + (parseCSSValue(endSize).unit ? '' : 'px') : Math.max(element.clientHeight, element.clientWidth) * 2 + 'px';
	element.style.setProperty(RIPPLE_GLOBALS.END_SIZE, parsedEndSize);
	element.style.setProperty(RIPPLE_GLOBALS.END_COLOR, endColor ? endColor : startColor);

	function createRipple(e: MouseEvent) {
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		const r = document.createElement('div');
		r.style.userSelect = 'none';
		r.style.pointerEvents = 'none';
		r.style.position = 'absolute';
		r.style.opacity = opacity + '';
		r.style.backgroundColor = startColor;
		r.style.width = parsedStartSize;
		r.style.height = parsedStartSize;
		r.style.borderRadius = '50%';
		r.style.transform = 'translate(-50%, -50%)';
		r.style.top = e.clientY - rect.top + 'px';
		r.style.left = e.clientX - rect.left + 'px';
		r.style.animation = `${RIPPLE_GLOBALS.SPREAD_ANIMATION} ${spreadDuration}ms cubic-bezier(0, 0, 0.2, 1) forwards, ${RIPPLE_GLOBALS.FADE_ANIMATION} ${fadeDuration}ms ease ${fadeDelay}ms forwards`;
		element.appendChild(r);
		r.onanimationend = ((e) => {
			if (e.animationName === RIPPLE_GLOBALS.FADE_ANIMATION) {
				r.remove();
			}
		});
	}

	function click(e) {
		createRipple(e);
	}

	element.addEventListener('click', click);

	return {
		update(newParams: RippleOptions) {
			// update stuff here
		},
		destroy() {
			element.removeEventListener('click', click);
		}
	};
}

function createRippleStylesheet() {
	const sheet = document.createElement('style');
	sheet.setAttribute('type', 'text/css');
	sheet.setAttribute(RIPPLE_GLOBALS.SHEET_ATTRIBUTE, '');
	sheet.textContent = `
		[${RIPPLE_GLOBALS.HOST_ATTRIBUTE}]:active {
			transform: scale(var(${RIPPLE_GLOBALS.SCALE}));
			transition: transform 120ms ease;
		}

		@keyframes ${RIPPLE_GLOBALS.SPREAD_ANIMATION} {
			to {
				width: var(${RIPPLE_GLOBALS.END_SIZE});
				height: var(${RIPPLE_GLOBALS.END_SIZE});
				background-color: var(${RIPPLE_GLOBALS.END_COLOR});
			}
		}

		@keyframes ${RIPPLE_GLOBALS.FADE_ANIMATION} {
			to {
				opacity: 0;
			}
		}
	`;
	document.head.appendChild(sheet);
}