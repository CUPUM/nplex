<script lang="ts">
	import { ICON_CLASS } from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { col } from '$utils/css';

	export let href: string | undefined = undefined;
	export let current: boolean | undefined = undefined;
	export let cta: boolean | undefined = undefined;
	export let category: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let equi: boolean | undefined = undefined;
	export let rounded: boolean | undefined = undefined;
	export let active: boolean | undefined = undefined;
	export let noscroll: boolean | undefined = undefined;
</script>

<svelte:element
	this={typeof href === 'string' ? 'a' : 'button'}
	class="navbar-button focus-outline-visible {ICON_CLASS.hover} {active ? ICON_CLASS.hold : ''}"
	class:cta
	class:category
	data-current={current || undefined}
	data-sveltekit-noscroll={noscroll ? '' : 'off'}
	class:active
	class:disabled
	{disabled}
	class:equi
	class:rounded
	aria-disabled={disabled}
	{href}
	on:pointerdown
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
		height: calc(var(--ui-height) - 2 * var(--inset, 0px));
		border-radius: calc(var(--ui-radius-md) - var(--inset, 0px));
		letter-spacing: 0.02em;
		line-height: 1;

		&:focus-visible,
		&:focus {
			z-index: 1;
		}

		// Default

		color: col(fg, 100);
		backdrop-filter: blur(6px);
		&::before {
			content: '';
			position: absolute;
			border-radius: inherit;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--nav-bg);
			opacity: 0.75;
		}
		&:hover:not([data-current]) {
			color: col(primary, 700);
			&::before {
				opacity: 0.25;
				background: col(primary, 100);
				// box-shadow: inset 0 0 0 1px col(primary, 300);
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
				// background: var(--nav-bg);
				// opacity: 0.5;
				// background: none;
				border: 1px dashed col(primary, 100, 0.5);
			}
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
		aspect-ratio: 1;
		padding: 0;
	}

	.rounded {
		aspect-ratio: 1;
		padding: 0;
		border-radius: 50%;
	}
</style>
