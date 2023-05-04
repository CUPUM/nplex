<!-- 
	@component
	Attaches a tooltip element to the last HTML element passed through the component's default slot.

 -->
<svelte:options accessors={true} />

<script lang="ts" context="module">
	const ANGLE = 60;
	let DELAY = 250;

	let latest: {} | null = null;
</script>

<script lang="ts">
	import { transform } from '$motion/transitions/transform';
	import { THEMES, type ThemeName } from '$utils/themes';
	import { tick, type ComponentProps } from 'svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Tether from './Tether/Tether.svelte';
	import Tip from './Tip.svelte';

	export let message: string | undefined | null = null;
	export let theme: ThemeName = THEMES.dark;
	export let selectable: boolean = false;
	export let disabled: ComponentProps<Tether>['disabled'] = undefined;
	export let opened: ComponentProps<Tether>['opened'] = false;
	export let place: ComponentProps<Tether>['place'] = 'top';
	export let align: ComponentProps<Tether>['align'] = 'center';
	export let distance: ComponentProps<Tether>['distance'] = '5px';

	const key = {};

	let timeout: any;

	$: rotateX = place === 'top' ? ANGLE : place === 'bottom' ? -ANGLE : 0;
	$: rotateY = place === 'right' ? ANGLE : place === 'left' ? -ANGLE : 0;

	async function handleOpen() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		await tick();
		latest = key;
	}

	function handleClose() {
		timeout = setTimeout(() => {
			if (latest === key) {
				latest = null;
				timeout = undefined;
			}
		}, 350);
	}
</script>

<Tether
	bind:opened
	{place}
	{align}
	{distance}
	useClick={false}
	{disabled}
	on:open={handleOpen}
	on:close={handleClose}
>
	<svelte:fragment slot="anchor">
		<slot {opened} />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div
			class:selectable
			data-theme={theme}
			class="tooltip {place} {align}"
			in:transform={{
				rotateX,
				rotateY,
				easing: expoOut,
				duration: 150,
				opacity: 0,
				delay: latest ? 0 : DELAY,
			}}
			out:scale|local={{ start: 0.95, easing: cubicIn, duration: 150, opacity: 0 }}
		>
			<div class="tooltip-content">
				<slot name="message" {opened}>
					{@html message}
				</slot>
			</div>
			<Tip class="tooltip-tip" />
		</div>
	</svelte:fragment>
</Tether>

<style lang="scss">
	.tooltip {
		--tooltip-background: #{col(bg, 100, 0.94)};
		--tip-pad: calc(0.5 * var(--tether-w));
		--tip-size: 1em;
		user-select: none;
		pointer-events: none;
		position: relative;
		flex: none;
		align-items: center;
		display: flex;
		font-size: var(--ui-text-sm);
		transform-origin: inherit;
		z-index: 999;

		:global(.tooltip-tip) {
			position: relative;
			font-size: var(--tip-size);
			color: var(--tooltip-background);
		}

		&:not(.selectable) {
			pointer-events: none;
			user-select: none;
		}
	}

	.tooltip-content {
		position: relative;
		line-height: 1.3;
		font-weight: 350;
		letter-spacing: 0.02em;
		width: max-content;
		max-width: var(--ui-width-sm);
		margin: 0;
		padding: 0.5em 1em 0.6em 1em;
		background: var(--tooltip-background);
		border-radius: 0.75em;
		color: col(fg, 300);
	}

	.top {
		flex-direction: column;
		& :global(.tooltip-tip) {
		}
	}

	.bottom {
		flex-direction: column-reverse;
		& :global(.tooltip-tip) {
			rotate: 180deg;
		}
	}

	.top,
	.bottom {
		&.start {
			align-items: start;
			& :global(.tooltip-tip) {
				left: var(--tip-pad);
			}
		}
		&.end {
			align-items: end;
			& :global(.tooltip-tip) {
				right: var(--tip-pad);
			}
		}
	}

	.right {
		flex-direction: row-reverse;
		& :global(.tooltip-tip) {
			rotate: 90deg;
		}
	}

	.left {
		flex-direction: row;
		& :global(.tooltip-tip) {
			rotate: -90deg;
		}
	}

	.left,
	.right {
		&.start {
			align-items: start;
			& :global(.tooltip-tip) {
				align-self: center;
			}
		}
		&.end {
			align-items: end;
			& :global(.tooltip-tip) {
				align-self: center;
			}
		}
	}
</style>
