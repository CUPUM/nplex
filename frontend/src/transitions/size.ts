/** Transition to affect both width and height of element */

interface SizeTransitionOptions {
	opacity: number;
	width: number | string; // Math.min(removeUnit(width) || width(number) * rect.width, element.rect.width)
	height: number | string; // idem...
}
