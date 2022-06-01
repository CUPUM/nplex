<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { colors } from '$utils/colors';
	import { Ctx } from '$utils/contexts';
	import { cssSize, type CSSSizeValue } from '$utils/helpers/css';
	import { getContext } from 'svelte';
	import type { FieldContext } from './Field.svelte';
	import Loading from './Loading.svelte';

	export let variant: 'default' | 'secondary' | 'ghost' | 'cta' | 'navbar' = 'default';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let size: number | CSSSizeValue = '1em';
	export let contentAlign: 'left' | 'center' | 'right' = 'left';
	export let iconPosition: 'before' | 'after' = 'before';
	export let warning: boolean = false;
	export let square: boolean = undefined;
	export let href: string = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	const fieldCtx = getContext<FieldContext>(Ctx.Field);
	const popoverCtx = getContext(Ctx.Popover);

	let autoSquare = false;
	let autoOuterSize: string;
	let contextInset: string;

	/**
	 * Soft auto-determination of squareness, where:
	 *
	 * - User-defined 'square' value has precedence.
	 * - Squareness is automatically applied if button has no slot content.
	 */
	$: autoSquare = square || (!$$slots.default && $$slots.icon);
	/**
	 * Soft auto-determination of component size, where:
	 *
	 * - User-defined size has most precedence and is used if present.
	 * - Fallback size is smaller if the button is contextualised inside a button parent context setter. (Useful for field
	 *   buttons and other nested uses)
	 */
	// $: autoOuterSize = fieldCtx ? `calc(2.8em - 2 * ${cssSize(fieldCtx.inset)})` : '2.8em';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	use:ripple={{ startColor: colors.primary[100] }}
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
>
	<div class="align-{contentAlign}">
		{#if $$slots.icon}
			<span id="icon" class="icon-{iconPosition}" style:font-size={$$slots.default ? '1em' : '1.2em'}>
				<slot name="icon" />
			</span>
		{/if}
		{#if $$slots.default}
			<span id="label" style:text-align={contentAlign}>
				<slot />
			</span>
		{/if}
	</div>
	{#if $$slots.badge}
		<slot name="badge" />
	{/if}
	{#if loading}
		<Loading
			style="position: absolute; width: 1em; height: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;"
		/>
	{/if}
</svelte:element>

<style lang="postcss">
	.button {
		--outer-size: calc(3em - 2 * var(--inset, 0px));
		display: inline-block;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		text-decoration: none;
		height: var(--outer-size);
		min-height: var(--outer-size);
		min-width: var(--outer-size);
		border-radius: max(calc(1.1em - var(--inset, 0px)), var(--size-xsmall, 0px));
		margin: 0;
		padding: 0 1.2em;
		font-family: var(--font-main);
		font-weight: 400;
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
		width: var(--outer-size);
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
		letter-spacing: 0px;
		/* border: 1px solid black; */
	}
	#label {
		grid-area: center;
		display: block;
		top: -0.05em;
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
		color: var(--color-dark-500);
		background-color: rgba(var(--rgb-dark-500), 0.1);
		transition: all 0.15s ease-out;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-dark-500), 0.05);
			/* box-shadow: inset 0 0 0 1px white; */
		}
		&:active {
		}
		&.active {
			color: var(--color-primary-500);
			background-color: white;
		}
	}
	/* Secondary, more subtle button theme */
	.secondary {
		color: var(--color-dark-500);
		background-color: var(--color-light-100);
		box-shadow: 0 0 0 1px rgba(var(--rgb-dark-500), 0.1);
		transition: all 0.2s;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-secondary-500);
			background-color: var(--color-light-500);
			box-shadow: 0 0 0 0 transparent;
		}
	}
	/* Ghost, more subtle button theme */
	.ghost {
		color: var(--color-dark-500);
		background-color: transparent;
		/* box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); */
		transition: all 0.2s ease-out;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-dark-500), 0.1);
			/* box-shadow: 0 0 0 2px rgba(var(--rgb-primary-500), 0.1); */
		}
	}
	/* Emphasised call to action */
	.cta {
		font-weight: 500;
		color: white;
		background-color: var(--color-primary-500);
		transition: all 0.2s;
		& span {
			letter-spacing: 0.02em;
		}
		&:hover,
		&:focus,
		&.hover {
			color: white;
			background-color: var(--color-primary-700);
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
		color: var(--color-dark-300);
		background-color: transparent;
		border-radius: 2em;
		font-weight: 450;
		&:hover,
		&:focus,
		&.hover {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-light-500), 1);
		}
		&:active {
		}
		&.active {
			/* font-weight: 500; */
			cursor: default;
			color: var(--color-primary-500);
			/* background-color: var(--color-light-100); */
			pointer-events: none;
		}
	}
</style>
