<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { onDestroy, onMount } from 'svelte';
	import { bounceOut, expoInOut, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let active: boolean = false;
	/* To do: Preferred position, should be adjusted automatically if doesn't fit in viewport */
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' = 'center';
	export let distance: number = 5;

	let controlRef: HTMLElement;
	let popoverRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y;
	let x;
	let w;
	let h;

	$: if (active) {
		setPlace();
	}

	function setPlace() {
		if (controlRef) {
			y = controlRef.offsetTop + 'px';
			x = controlRef.offsetLeft + 'px';
			w = controlRef.offsetWidth + 'px';
			h = controlRef.offsetHeight + 'px';
		}
	}

	onMount(() => {
		controlRef = popoverRef.previousElementSibling as HTMLElement;
		setPlace();
		controlRef.ontransitionend = setPlace;
		mutationObs = new MutationObserver(setPlace);
		resizeObs = new ResizeObserver(setPlace);
		mutationObs.observe(controlRef, { attributes: true });
		mutationObs.observe(controlRef.offsetParent, { attributes: true });
		resizeObs.observe(controlRef, {});
		resizeObs.observe(controlRef.offsetParent, {});
	});

	onDestroy(() => {
		mutationObs?.disconnect();
		resizeObs?.disconnect();
	});
</script>

<slot name="control" />
<div
	class="placer {placement} {align}"
	bind:this={popoverRef}
	use:clickoutside
	on:clickoutside={() => (active = false)}
	style:--y={y}
	style:--x={x}
	style:--w={w}
	style:--h={h}
	style:--distance="{distance}px"
>
	{#if active}
		<div class="popover" {...$$restProps} transition:scale={{ start: 0.8, easing: expoInOut, duration: 200 }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.placer {
		pointer-events: none;
		user-select: none;
		position: absolute;
		height: 0;
		width: 0;
		background-color: transparent;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.popover {
		pointer-events: all;
		user-select: initial;
		z-index: 100;
		position: absolute;
		padding: 0.25em;
		background-color: var(--color-light-100);
		box-shadow: 0 1em 2em -2em black;
		border-radius: 1.1em;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.top {
		top: var(--y);
		left: var(--x);
		width: var(--w);

		& .popover {
			transform-origin: center bottom;
			bottom: var(--distance);
		}

		&.start {
			justify-content: flex-start;

			& .popover {
				transform-origin: left bottom;
			}
		}

		&.end {
			justify-content: flex-end;

			& .popover {
				transform-origin: right bottom;
			}
		}
	}

	.bottom {
		top: calc(var(--y) + var(--h));
		left: var(--x);
		width: var(--w);

		& .popover {
			transform-origin: center top;
			top: var(--distance);
		}

		&.start {
			justify-content: flex-start;

			& .popover {
				transform-origin: left top;
			}
		}

		&.end {
			justify-content: flex-end;

			& .popover {
				transform-origin: right top;
			}
		}
	}

	.right {
		top: var(--y);
		left: calc(var(--x) + var(--w));
		height: var(--h);

		& .popover {
			transform-origin: left center;
			left: var(--distance);
		}

		&.start {
			align-items: flex-start;

			& .popover {
				transform-origin: left top;
			}
		}

		&.end {
			align-items: flex-end;

			& .popover {
				transform-origin: left bottom;
			}
		}
	}

	.left {
		top: var(--y);
		left: var(--x);
		height: var(--h);

		& .popover {
			transform-origin: right center;
			right: var(--distance);
		}

		&.start {
			align-items: flex-start;

			& .popover {
				transform-origin: right top;
			}
		}

		&.end {
			align-items: flex-end;

			& .popover {
				transform-origin: right bottom;
			}
		}
	}
</style>
