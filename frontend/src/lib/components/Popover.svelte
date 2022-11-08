<script lang="ts" context="module">
	let latestOpen: HTMLElement | null = null;
</script>

<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { afterNavigate } from '$app/navigation';
	import { cssSize } from '$utils/css';
	import { onDestroy, onMount, tick } from 'svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let open: boolean = false;
	export let useHover: boolean = false;
	export let place: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'center';
	export let distance: string | number = 5;
	export let closeOnNav: boolean = true;

	let controlRef: HTMLElement;
	let popoverRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y: number;
	let x: number;
	let w: number;
	let h: number;
	let timer: any;
	// let autoAlign;
	// let autoPlacement;

	/**
	 * To do: Preferred position, should be adjusted automatically if doesn't fit in viewport.
	 */
	// $: autoAlign = ...
	// $: autoPlacement = ...

	$: if (controlRef) {
		// Clearing any potential previously set listeners (useful for when this setup is re-run due to useHover state change).
		controlRef.removeEventListener('click', show);
		controlRef.removeEventListener('mouseenter', show);
		controlRef.removeEventListener('mouseleave', hide);
		// Binding the proper events on the control element.
		controlRef.addEventListener(useHover ? 'mouseenter' : 'click', show);
		controlRef.addEventListener(useHover ? 'mouseleave' : 'clickoutside', hide);
		// Listening to disposition changes
		controlRef.ontransitionend = setPosition;
		mutationObs = new MutationObserver(setPosition);
		resizeObs = new ResizeObserver(setPosition);
		mutationObs.observe(controlRef, { attributes: true });
		resizeObs.observe(controlRef, {});
		if (controlRef.offsetParent) {
			mutationObs.observe(controlRef.offsetParent, { attributes: true });
			resizeObs.observe(controlRef.offsetParent, {});
		}
	}

	$: if (open) {
		setPosition();
		controlRef?.classList.add('active');
	} else {
		controlRef?.classList.remove('active');
	}

	function show(e?: MouseEvent) {
		if (!e || (e.type === 'mouseenter' && useHover)) {
			latestOpen = popoverRef;
			clearTimeout(timer);
			open = true;
		}
	}

	function hide(e?: Event) {
		if (!e) open = false;
		else if (e.type === 'mouseleave' && useHover) {
			timer = setTimeout(() => {
				open = false;
			}, 25);
		}
	}

	function handleClickoutside() {
		if (!useHover) {
			open = false;
		}
	}

	function setPosition() {
		if (controlRef) {
			y = controlRef.offsetTop;
			x = controlRef.offsetLeft;
			w = controlRef.offsetWidth;
			h = controlRef.offsetHeight;
		}
	}

	afterNavigate(async () => {
		if (closeOnNav) {
			// Awaiting a tick avoids conflict with other navigation-related logic (ex.: button loading state check).
			await tick();
			hide();
		}
	});

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

<slot name="control" />
<div
	class="hinter {place} {align}"
	bind:this={popoverRef}
	use:clickoutside
	on:clickoutside={handleClickoutside}
	on:mouseenter={show}
	on:mouseleave={hide}
	style:--y="{y}px"
	style:--x="{x}px"
	style:--w="{w}px"
	style:--h="{h}px"
	style:--distance={cssSize(distance)}
>
	{#if open}
		<div
			class="outer"
			in:scale={{ start: 0.5, easing: expoOut, duration: 150, opacity: 0 }}
			out:scale={{ start: 0.75, easing: expoIn, duration: latestOpen === popoverRef ? 100 : 0, opacity: 0 }}
		>
			{#if $$slots.default}
				<div class="inner" {...$$restProps}>
					<slot />
				</div>
			{/if}
			<slot name="inner" />
		</div>
	{/if}
</div>

<style lang="scss">
	.hinter {
		pointer-events: none;
		user-select: none;
		position: absolute;
		background: transparent;
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
		padding: 0.5rem;
		background: var(--color-base-000);
		box-shadow: 0 1rem 3rem -2rem rgba(0, 0, 0, 0.2);
		border-radius: 1.1rem;
		display: inline-flex;
		flex-direction: column;
	}
</style>
