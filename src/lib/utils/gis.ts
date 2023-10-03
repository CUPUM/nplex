export type CoordinateBase = [longitude: number, latitude: number];

export type Coordinate<T extends { z?: boolean; m?: boolean } = { z: false; m: false }> =
	T extends { z: true; m: true }
		? [...CoordinateBase, altitude: number, m: number]
		: T extends { z: true }
		? [...CoordinateBase, altitude: number]
		: T extends { m: true }
		? [...CoordinateBase, m: number]
		: CoordinateBase;
