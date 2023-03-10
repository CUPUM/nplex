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
	class="navbar-button focus-outline-visible {ICON_CLASS.hover} {active ? ICON_CLASS.hold : ''}"
	class:cta
	class:category
	data-current={current || undefined}
	class:active
	class:disabled
	{disabled}
	class:equi
	class:rounded
	aria-disabled={disabled}
	{href}
	on:pointerdown
	{...$$restProps}
>
	<Ripple color={col('primary', '500')} opacityStart={0.5} />
	<div class="inner">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.navbar-button {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 500;
		padding: 0 1.25em;
		height: calc(var(--ui-block-size-lg) - 2 * var(--inset, 0px));
		border-radius: calc(var(--radius, var(--ui-radius-md)) - var(--inset, 0px));
		letter-spacing: 0.02em;
		line-height: 1;
		color: col(fg, 100);
		backdrop-filter: blur(6px);
		transition: color var(--navbar-transition);

		&::before {
			content: '';
			position: absolute;
			border-radius: inherit;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--navbar-bg);
			opacity: 0.75;
			transition: background var(--navbar-transition), opacity var(--navbar-transition);
		}
		&:hover:not([data-current]) {
			color: col(primary, 700);
			&::before {
				opacity: 0.25;
				background: col(primary, 100);
			}
		}
		&.active {
			color: col(primary, 900);
			&::before {
				background: col(primary, 100);
				opacity: 0.5;
			}
		}
		&[data-current]:not(.active) {
			color: col(primary, 500);
			&::before {
				opacity: 0.9;
			}
		}

		&:focus-visible,
		&:focus {
			z-index: 1;
		}

		// Category

		&.category {
			backdrop-filter: none;
			&::before {
				opacity: 0;
			}
		}

		// Call-to-action variant

		&.cta {
			color: col(bg, 100);
			&::before {
				background: col(fg, 300);
				opacity: 0.9;
			}
			&:hover,
			&.active,
			&:active {
				color: col(primary, 700);
				&::before {
					background: col(primary, 300);
					opacity: 0.5;
				}
			}
		}
	}

	.inner {
		position: relative;
		height: 1.3em;
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

	.rounded {
		border-radius: 50%;
	}
</style>
