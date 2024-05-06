/**
 * Compose a CSS background's string value for mesh gradients simulation.
 */
export function composeMeshgradient({
	colors = 'var(--color-primary-500)',
	nodes = [3, 7],
	spread = [40, 110],
	padding = -20,
	random = Math.random,
	opacity = 1,
}: {
	colors?: string | string[];
	nodes?: number | [min: number, max: number];
	spread?: number | [min: number, max: number];
	opacity?: number | [min: number, max: number];
	padding?: number;
	random?: typeof Math.random;
} = {}) {
	const nodesMin = typeof nodes === 'number' ? nodes : Math.min(...nodes);
	const nodesMax = typeof nodes === 'number' ? nodes : Math.max(...nodes);
	const nodesD = nodesMax - nodesMin;
	if (typeof colors === 'string') {
		const n = Math.round(random() * nodesD) + nodesMin;
		colors = Array(n).fill(colors);
	}
	const spreadMin = typeof spread === 'number' ? spread : Math.min(...spread);
	const spreadMax = typeof spread === 'number' ? spread : Math.max(...spread);
	const spreadD = spreadMax - spreadMin;
	const area = 100 + -2 * padding;
	return colors
		.map((c) => {
			const o =
				typeof opacity === 'number'
					? opacity
					: Math.min(Math.max(opacity[0], Math.random()), opacity[1]);
			const faded = opacity === 1 ? c : `color-mix(in srgb, ${c} ${o * 100}%, transparent)`;
			const x = (random() * area + padding).toFixed(1);
			const y = (random() * area + padding).toFixed(1);
			const spread = (spreadMin + random() * spreadD).toFixed(1);
			return `radial-gradient(circle at ${x}% ${y}%, ${faded} 0px, transparent ${spread}%)`;
		})
		.join(', ');
}

export type MeshGradientParams = Parameters<typeof composeMeshgradient>[0];
