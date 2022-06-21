<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { cssSize } from '$utils/helpers/css';
	import { onDestroy, onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let message: string;
	export let open: boolean = false;
	export let useHover: boolean = true;
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'top';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'center';
	const distance = 10;

	let controlRef: HTMLElement;
	let hinterRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y;
	let x;
	let w;
	let h;

	$: if (controlRef) {
		// Clearing any potential previously set listeners (useful for when this setup is re-run due to useHover state change).
		controlRef.removeEventListener('click', show);
		controlRef.removeEventListener('mouseenter', show);
		controlRef.removeEventListener('mouseleave', hide);
		hinterRef.removeEventListener('mouseenter', show);
		hinterRef.removeEventListener('mouseleave', hide);
		// Binding the proper events on the control element.
		controlRef.addEventListener(useHover ? 'mouseenter' : 'click', show);
		controlRef.addEventListener(useHover ? 'mouseleave' : 'clickoutside', hide);
		if (useHover) {
			hinterRef.addEventListener('mouseenter', show);
			hinterRef.addEventListener('mouseleave', hide);
		}
		// Listening to disposition changes.
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
		// Referencing the element passed in the "control" slot.
		controlRef = hinterRef.previousElementSibling as HTMLElement;
		// Setting the initial position.
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
			in:scale={{ start: 0.5, easing: expoOut, duration: 100 }}
			out:scale={{ start: 0.8, easing: expoIn, duration: 50 }}
		>
			{message}
			<svg viewBox="0 0 100 100" preserveAspectRatio="xmidYMid">
				<path d="M 0,-1 C 25,0 35,60 50,60 C 75,60 75,0 100,-1 Z" />
			</svg>
		</span>
	{/if}
</div>

<style lang="postcss">
	.hinter {
		z-index: 1000;
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

	span {
		display: block;
		flex: none;
		position: absolute;
		white-space: nowrap;
		font-size: var(--size-small);
		font-weight: 400;
		padding: 0.5em 1.2em 0.7em 1.2em;
		margin: 0;
		background-color: var(--color-dark-900);
		color: var(--color-light-300);
		box-shadow: 0 0.5em 1.5em -1em rgba(var(--rgb-dark-900), 1);
		border-radius: 1em;
		opacity: 0.75;
	}

	svg {
		position: absolute;
		height: 0.8em;
		width: 0.8em;
		padding: 0;
		margin: 0;
		background-color: transparent;
		overflow: visible;
	}

	path {
		fill: var(--color-dark-900);
	}

	.top {
		top: var(--y);
		left: var(--x);
		width: var(--w);

		& span {
			transform-origin: center bottom;
			bottom: var(--distance);
		}

		& svg {
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 100%);
		}

		&.start {
			justify-content: flex-start;

			& span {
				transform-origin: left bottom;
			}
		}

		&.end {
			justify-content: flex-end;

			& span {
				transform-origin: right bottom;
			}
		}
	}

	.bottom {
		top: calc(var(--y) + var(--h));
		left: var(--x);
		width: var(--w);

		& span {
			transform-origin: center top;
			top: var(--distance);
		}

		& svg {
			top: 0;
			left: 50%;
			transform: translate(-50%, -100%) rotate(180deg);
		}

		&.start {
			justify-content: flex-start;

			& span {
				transform-origin: left top;
			}
		}

		&.end {
			justify-content: flex-end;

			& span {
				transform-origin: right top;
			}
		}
	}

	.right {
		top: var(--y);
		left: calc(var(--x) + var(--w));
		height: var(--h);

		& span {
			transform-origin: left center;
			left: var(--distance);
		}

		& svg {
			left: 0;
			top: 50%;
			transform: translate(-100%, -50%) rotate(90deg);
		}

		&.start {
			align-items: flex-start;

			& span {
				transform-origin: left top;
			}
		}

		&.end {
			align-items: flex-end;

			& span {
				transform-origin: left bottom;
			}
		}
	}

	.left {
		top: var(--y);
		left: var(--x);
		height: var(--h);

		& span {
			transform-origin: right center;
			right: var(--distance);
		}

		& svg {
			right: 0;
			top: 50%;
			transform: translate(100%, -50%) rotate(-90deg);
		}

		&.start {
			align-items: flex-start;

			& span {
				transform-origin: right top;
			}
		}

		&.end {
			align-items: flex-end;

			& span {
				transform-origin: right bottom;
			}
		}
	}
</style>
