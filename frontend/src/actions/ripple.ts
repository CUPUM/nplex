import { parseCSSValue } from '$utils/helpers/strings';

const RIPPLE_GLOBALS = {
	HOST_ATTRIBUTE: 'ripple-host',
	SHEET_ATTRIBUTE: 'ripple-keyframes',
	SPREAD_ANIMATION: 'ripple-spread',
	FADE_ANIMATION: 'ripple-fade',
	PRESS_ANIMATION: 'ripple-host-press',
	END_SIZE: '--ripple-end-size',
	END_COLOR: '--ripple-end-color'
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
	blur?: number;
	disabled?: boolean;
}

/**
 * Action to add ripple effect on host element, triggered on click event.
 */
export function ripple(element: HTMLElement, {
	spreadDuration = 350,
	fadeDuration = 500,
	fadeDelay = 50,
	opacity = .2,
	startColor = 'currentColor',
	startSize = 0,
	endSize = undefined,
	endColor = undefined,
	blur = 2,
	disabled = false
}: RippleOptions = {}) {

	/**
	 * Create the stylesheet defining the ripple transitions
	 */
	if (!document.head.querySelector(`[${RIPPLE_GLOBALS.SHEET_ATTRIBUTE}]`)) {
		createRippleStylesheet();
	}
	
	/**
	 * Prepare the host element
	 */
	const style = getComputedStyle(element);
	element.setAttribute(RIPPLE_GLOBALS.HOST_ATTRIBUTE, '');
	element.style.overflow = 'hidden';
	if (!element.style.transformOrigin) element.style.transformOrigin = 'center center';
	if (style.position === 'static') element.style.position = 'relative';
	const parsedStartSize = startSize + (parseCSSValue(startSize).unit ? '' : 'px');
	const parsedEndSize = endSize ? endSize + (parseCSSValue(endSize).unit ? '' : 'px') : Math.max(element.clientHeight, element.clientWidth) * 2 + 'px';
	element.style.setProperty(RIPPLE_GLOBALS.END_SIZE, parsedEndSize);
	element.style.setProperty(RIPPLE_GLOBALS.END_COLOR, endColor ? endColor : startColor);

	let ripple: HTMLElement;

	/**
	 * Create ripple fn
	 */
	function createRipple(e: MouseEvent) {
		const rect = element.getBoundingClientRect();
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
		ripple.style.top = e.clientY - rect.top + 'px';
		ripple.style.left = e.clientX - rect.left + 'px';
		ripple.style.filter = `blur(${blur}px)`;
		ripple.style.animation = `${RIPPLE_GLOBALS.SPREAD_ANIMATION} ${spreadDuration}ms cubic-bezier(0, 0, 0, 1) forwards`;
		element.appendChild(ripple);
	}

	/**
	 * Clear ripple fn
	 */
	function clearRipple() {
		const r = ripple;
		if (r) {
			r.style.animation = r.style.animation + `, ${RIPPLE_GLOBALS.FADE_ANIMATION} ${fadeDuration}ms ease-in-out ${fadeDelay}ms forwards`
			r.onanimationend = ((e) => {
				if (e.animationName === RIPPLE_GLOBALS.FADE_ANIMATION) {
					r.remove();
				}
			});
		}
	}

	function setListeners() {
		element.addEventListener('pointerdown', createRipple);
		element.addEventListener('pointerleave', clearRipple);
		element.addEventListener('pointerup', clearRipple);
	}

	if (!disabled) {
		setListeners();
	}

	return {
		update(newParams: RippleOptions) {
			if (disabled && !newParams.disabled) {
				disabled = newParams.disabled;
				setListeners();
			}
		},
		destroy() {
			element.removeEventListener('pointerdown', createRipple);
			element.removeEventListener('pointerleave', clearRipple);
			element.removeEventListener('pointerup', clearRipple);
		}
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