<script lang="ts" context="module">
	export const buttonContextKey = 'button-context';
</script>

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

	const buttonParent = getContext(buttonContextKey);

	let nopointer = false;
	let autoSquare = false;
	let autoSize;
	let grid;

	$: nopointer = variant === 'nav' && active;
	/**
	 * Soft auto-determination of squareness, where:
	 * - User-defined 'square' value has precedence.
	 * - Squareness is automatically applied if button has no slot content.
	 */
	$: autoSquare = square || (!$$slots.default && Boolean(icon));
	/**
	 * Soft auto-determination of component size, where:
	 * - User-defined size has most precedence and is used if present.
	 * - Fallback size is smaller if the button is contextualised inside a 'button-parent' context setter.
	 * (Useful for field buttons and other nested uses)
	 */
	$: autoSize = typeof size === 'number' ? size + 'px' : size || buttonParent ? '0.8em' : '1em';
	/**
	 * Auto inner layout based on supplied slots.
	 */
	$: grid = $$slots.default && icon ? '' : '1fr';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	use:ripple={{ startColor: 'currentColor' }}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mousedown
	on:mouseup
	class:active
	class:warning
	class:square={autoSquare}
	class:nopointer
	class="button {variant}"
	style:font-size={autoSize}
	disabled={disabled || loading}
	{href}
	{...$$restProps}
>
	<div class="content-{contentAlign}">
		{#if icon}
			<span id="icon" class="icon-{iconPosition}">
				<Icon size={$$slots.default ? '1em' : '1.2em'} name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span id="label" style:text-align={contentAlign}>
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
		padding: 0;
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
			opacity: 0.5;
			pointer-events: none;
			cursor: default;
		}

		&.nopointer {
			pointer-events: none;
			cursor: default;
		}
	}

	/* Squareness */

	.square {
		width: var(--size);

		& div {
			padding: 0;
			justify-content: center;
		}
	}

	/* Inner div layout */

	div {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-areas: 'left slot right';
		grid-template-columns: minmax(0, min-content) auto minmax(0, min-content);
		gap: 0;
		flex-direction: row;
		align-items: center;
		padding: 0 1em;

		&.content-center {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
			justify-content: center;
		}
	}

	:not(.square) div {
		&.content-left {
			justify-content: flex-start;
		}
		&.content-right {
			justify-content: flex-end;
		}
		&.icon-left {
			justify-content: left;
		}
		&.icon-right {
			justify-content: right;
		}
	}

	/* Content fine-tuning */

	span {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		border: 1px solid black;
	}

	#label {
		flex-shrink: 1;
		grid-area: slot;
		top: -0.05em;
		overflow: hidden;
	}

	#icon {
		top: -0.05em;
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
</style>
