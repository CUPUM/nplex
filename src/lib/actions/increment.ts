import type { Action } from 'svelte/action';

type IncrementOptions = { step?: number; target: HTMLInputElement };

function handleIncrement({ step, target }: Required<IncrementOptions>) {
	if (step >= 0) {
		target.stepUp(Math.abs(step));
	} else {
		target.stepDown(Math.abs(step));
	}
}

/**
 * Increment or decrement a peer input on click.
 */
export const increment: Action<HTMLButtonElement, IncrementOptions> = (node, { step, target }) => {
	function handleClick(e: MouseEvent) {
		if (step != null) {
			handleIncrement({ step, target });
		} else {
			// Main difference with decrement action
			target.stepUp();
		}
		target.dispatchEvent(new Event('input'));
		return e;
	}

	node.addEventListener('click', handleClick);

	return {
		update(newParams) {
			target = newParams.target;
			step = newParams.step;
		},
		destroy() {},
	};
};

/**
 * Increment or decrement a peer input on click.
 */
export const decrement: Action<HTMLButtonElement, IncrementOptions> = (node, { step, target }) => {
	function handleClick(e: MouseEvent) {
		if (step != null) {
			handleIncrement({ step: step * -1, target });
		} else {
			// Main difference with increment action
			target.stepDown();
		}
		target.dispatchEvent(new Event('input'));
		return e;
	}

	node.addEventListener('click', handleClick);

	return {
		update(newParams) {
			target = newParams.target;
			step = newParams.step;
		},
		destroy() {},
	};
};
