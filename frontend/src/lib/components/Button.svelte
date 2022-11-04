<!--
	@component
	## Button
	Primitive button component.

-->
<script lang="ts" context="module">
	const CTX_KEY = 'button-context';

	interface ButtonContext {}

	export function getButtonContext() {
		return getContext<ButtonContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { getContext, setContext } from 'svelte';
	import { getButtonGroupContext } from './ButtonGroup.svelte';

	export let href: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let variant: 'default' | 'outlined' | 'ghost' | 'cta' | 'danger' | undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let warning: boolean | undefined = undefined;
	export let square: boolean | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let active: boolean | undefined = false;
	export let contentAlign: 'start' | 'center' | 'end' = 'start';
	export let value: string | undefined = undefined;
	export let form: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let formaction: string | undefined = undefined;
	export let tabindex: number | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };
	export let style: string | undefined = undefined;

	let buttonRef: HTMLButtonElement | HTMLAnchorElement;
	const buttonGroupContext = getButtonGroupContext();
	const buttonGroupVariant = buttonGroupContext?.variant;

	$: computedVariant = variant ?? buttonGroupVariant ?? 'default';

	setContext<ButtonContext>(CTX_KEY, {});
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svelte:element
	this={href && !disabled ? 'a' : 'button'}
	bind:this={buttonRef}
	class="button {computedVariant} {contentAlign} {className}"
	class:compact
	class:warning
	class:square
	class:active
	class:disabled
	class:loading
	class:grouped={buttonGroupContext}
	aria-disabled={disabled}
	{style}
	{href}
	{id}
	{type}
	{value}
	{form}
	{title}
	{tabindex}
	{formaction}
	on:click
	on:pointerdown
	on:pointercancel
	on:pointerenter
	on:mousedown
	on:mouseover
	on:mouseup
	on:keydown
	on:mouseout
	on:mousemove
	on:mouseleave
	on:mouseenter
	on:focus
	on:blur
>
	<Ripple />
	{#if $$slots.leading}
		<div class="content leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="content main">
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="content trailing">
			<slot name="trailing" />
		</div>
	{/if}
	{#if loading}
		<div class="loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	// Vendor style soft resets
	:where(button),
	:where(a) {
		all: unset;
	}

	.button {
		--radius: var(--default-radius);
		--height: var(--default-height);
		--computed-height: calc(var(--height) - 2 * var(--inset, 0px));
		--computed-radius: calc(var(--radius) - var(--inset, 0px));
		position: relative;
		display: grid;
		grid-template-columns:
			[full-start leading-padding-start]
			var(--default-padding-inline)
			[leading-padding-end leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end trailing-padding-start]
			var(--default-padding-inline)
			[trailing-padding-end full-end];
		grid-template-rows: minmax(var(--computed-height), auto);
		gap: 0;
		flex-direction: row;
		align-items: center;
		font-weight: 400;
		font-size: 1em;
		border-radius: var(--computed-radius);
		cursor: pointer;
		outline: 0px solid transparent;
		// Box-shadow and border host to allow additional customization from outer class.
		&::after {
			pointer-events: none;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
		}
		&.center {
			// grid-template-columns: [full-start leading-start] 1fr [leading-end main-start] auto [main-end trailing-start] 1fr [trailing-end full-end];
			grid-template-columns:
				[full-start leading-padding-start]
				var(--default-padding-inline)
				[leading-padding-end leading-start]
				1fr
				[leading-end main-start]
				auto
				[main-end trailing-start]
				1fr
				[trailing-end trailing-padding-start]
				var(--default-padding-inline)
				[trailing-padding-end full-end];
		}
		&.square {
			flex: none;
			aspect-ratio: 1 / 1;
			justify-content: center;
			grid-template-columns:
				[full-start leading-padding-start]
				0
				[leading-padding-end leading-start]
				0
				[leading-end main-start]
				var(--computed-height)
				[main-end trailing-start]
				0
				[trailing-end trailing-padding-start]
				0
				[trailing-padding-end full-end];
		}
		&.disabled,
		&:disabled {
			cursor: not-allowed;
			&:not(.loading) {
				opacity: 0.5;
			}
			&:active {
				pointer-events: none;
			}
			.content {
				transform: scale(0.95);
			}
		}
		&.warning {
			outline-width: 2px;
			outline-color: var(--color-error-300);
			background-color: var(--color-error-100);
		}
		&:active {
			.content {
				transform: scale(0.95);
			}
		}
		&:focus-visible {
			outline: var(--default-focus-outline);
		}
		&.loading {
			.content {
				transform: scale(0.98);
				opacity: 0.25;
			}
		}
	}
	.content {
		position: relative; // NVM, breaks due to transform on :active... Do not set position relative so that certain children (ex.: Badge) can be positioned relative to button.
		display: inline-block;
		line-height: 1em;
		padding-bottom: calc(0.5em - 0.5ex);
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: transform 0.15s ease-out;
	}
	.main {
		grid-column: main;
		.center &,
		.square & {
			justify-content: center;
			text-align: center;
		}
		.start:not(.square) & {
			justify-content: left;
			text-align: left;
		}
		.end:not(.square) {
			justify-content: right;
			text-align: right;
		}
	}
	.leading {
		justify-content: flex-start;
		text-align: left;
		grid-column: leading;
		&:not(:empty) {
			padding-right: 0.5em;
		}
	}
	.trailing {
		justify-content: flex-end;
		text-align: right;
		grid-column: trailing;
		&:not(:empty) {
			padding-left: 0.5em;
		}
	}

	// Default variant
	.default {
		color: var(--color-contrast-300);
		background-color: rgba(var(--rgb-base-700), 0.75);
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: var(--color-contrast-900);
			background-color: rgba(var(--rgb-base-900), 0.8);
		}
		&:active,
		&:global(.active) {
			color: var(--color-contrast-900);
			background-color: var(--color-base-900);
		}
	}

	// Outlined variant
	.outlined {
		color: var(--color-contrast-300);
		background-color: transparent;
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
		&::after {
			opacity: 0.2;
			border-color: var(--color-contrast-100);
			border-style: solid;
			border-width: 1px;
			transition: all 0.1s ease-in-out;
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			&:not(.disabled) {
				color: var(--color-contrast-900);
				background-color: rgba(var(--rgb-base-900), 0.5);
				&::after {
					opacity: 0;
					border-width: 3px;
				}
			}
		}
		&:active,
		&:global(.active) {
			&:not(.disabled) {
				color: var(--color-contrast-900);
				background-color: rgba(var(--rgb-base-900), 1);
				&::after {
					border-width: 1.5px;
					opacity: 0.5;
				}
			}
		}
	}

	// Ghost variant
	.ghost {
		color: var(--color-contrast-300);
		background-color: transparent;
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			&:not(.disabled) {
				color: var(--color-contrast-900);
				background-color: rgba(var(--rgb-contrast-900), 0.1);
			}
		}
		&:active,
		&:global(.active) {
			&:not(.disabled) {
				color: var(--color-primary-900);
				background-color: rgba(var(--rgb-primary-900), 0.1);
			}
		}
	}

	// Call-to-action variant
	.cta {
		color: var(--color-base-000);
		background-color: var(--color-primary-500);
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
		&::after {
			box-shadow: 0 0.2em 1em -0.5em rgba(0, 0, 0, 0);
			transition: all 0.1s ease-in-out;
		}
		transition: all 0.15s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			&:not(.disabled) {
				color: var(--color-base-100);
				background-color: var(--color-primary-700);
				&::after {
					box-shadow: 0 0.8em 1.5em -1em rgba(0, 0, 0, 0.5);
				}
			}
		}
		&:active,
		&:global(.active) {
			&:not(.disabled) {
				background-color: var(--color-primary-900);
				&::after {
					box-shadow: 0 0.5em 1em -0.5em rgba(0, 0, 0, 0.25);
				}
			}
		}
	}

	// Danger variant
	.danger {
		border: 2px solid rgba(0, 0, 0, 0.2);
		background-color: red;
		box-shadow: 0 0 2em black;
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
	}
</style>
