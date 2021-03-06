<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { cssSize, type SizeInput } from '$utils/css';
	import { onDestroy, onMount } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let open: boolean = false;
	export let useHover: boolean = false;
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'center';
	export let distance: SizeInput = 5;

	let controlRef: HTMLElement;
	let popoverRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y;
	let x;
	let w;
	let h;
	let autoAlign;
	let autoPlacement;
	let timer;

	/** To do: Preferred position, should be adjusted automatically if doesn't fit in viewport */
	// $: autoAlign = ...
	// $: autoPlacement = ...

	$: if (controlRef) {
		// Clearing any potential previously set listeners (useful for when this setup is re-run due to useHover state change).
		controlRef.removeEventListener('click', show);
		controlRef.removeEventListener('mouseenter', show);
		controlRef.removeEventListener('mouseleave', hide);
		popoverRef.removeEventListener('mouseenter', show);
		popoverRef.removeEventListener('mouseleave', hide);
		// Binding the proper events on the control element.
		controlRef.addEventListener(useHover ? 'mouseenter' : 'click', show);
		controlRef.addEventListener(useHover ? 'mouseleave' : 'clickoutside', hide);
		if (useHover) {
			popoverRef.addEventListener('mouseenter', show);
			popoverRef.addEventListener('mouseleave', hide);
		}
		// Listening to disposition changes
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
		controlRef?.setAttribute('popover', 'open');
	} else {
		controlRef?.setAttribute('popover', 'closed');
	}

	function show() {
		if (timer) {
			clearTimeout(timer);
		}
		open = true;
	}

	function hide() {
		if (useHover) {
			timer = setTimeout(() => {
				open = false;
			}, 5);
		} else {
			open = false;
		}
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
		controlRef = popoverRef.previousElementSibling as HTMLElement;
		// Setting the initial position.
		setPosition();
	});

	onDestroy(() => {
		mutationObs?.disconnect();
		resizeObs?.disconnect();
	});
</script>

<slot name="control">
	<button style="padding: 1em; display: inline-block; position: relative;">Fallback popover control</button>
</slot>
<div
	class="hinter {placement} {align}"
	bind:this={popoverRef}
	use:clickoutside
	on:clickoutside={handleClickoutside}
	style:--y={y}
	style:--x={x}
	style:--w={w}
	style:--h={h}
	style:--distance={cssSize(distance)}
>
	{#if open}
		<div
			class="outer"
			in:scale={{ start: 0.5, easing: expoOut, duration: 150, opacity: 0 }}
			out:scale={{ start: 0.9, easing: expoIn, duration: 50, opacity: 0 }}
		>
			<div class="inner" {...$$restProps}>
				<slot />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
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

	.outer {
		display: block;
		flex-shrink: 0;
		width: auto;
		pointer-events: all;
		user-select: initial;
		z-index: 100;
		position: relative;
		padding: 0;
		margin: 0;
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

	.inner {
		position: relative;
		padding: 1rem;
		background-color: white;
		box-shadow: 0 1rem 3rem -2rem rgba(var(--rgb-dark-900), 0.25);
		border-radius: 1.5rem;
		display: inline-flex;
		flex-direction: column;
	}
</style>
