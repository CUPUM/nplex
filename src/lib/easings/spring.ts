const s = 1.1; // 1.70158;

export function springInOut(t: number) {
	const _s = s * 1.525;
	if ((t *= 2) < 1) {
		return 0.5 * (t * t * ((_s + 1) * t - _s));
	}
	return 0.5 * ((t -= 2) * t * ((_s + 1) * t + _s) + 2);
}

export function springIn(t: number) {
	return t * t * ((s + 1) * t - s);
}

export function springOut(t: number) {
	return --t * t * ((s + 1) * t + s) + 1;
}
