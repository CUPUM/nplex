<!--
	@component
	Hello world.
 -->
<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { cssSize, type SizeInput } from '$utils/css';
	import { Ctx } from '$utils/keys';
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
	<div class="content align-{contentAlign}">
		{#if $$slots.icon}
			<span class="icon icon-{iconPosition}">
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

<style lang="scss">
	.button {
		--size: calc(var(--default-size) - 2 * var(--inset, 0px));
		display: inline-block;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		height: var(--size);
		min-height: var(--size);
		min-width: var(--size);
		border-radius: calc(var(--default-radius) - var(--inset, 0px));
		margin: 0;
		padding: 0 1.25em;
		text-decoration: none;
		font-family: var(--font-main);
		font-weight: 500;
		outline-width: 1px;
		outline-style: solid;
		outline-color: transparent;
		outline-offset: 2px;
		transition: all 0.15s cubic-bezier(0.25, 0, 0.5, 1);

		&:focus {
			// outline-color: rgba(var(--rgb-primary-500), 0.25);
		}

		&.warning {
			background-color: var(--color-error-500);
			color: var(--color-light-300);
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
	.content {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: grid;
		grid-auto-flow: dense;
		grid-template-columns:
			[left-start]
			auto
			[left-end center-start]
			auto
			[center-end right-start]
			auto
			[right-end];
		flex-direction: row;
		align-items: center;
		transition: transform 0.25s cubic-bezier(0.25, 2.25, 0.75, 0.5);

		// &:hover .icon:not(:only-child) {
		// 	transform: translateY(-0.2em);
		// }
	}
	.align-center {
		grid-template-columns:
			[left-start]
			1fr
			[left-end center-start]
			auto
			[center-end right-start]
			1fr
			[right-end];
		justify-content: center;
	}
	.align-left {
		justify-content: flex-start;
	}
	.align-right {
		justify-content: flex-end;
	}
	.icon-before {
		grid-column: left;
		justify-content: left;
		&:not(:only-child) {
			padding-right: 0.5em;
		}
	}
	.icon-after {
		grid-column: right;
		justify-content: right;
		&:not(:only-child) {
			padding-left: 0.5em;
		}
	}

	/* Content fine-tuning */
	.icon,
	.label {
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
		grid-column: center;
		display: block;
		top: -0.05em;
	}
	.icon {
		flex-grow: 1;
		top: -0.05em;
		&:only-child {
			font-size: 1.2em;
			grid-column: center;
		}
	}

	/* 
		Variants (should correspond to `typeof variant`)
	*/
	/* Default button theme */
	// prettier-ignore
	.default {
		color: var(--color-dark-900);
		background-color: var(--color-light-300);
		box-shadow: inset 0 0 0 0 var(--color-dark-700), 0 0.5em 2em -1em transparent;
		transition: all 0.15s ease-out, box-shadow 0.2s ease-out;
		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover{
			color: var(--color-light-300);
			background-color: var(--color-dark-700);
			box-shadow: inset 0 0 0 5px transparent, 0 0.5em 2em -1em transparent;
			transition: all 0.08s ease-out, box-shadow 0.1s ease-out;
		}
		&:active {
			color: var(--color-light-900);
		}
		&.active,
		&[popover='open'] {
			color: white;
			background-color: var(--color-primary-300);
			box-shadow: inset 0 0 0 2px var(--color-primary-300), 0 1em 2em -1em var(--color-primary-700);
		}
	}

	/* Secondary, more subtle button theme */
	.secondary {
		color: var(--color-dark-700);
		background-color: transparent;
		box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-500), 0.1);
		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover {
			color: black;
			background-color: rgba(var(--rgb-dark-500), 0.15);
			box-shadow: inset 0 0 0 5px rgba(var(--rgb-dark-500), 0);
			// color: var(--color-primary-700);
			// background-color: rgba(var(--rgb-primary-100), 0.15);
			// box-shadow: inset 0 0 0 5px rgba(var(--rgb-primary-100), 0);
		}
		&.active,
		&[popover='open'] {
		}
	}

	/* Ghost, more subtle button theme */
	.ghost {
		color: var(--color-dark-300);
		background-color: transparent;
		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&[popover='open'] {
			color: var(--color-primary-500);
			background-color: rgba(var(--rgb-primary-100), 0.15);
		}
	}

	/* Emphasised call to action */
	.cta {
		color: white;
		background-color: var(--color-primary-500);
		box-shadow: 0 0.5em 1em -0.5em rgba(var(--rgb-primary-900), 0.5);
		transition: all 0.2s ease-out, box-shadow 0.35s ease-out;
		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&[popover='open'] {
			color: var(--color-light-100);
			background-color: var(--color-primary-300);
			box-shadow: 0 1em 2.25em -0.5em var(--color-primary-700);
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
		// color: rgba(var(--rgb-dark-900), 0.5);
		color: var(--color-dark-900);
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
			transition: opacity 0.2s, width 0.15s cubic-bezier(0, 0, 0, 1),
				transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
		}
		&:hover,
		&[popover='open'] {
			backdrop-filter: blur(8px);
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-light-500), 0.5);
			&::after {
				opacity: 1;
				width: 8px;
				transform: translate(-50%, 50%);
			}
			& .content {
				transform: translateY(-0.15em);
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
