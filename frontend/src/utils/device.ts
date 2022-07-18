/**
 * Determine if a scroll event pertains to a mouse input or a touchpad.
 *
 * Credits: Lauri, https://stackoverflow.com/questions/10744645/detect-touchpad-vs-mouse-in-javascript.
 */
export function isTouchpad(e: WheelEvent) {
	return e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0;
}
