<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { Ctx } from '$utils/contexts';
	import { cssSize, type SizeInput } from '$utils/helpers/css';
	import { getContext } from 'svelte';
	import type { FieldContext } from './Field.svelte';
	import Loading from './Loading.svelte';

	export let variant: 'default' | 'secondary' | 'ghost' | 'cta' | 'navbar' = 'default';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let size: SizeInput = '1em';
	export let contentAlign: 'left' | 'center' | 'right' = 'left';
	export let iconPosition: 'before' | 'after' = 'before';
	export let warning: boolean = false;
	export let square: boolean = undefined;
	export let href: string = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	let elementRef: HTMLElement;
	const fieldCtx = getContext<FieldContext>(Ctx.Field);
	const popoverCtx = getContext(Ctx.Popover);

	/**
	 * Soft auto-determination of squareness, where:
	 *
	 * - User-defined 'square' value has precedence.
	 * - Squareness is automatically applied if button has no slot content.
	 */
	let autoSquare = false;
	$: autoSquare = square || (!$$slots.default && $$slots.icon);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mousedown
	on:mouseup
	class="button {variant}"
	class:active
	class:warning
	class:square={autoSquare}
	style:font-size={cssSize(size)}
	disabled={disabled || loading}
	{href}
	{type}
	{...$$restProps}
	bind:this={elementRef}
>
	<div class="ripple-host" use:ripple={{ startColor: 'currentColor', controlElement: elementRef }} />
	<div class="align-{contentAlign}">
		{#if $$slots.icon}
			<span class="icon icon-{iconPosition}" style:font-size={$$slots.default ? '1em' : '1.2em'}>
				<slot name="icon" />
			</span>
		{/if}
		{#if $$slots.default}
			<span class="label" style:text-align={contentAlign}>
				<slot />
			</span>
		{/if}
	</div>
	{#if $$slots.badge}
		<slot name="badge" />
	{/if}
	{#if loading}
		<Loading />
	{/if}
</svelte:element>

<style lang="postcss">
	.button {
		--size: calc(var(--default-size) - 2 * var(--inset, 0px));
		display: inline-block;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		text-decoration: none;
		height: var(--size);
		min-height: var(--size);
		min-width: var(--size);
		border-radius: calc(var(--default-radius) - var(--inset, 0px));
		margin: 0;
		padding: 0 1.5em;
		font-family: var(--font-main);
		font-weight: 500;
		outline-width: 1px;
		outline-style: solid;
		outline-color: transparent;
		outline-offset: 1px;
		transition: all 0.1s ease-out;

		&:focus {
			outline-color: rgba(var(--rgb-dark-900), 0.5);
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
	}

	.ripple-host {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		top: 0;
		left: 0;
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
		letter-spacing: 0.02em;
	}
	.label {
		grid-area: center;
		display: block;
		top: -0.05em;
	}
	.icon {
		flex-grow: 1;
		top: -0.05em;
		&:only-child {
			grid-area: center;
		}
	}

	/* 
		Variants (should correspond to `typeof variant`)
	*/
	/* Default button theme */
	.default {
		color: var(--color-dark-900);
		background-color: var(--color-light-300);
		transition: all 0.1s ease-out, box-shadow 0.2s ease-in-out;
		&:hover,
		&[popover='open'] {
			color: var(--color-light-300);
			background-color: var(--color-dark-900);
		}
		&:active {
			/* background-color: white; */
		}
		&.active {
			color: var(--color-primary-500);
			background-color: white;
		}
	}
	:global(.button-parent:hover) .default {
		color: var(--color-dark-900);
		background-color: var(--color-light-500);
	}
	/* Secondary, more subtle button theme */
	.secondary {
		color: var(--color-dark-700);
		background-color: transparent;
		box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-500), 0.1);
		&:hover,
		&[popover='open'] {
			color: black;
			background-color: rgba(var(--rgb-dark-500), 0.1);
			box-shadow: inset 0 0 0 5px rgba(var(--rgb-dark-500), 0);
			/* box-shadow: 0 0 0 2px rgba(var(--rgb-primary-500), 0.1); */
		}
	}
	:global(.button-parent:hover) .default {
		color: var(--color-dark-900);
		background-color: var(--color-light-500);
	}
	/* Ghost, more subtle button theme */
	.ghost {
		color: var(--color-dark-500);
		background-color: transparent;
		&:hover,
		&[popover='open'] {
			color: var(--color-primary-700);
			background-color: rgba(var(--rgb-light-900), 0.1);
		}
	}
	/* Emphasised call to action */
	.cta {
		color: white;
		background-color: var(--color-primary-500);
		box-shadow: 0 0em 1em -1em rgba(var(--rgb-dark-900), 0.25);
		transition: all 0.25s ease-out;
		&:hover,
		&[popover='open'] {
			color: white;
			background-color: var(--color-primary-900);
			box-shadow: 0 1em 2em -1em var(--color-primary-500);
		}
		&:active {
		}
		&.active {
			color: var(--color-primary-900);
			background-color: var(--color-primary-300);
		}
	}
	/* Navbar button theme */
	.navbar {
		color: rgba(var(--rgb-dark-900), 0.5);
		background-color: transparent;
		font-weight: 600;
		padding-inline: 1.2em;
		&::after {
			content: '';
			opacity: 0;
			position: absolute;
			bottom: 0.5em;
			left: 50%;
			width: 3px;
			height: 3px;
			background-color: currentColor;
			border-radius: 5px;
			transform: translate(-50%, -100%);
			transition: opacity 0.35s, width 0.15s cubic-bezier(0, 0, 0, 1),
				transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
		}
		&:hover,
		&[popover='open'] {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-light-500), 0.5);
			&::after {
				opacity: 1;
				width: 8px;
				transform: translate(-50%, 50%);
			}
		}
		&:active {
		}
		&.active {
			cursor: default;
			color: var(--color-primary-500);
			pointer-events: none;
			&::after {
				opacity: 1;
				height: 5px;
				width: 5px;
				transform: translate(-50%, 50%);
			}
		}
	}
</style>
