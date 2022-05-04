<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';
	import { Ctx } from '$utils/contexts';
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import type { SvelteProps } from '$utils/helpers/types';
	import { getContext } from 'svelte';
	import Icon from './Icon.svelte';
	import Loading from './Loading.svelte';

	export let variant: 'default' | 'secondary' | 'ghost' | 'cta' | 'nav' = 'default';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let size: number | CssSizeValue = undefined;
	export let contentAlign: 'left' | 'center' | 'right' = 'left';
	export let icon: SvelteProps<Icon>['name'] = undefined;
	export let iconPosition: 'before' | 'after' = 'before';
	export let warning: boolean = false;
	export let square: boolean = undefined;
	export let href: string = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	const fieldCtx = getContext(Ctx.Field);

	let autoSquare = false;
	let autoSize: string;

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
	$: autoSize = size ? cssSize(size) : fieldCtx ? 'calc(1em - var(--inset, 3px))' : '1em';
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
	class="button {variant}"
	style:font-size={autoSize}
	disabled={disabled || loading}
	{href}
	{type}
	{...$$restProps}
>
	<div class="align-{contentAlign}">
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
		border-radius: 1em;
		margin: 0;
		padding: 0 1em;
		font-family: var(--font-main);
		font-weight: 500;
		outline-width: 2px;
		outline-style: solid;
		outline-color: transparent;
		overflow: hidden;
		transition: all 0.2s ease-out;
		&.warning {
			background-color: var(--color-error-100);
			color: var(--color-error-700);
		}
		&:disabled {
			opacity: 0.5;
			pointer-events: none;
			cursor: default;
		}
	}

	/* Squareness */
	.square {
		width: var(--size);
		padding: 0;
		& div {
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
		grid-template-areas: 'left center right';
		grid-template-columns: auto auto auto;
		flex-direction: row;
		align-items: center;
	}
	.align-center {
		grid-template-columns: 1fr auto 1fr;
		justify-content: center;
	}
	.align-left {
		justify-content: flex-start;
	}
	.align-right {
		justify-content: flex-end;
	}
	.icon-before {
		grid-area: left;
		justify-content: left;
		&:not(:only-child) {
			padding-right: 0.5em;
		}
	}
	.icon-after {
		grid-area: right;
		justify-content: right;
		&:not(:only-child) {
			padding-left: 0.5em;
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
		/* border: 1px solid black; */
	}
	#label {
		grid-area: center;
		display: block;
		top: -0.05em;
		overflow: hidden;
	}
	#icon {
		flex-grow: 1;
		top: -0.05em;
		&:only-child {
			grid-area: center;
		}
	}

	/* Variants (should correspond to `typeof variant`) */
	/* Default button theme */
	.default {
		color: var(--color-dark-100);
		background-color: var(--color-light-100);
		box-shadow: 0 1px 1px 0 transparent;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-primary-500);
			background-color: white;
			box-shadow: 0 0.25em 1em -0.75em var(--color-primary-900);
			transition: all 0.15s ease-out;
		}
		&:active,
		&.active {
			color: var(--color-primary-900);
			background-color: var(--color-light-900);
		}
	}
	/* Secondary button theme */
	.secondary {
	}
	/* Subtle button theme */
	.ghost {
		color: var(--color-dark-100);
		background-color: transparent;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-primary-900);
			background-color: rgba(255, 255, 255, 0.5);
			/* outline: 1px solid rgba(var(--rgb-dark-100), 0.1); */
		}
	}
	/* Emphasised call to action */
	.cta {
		color: var(--color-dark-900);
		background-color: var(--color-secondary-300);
		transition: all 0.1s;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-secondary-900);
			background-color: var(--color-secondary-100);
		}
		&:active,
		&.active {
			color: var(--color-primary-900);
			background-color: var(--color-light-900);
		}
	}
	/* Navbar button theme */
	.nav {
		color: var(--color-dark-100);
		background-color: transparent;
		font-weight: 600;
		letter-spacing: 0.3px;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 0.8em;
			background-color: var(--color-primary-300);
			opacity: 0;
			transform: scale(0.8);
			transition: all 0.5s cubic-bezier(0, 0, 0.2, 1);
		}
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-primary-500);
			background-color: transparent;
			&::before {
				opacity: 0.2;
				transform: scale(1);
				transition: all 0.25s cubic-bezier(0, 0, 0.2, 1);
			}
		}
		&:active,
		&.active {
			cursor: default;
			color: var(--color-primary-300);
			background-color: transparent;
		}
		&.active {
			pointer-events: none;
		}
	}
</style>
