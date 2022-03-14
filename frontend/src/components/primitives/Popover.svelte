<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';
	import { onDestroy, onMount } from 'svelte';
	import { bounceOut, expoInOut, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let active: boolean = false;
	/* To do: Preferred position, should be adjusted automatically if doesn't fit in viewport */
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

	let controlRef: HTMLElement;
	let popoverRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y;
	let x;

	function setPosition() {
		y = controlRef?.offsetTop + controlRef?.offsetHeight / 2 + 'px';
		x = controlRef?.offsetLeft + controlRef?.offsetWidth / 2 + 'px';
	}

	onMount(() => {
		controlRef = popoverRef.previousElementSibling as HTMLElement;
		setPosition();
		controlRef.ontransitionend = setPosition;
		mutationObs = new MutationObserver(() => {
			setPosition();
		});
		resizeObs = new ResizeObserver(() => {
			setPosition();
		});
		mutationObs.observe(controlRef, {});
		mutationObs.observe(controlRef.offsetParent, {});
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
	class="placer"
	bind:this={popoverRef}
	use:clickoutside
	on:clickoutside={() => (active = false)}
	style:top={y}
	style:left={x}
>
	{#if active}
		<div class="popover {position}" {...$$restProps} transition:scale={{ easing: expoInOut, duration: 200 }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.placer {
		pointer-events: none;
		user-select: none;
		position: absolute;
		width: 2px;
		height: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: red;
	}

	.popover {
		pointer-events: all;
		user-select: initial;
		z-index: 100;
		position: relative;
		left: 0;

		/* &.top {
			bottom: 100%;
			margin-bottom: var(--distance);
			transform-origin: bottom center;
		}

		&.bottom {
			top: 100%;
			margin-top: var(--distance);
			transform-origin: top center;
		} */

		&.right {
		}

		&.left {
		}
	}
</style>
