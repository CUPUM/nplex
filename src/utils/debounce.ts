export function debounce(f: (...args) => unknown, delay = 250) {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			f(...args);
		}, delay);
	}
}