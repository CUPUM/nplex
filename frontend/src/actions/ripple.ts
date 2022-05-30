import { cssSize, type CSSSizeValue } from '$utils/helpers/css';

const RIPPLE_GLOBALS = {
	HOST_ATTRIBUTE: 'ripple-host',
	SHEET_ATTRIBUTE: 'ripple-keyframes',
	SPREAD_ANIMATION: 'ripple-spread',
	FADE_ANIMATION: 'ripple-fade',
	PRESS_ANIMATION: 'ripple-host-press',
	END_SIZE: '--ripple-end-size',
	END_COLOR: '--ripple-end-color',
};

interface RippleOptions {
	spreadDuration?: number;
	fadeDuration?: number;
	fadeDelay?: number;
	opacity?: number;
	startColor?: string;
	startSize?: number | CSSSizeValue;
	endColor?: string;
	endSize?: number | CSSSizeValue;
	blur?: number;
	disabled?: boolean;
	/**
	 * If the element with listeners should differ from the container of the ripple. Useful when we want to keep
	 * 'overflow' to another value than 'hidden' on the control element.
	 */
	controlElement?: HTMLElement;
}

/**
 * Action to add ripple effect on host element, triggered on click event.
 */
export function ripple(
	element: HTMLElement,
	{
		spreadDuration = 350,
		fadeDuration = 500,
		fadeDelay = 50,
		opacity = 0.2,
		startColor = 'currentColor',
		startSize = 0,
		endSize = undefined,
		endColor = undefined,
		blur = 0,
		disabled = false,
		controlElement = element,
	}: RippleOptions = {}
) {
	// if (controlElement !== element) {
	// 	console.log(controlElement);
	// }

	/**
	 * Create the stylesheet defining the ripple transitions.
	 */
	if (!document.head.querySelector(`[${RIPPLE_GLOBALS.SHEET_ATTRIBUTE}]`)) {
		createRippleStylesheet();
	}

	/**
	 * Prepare the host element.
	 */
	const style = getComputedStyle(element);
	element.setAttribute(RIPPLE_GLOBALS.HOST_ATTRIBUTE, '');
	element.style.overflow = 'hidden';
	if (!element.style.transformOrigin) element.style.transformOrigin = 'center center';
	if (style.position === 'static') element.style.position = 'relative';
	const parsedStartSize = cssSize(startSize);
	const parsedEndSize = endSize
		? cssSize(endSize)
		: Math.max(parseInt(style.height), parseInt(style.width)) * 3 + 'px';
	element.style.setProperty(RIPPLE_GLOBALS.END_SIZE, parsedEndSize);
	element.style.setProperty(RIPPLE_GLOBALS.END_COLOR, endColor ? endColor : startColor);

	let ripple: HTMLElement;

	/**
	 * Create ripple.
	 */
	function createRipple(e: MouseEvent) {
		// console.log('creating ripple!');
		const rect = element.getBoundingClientRect();
		const eRelX = e.clientX - rect.left;
		const eRelY = e.clientY - rect.top;
		const dX = Math.max(eRelX, rect.width - eRelX);
		const dY = Math.max(eRelY, rect.height - eRelY);
		const updatedEndsize = endSize ? cssSize(endSize) : Math.hypot(dX, dY) * 2 + 'px';
		element.style.setProperty(RIPPLE_GLOBALS.END_SIZE, updatedEndsize);
		ripple = document.createElement('div');
		ripple.style.userSelect = 'none';
		ripple.style.pointerEvents = 'none';
		ripple.style.position = 'absolute';
		ripple.style.opacity = opacity + '';
		ripple.style.backgroundColor = startColor;
		ripple.style.width = parsedStartSize;
		ripple.style.height = parsedStartSize;
		ripple.style.borderRadius = '50%';
		ripple.style.transform = 'translate(-50%, -50%)';
		ripple.style.top = eRelY + 'px';
		ripple.style.left = eRelX + 'px';
		ripple.style.filter = `blur(${blur}px)`;
		ripple.style.animation = `${RIPPLE_GLOBALS.SPREAD_ANIMATION} ${spreadDuration}ms cubic-bezier(0, 0, 0, 1) forwards`;
		element.appendChild(ripple);
	}

	/**
	 * Clear ripple.
	 */
	function clearRipple() {
		const r = ripple;
		if (r) {
			r.style.animation =
				r.style.animation +
				`, ${RIPPLE_GLOBALS.FADE_ANIMATION} ${fadeDuration}ms ease-in-out ${fadeDelay}ms forwards`;
			r.onanimationend = (e) => {
				if (e.animationName === RIPPLE_GLOBALS.FADE_ANIMATION) {
					r.remove();
				}
			};
		}
	}

	function setListeners() {
		controlElement.addEventListener('pointerdown', createRipple);
		controlElement.addEventListener('pointerleave', clearRipple);
		controlElement.addEventListener('pointerup', clearRipple);
		controlElement.addEventListener('pointercancel', clearRipple);
	}

	function clearListeners() {
		controlElement.removeEventListener('pointerdown', createRipple);
		controlElement.removeEventListener('pointerleave', clearRipple);
		controlElement.removeEventListener('pointerup', clearRipple);
		controlElement.removeEventListener('pointercancel', clearRipple);
	}

	if (!disabled) {
		setListeners();
	}

	return {
		update(newParams: RippleOptions) {
			// console.log(newParams.controlElement != controlElement);
			if (disabled !== newParams.disabled) {
				disabled = newParams.disabled;
				if (!newParams.disabled) {
					clearListeners();
					controlElement = newParams.controlElement;

					setListeners();
				}
			} else if (newParams.controlElement != controlElement) {
				clearListeners();
				controlElement = newParams.controlElement;
				setListeners();
			}
		},
		destroy() {
			clearListeners();
		},
	};
}

function createRippleStylesheet() {
	const sheet = document.createElement('style');
	sheet.setAttribute('type', 'text/css');
	sheet.setAttribute(RIPPLE_GLOBALS.SHEET_ATTRIBUTE, '');
	sheet.textContent = `
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
