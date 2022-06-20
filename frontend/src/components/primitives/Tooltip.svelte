<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { cssSize, type SizeInput } from '$utils/helpers/css';
	import { onDestroy, onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let message: string;
	export let open: boolean = false;
	export let useHover: boolean = true;
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'center';
	export let distance: SizeInput = 10;

	let controlRef: HTMLElement;
	let hinterRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y;
	let x;
	let w;
	let h;

	$: if (controlRef) {
		console.log('running setup');
		/**
		 * Clearing any potential previously set listeners (useful for when this setup is re-run due to useHover state change).
		 */
		controlRef.removeEventListener('click', show);
		controlRef.removeEventListener('mouseenter', show);
		controlRef.removeEventListener('mouseleave', hide);
		hinterRef.removeEventListener('mouseenter', show);
		hinterRef.removeEventListener('mouseleave', hide);
		/** Binding the proper events on the control element. */
		controlRef.addEventListener(useHover ? 'mouseenter' : 'click', show);
		controlRef.addEventListener(useHover ? 'mouseleave' : 'clickoutside', hide);
		if (useHover) {
			hinterRef.addEventListener('mouseenter', show);
			hinterRef.addEventListener('mouseleave', hide);
		}
		/**
		 * Listening to disposition changes
		 */
		controlRef.ontransitionend = setPosition;
		mutationObs = new MutationObserver(setPosition);
		resizeObs = new ResizeObserver(setPosition);
		mutationObs.observe(controlRef, { attributes: true });
		mutationObs.observe(controlRef.offsetParent, { attributes: true });
		resizeObs.observe(controlRef, {});
		resizeObs.observe(controlRef.offsetParent, {});
	}

	$: if (open) {
		setPosition();
	}

	function show() {
		open = true;
	}

	function hide() {
		open = false;
	}

	function handleClickoutside() {
		if (!useHover) {
			open = false;
		}
	}

	function setPosition() {
		if (controlRef) {
			y = controlRef.offsetTop + 'px';
			x = controlRef.offsetLeft + 'px';
			w = controlRef.offsetWidth + 'px';
			h = controlRef.offsetHeight + 'px';
		}
	}

	onMount(() => {
		/**
		 * Referencing the element passed in the "control" slot.
		 */
		controlRef = hinterRef.previousElementSibling as HTMLElement;
		/**
		 * Setting the initial position.
		 */
		setPosition();
	});

	onDestroy(() => {
		mutationObs?.disconnect();
		resizeObs?.disconnect();
	});
</script>

<slot>
	<span>Fallback tooltip host</span>
</slot>
<div
	class="hinter {placement} {align}"
	bind:this={hinterRef}
	use:clickoutside
	on:clickoutside={handleClickoutside}
	style:--y={y}
	style:--x={x}
	style:--w={w}
	style:--h={h}
	style:--distance={cssSize(distance)}
>
	{#if open}
		<span
			class="tooltip"
			in:scale={{ start: 0.5, easing: expoOut, duration: 150 }}
			out:scale={{ start: 1.1, easing: expoIn, duration: 50 }}
		>
			{message}
		</span>
	{/if}
</div>

<style lang="postcss">
	.hinter {
		pointer-events: none;
		user-select: none;
		position: absolute;
		background-color: transparent;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		overflow: visible;
	}

	.top {
		top: var(--y);
		left: var(--x);
		width: var(--w);

		& .outer {
			transform-origin: center bottom;
			bottom: 0;
			padding-bottom: var(--distance);
		}

		&.start {
			justify-content: flex-start;

			& .outer {
				transform-origin: left bottom;
			}
		}

		&.end {
			justify-content: flex-end;

			& .outer {
				transform-origin: right bottom;
			}
		}
	}

	.bottom {
		top: calc(var(--y) + var(--h));
		left: var(--x);
		width: var(--w);

		& .outer {
			transform-origin: center top;
			top: 0;
			padding-top: var(--distance);
		}

		&.start {
			justify-content: flex-start;

			& .outer {
				transform-origin: left top;
			}
		}

		&.end {
			justify-content: flex-end;

			& .outer {
				transform-origin: right top;
			}
		}
	}

	.right {
		top: var(--y);
		left: calc(var(--x) + var(--w));
		height: var(--h);

		& .outer {
			transform-origin: left center;
			left: 0;
			padding-left: var(--distance);
		}

		&.start {
			align-items: flex-start;

			& .outer {
				transform-origin: left top;
			}
		}

		&.end {
			align-items: flex-end;

			& .outer {
				transform-origin: left bottom;
			}
		}
	}

	.left {
		top: var(--y);
		left: var(--x);
		height: var(--h);

		& .outer {
			transform-origin: right center;
			right: 0;
			padding-right: var(--distance);
		}

		&.start {
			align-items: flex-start;

			& .outer {
				transform-origin: right top;
			}
		}

		&.end {
			align-items: flex-end;

			& .outer {
				transform-origin: right bottom;
			}
		}
	}

	.tooltip {
		font-size: var(--size-small);
		font-weight: 300;
		position: relative;
		padding: 0.4em 1em 0.6em 1em;
		background-color: rgba(var(--rgb-dark-500), 0.9);
		backdrop-filter: blur(12px);
		color: var(--color-light-100);
		box-shadow: 0 1em 2em -1em rgba(var(--rgb-dark-900), 0.25);
		border-radius: 1.2em;
		display: block;
	}
</style>
