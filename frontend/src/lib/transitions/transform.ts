import { cubicOut } from 'svelte/easing';

/**
 * Custom transition similar to fly or scale, but with possibilities of combining transforms.
 */
export function transform(
	element: Element,
	{
		delay = 0,
		duration = 350,
		easing = cubicOut,
		opacity = 0,
		scale = 1,
		translateX = 0,
		translateY = 0,
		translateZ = 0,
		rotateX = 0,
		rotateY = 0,
		rotateZ = 0,
	} = {}
) {
	const style = getComputedStyle(element);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const sd = 1 - scale;
	const txd = 0 - translateX;
	const tyd = 0 - translateY;
	const tzd = 0 - translateZ;
	const rxd = 0 - rotateX;
	const ryd = 0 - rotateY;
	const rzd = 0 - rotateZ;
	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			return `
			opacity: ${target_opacity - od * u};
			transform: ${transform} scale(${1 - sd * u}) translate3d(${u * translateX}px, ${u * translateY}px, ${
				u * translateZ
			}px) rotateX(${u * rotateX}deg) rotateY(${u * rotateY}deg) rotateZ(${u * rotateZ}deg);
		`;
		},
	};
}
