/**
 * Nplex-themed primitive shapes.
 */
type SvgPrimitiveShape = 'rect' | 'triangle' | 'circle' | 'arch';

export class SvgPrimitive<S extends SvgPrimitiveShape> {
	// shape

	constructor(init: { shape: S; size: number; rounding: number }) {
		// this.d = '';
	}

	setRounding() {
		// return new d path
	}

	setSize() {
		// reutrn new d path
	}
}

export function makeRandomSvgPrimitives(
	count: number,
	shapes: SvgPrimitiveShape[] = ['arch', 'circle', 'rect', 'triangle'],
	rounding: [min: number, max: number] = [0, 0.1]
) {}
