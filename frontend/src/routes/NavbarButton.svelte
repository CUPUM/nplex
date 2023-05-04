<script lang="ts">
	import { ICON_CLASS } from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { col } from '$utils/css';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type $$Props = HTMLAnchorAttributes & {
		href?: string;
		current?: boolean;
		cta?: boolean;
		category?: boolean;
		disabled?: boolean;
		equi?: boolean;
		rounded?: boolean;
		active?: boolean;
	};

	export let href: $$Props['href'] = undefined;
	export let current: $$Props['current'] = undefined;
	export let cta: $$Props['cta'] = undefined;
	export let category: $$Props['category'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let equi: $$Props['equi'] = undefined;
	export let rounded: $$Props['rounded'] = undefined;
	export let active: $$Props['active'] = undefined;
</script>

<svelte:element
	this={typeof href === 'string' ? 'a' : 'button'}
	class="navbar-button {ICON_CLASS.hover} {active ? ICON_CLASS.hold : ''}"
	class:cta
	class:category
	data-current={current || undefined}
	class:active
	class:disabled
	{disabled}
	class:equi
	class:rounded
	aria-disabled={disabled}
	data-sveltekit-preload-code="hover"
	{href}
	on:pointerdown
	{...$$restProps}
>
	<Ripple color={col('primary', '500')} opacityStart={0.5} />
	<div class="fx" />
	<div class="inner">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.navbar-button {
		--button-radius: var(--ui-radius-md);
		--button-size: 2.75rem;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 500;
		padding: 0 var(--ui-pad-md);
		height: calc(var(--button-size) - 2 * var(--inset, 0px));
		border-radius: calc(var(--radius, var(--button-radius)) - var(--inset, 0px));
		letter-spacing: 0.02em;
		line-height: 1;
		color: col(fg, 100);
		outline: var(--ui-outline-inactive);
		transition: all var(--navbar-transition);

		&::before {
			content: '';
			position: absolute;
			border-radius: inherit;
			inset: 0;
			z-index: -2;
			background: var(--navbar-bg);
			transition: background var(--navbar-transition), opacity var(--navbar-transition);
		}

		&:hover:not([data-current]) {
			color: col(primary, 500);
			background: col(primary, 500, 0.1);
		}
		&.active {
			color: col(primary, 900);
			background: col(primary, 100, 0.5);
		}
		&[data-current]:not(.active) {
			color: col(bg, 300);
			background: transparent;
			&::before {
				// background: col(fg, 500);
				background: transparent;
			}
		}
		&:focus-visible {
			outline: var(--ui-outline-active);
		}
		&:focus-visible,
		&:focus {
			z-index: 2;
		}

		&.category {
			&:first-of-type {
				padding-inline-start: 1.5em;
			}
			&:last-of-type {
				padding-inline-end: 1.5em;
			}
		}
	}

	.inner {
		position: relative;
		height: 1.3em; // Improve visual vertical center
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.disabled,
	:disabled {
		pointer-events: none;
		opacity: 0.25;
	}

	.equi {
		flex: none;
		aspect-ratio: 1;
		padding: 0;
	}

	.fx {
		display: inherit;
		align-items: inherit;
		justify-content: inherit;
		border-radius: inherit;
		padding: inherit;
		position: absolute;
		inset: 0;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			border-radius: inherit;
			width: 100%;
			height: 100%;
			left: 0;
			top: 100%;
			background: col(fg, 500);
			rotate: 16deg;
			scale: 0.75;
			transform-origin: bottom;
			// opacity: 0;
			transition: all 0.3s var(--ui-ease-out), background var(--navbar-transition);
		}

		[data-current]:not(.active) & {
			&::before {
				// opacity: 1;
				top: 0;
				rotate: 0deg;
				scale: 1;
				transition: all 0.15s var(--ui-ease-out), background var(--navbar-transition);
			}
		}
	}
</style>
