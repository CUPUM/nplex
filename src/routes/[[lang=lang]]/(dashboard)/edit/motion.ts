import { flip } from 'svelte/animate';
import { expoOut } from 'svelte/easing';
import { fly, scale } from 'svelte/transition';

export function descriptorIn(node: HTMLElement, { i }: { i: number }) {
	return fly(node, { y: -6, delay: i * 25, easing: expoOut, duration: 350 });
}

export function descriptorOut(node: HTMLElement) {
	return scale(node, { start: 0.95, duration: 250, easing: expoOut });
}

export function descriptorFlip(node: HTMLElement, { from, to }: { from: DOMRect; to: DOMRect }) {
	return flip(node, { from, to }, { duration: (l) => 150 + l / 10 });
}
