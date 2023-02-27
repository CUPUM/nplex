/**
 * @returns Array of hypothenuses between given reference point and given box's corners. Distances
 *   are ordered clockwise starting from top-left.
 */
export function getBoxDistances(
	point: [x: number, y: number],
	box: { width: number; height: number }
): [topleft: number, topright: number, bottomright: number, bottomleft: number] {
	const px = box.width - point[0];
	const py = box.height - point[1];
	return [
		Math.hypot(point[0], point[1]),
		Math.hypot(px, point[1]),
		Math.hypot(px, py),
		Math.hypot(point[0], py),
	];
}
