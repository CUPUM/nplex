<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';
	import type { SvelteProps } from '$utils/helpers/types';
	import { getContext } from 'svelte';
	import Icon from './Icon.svelte';
	import Loading from './Loading.svelte';

	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' | 'nav' = 'normal';
	export let size: string | number = undefined;
	export let contentAlign: 'left' | 'center' | 'right' = 'center';
	export let icon: SvelteProps<Icon>['name'] = undefined;
	export let iconPosition: 'left' | 'right' = 'left';
	export let warning: boolean = false;
	export let square: boolean = undefined;
	export let href: string = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	const buttonParent = getContext('button-parent');

	let nopointer = false;
	let composed = false;
	let autoSquare = false;
	let autoSize;

	$: autoSquareness = square || (!$$slots.default && Boolean(icon));
	$: nopointer = variant === 'nav' && active;
	$: composed = !!icon && $$slots.default;
	/**
	 * Soft auto-determination of component size, where:
	 * - User-defined size has most precedence and is used if present.
	 * - Fallback size is smaller if the button is contextualised inside a 'button-parent' context setter.
	 * (Useful for field buttons and other nested uses)
	 */
	$: autoSize = typeof size === 'number' ? size + 'px' : size || buttonParent ? '0.8em' : '1em';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	use:ripple={{ startColor: 'currentColor' }}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	class:active
	class:warning
	class:square={autoSquareness}
	class:nopointer
	class="button {variant}"
	style:font-size={autoSize}
	disabled={disabled || loading}
	{href}
	{...$$restProps}
>
	<div class="{contentAlign} icon-{iconPosition}" class:composed>
		{#if icon}
			<span id="icon" class={iconPosition}>
				<Icon size={$$slots.default ? '1em' : '1.2em'} name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span id="label">
				<slot />
			</span>
		{/if}
	</div>
	{#if loading}
		<Loading
			style="position: absolute; width: 1em; height: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;"
		/>
	{/if}
</svelte:element>

<style lang="postcss">
	.button {
		/* Base */
		--size: 2.8em;
		display: inline-block;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		text-decoration: none;
		height: var(--size);
		min-height: var(--size);
		min-width: var(--size);
		border-radius: 0.8em;
		margin: 0;
		font-family: var(--font-main);
		font-weight: 500;
		outline-width: 2px;
		outline-style: solid;
		outline-color: transparent;
		overflow: hidden;
		transition: all 0.2s ease-out;

		&:hover {
			background-color: var(--hover-bg-color);
			color: var(--hover-color);
			transition: all 0s;
		}

		&:focus {
			/* outline-color: var(--hover-bg-color); */
			outline-color: rgba(var(--rgb-primary-500), 0.2);
		}

		&.active {
			background-color: var(--active-bg-color);
			color: var(--active-color);
		}

		&.warning {
			background-color: var(--color-error-100);
			color: var(--color-error-700);
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}

		&.nopointer {
			pointer-events: none;
			cursor: default;
		}
	}

	div {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-block: 0;
		padding-inline: 1em;
		&.left {
			justify-content: flex-start;
		}
		&.center {
			justify-content: center;
			&.composed {
				grid-template-columns: auto;
				&.icon-left {
					grid-template-columns: 1fr auto minmax(0, 1fr);
				}
				&.icon-right {
					grid-template-columns: minmax(0, 1fr) auto 1fr;
				}
			}
		}
		&.right {
			justify-content: flex-end;
		}
	}

	/* Variants (should correspond to `typeof variant`) */

	.normal {
		--hover-color: var(--color-primary-500);
		--hover-bg-color: white;
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-light-900);
		color: var(--color-dark-100);
		background-color: var(--color-light-100);
		box-shadow: 0 1px 1px 0 transparent;

		&:hover {
			box-shadow: 0 0.25em 1em -0.75em var(--color-primary-900);
			transition: all 0.15s ease-out;
		}
	}

	.secondary {
	}

	.ghost {
	}

	.cta {
		--hover-color: var(--color-secondary-900);
		--hover-bg-color: var(--color-secondary-100);
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-light-900);
		color: var(--color-dark-900);
		background-color: var(--color-secondary-300);

		&:hover {
			transition: all 0.1s;
		}
	}

	.nav {
		--hover-color: var(--color-primary-500);
		--hover-bg-color: transparent;
		--active-color: var(--color-primary-300);
		--active-bg-color: transparent;
		color: var(--color-dark-100);
		background-color: transparent;
		/* font-family: var(--font-misc); */
		font-weight: 600;
		letter-spacing: 0.3px;

		& div::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 0.8em;
			background-color: var(--color-primary-300);
			opacity: 0;
			transform: scale(0.9);
			transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1);
		}

		&:hover,
		&:focus {
			& div::before {
				opacity: 0.2;
				transform: scale(1);
				transition: all 0.25s cubic-bezier(0.2, 0, 0.2, 1);
			}
		}
	}

	/* Squareness */

	.square {
		justify-content: center;
		width: var(--size);
		padding: 0;
	}

	/* Content alignment */

	span {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;

		&:not(:first-child) {
			margin-left: 0.5em;
		}
	}

	#label {
		top: -0.05em;
	}

	#icon {
		top: -0.05em;
	}
</style>
