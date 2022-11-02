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

	// forwardEvents(() => buttonRef);

	const buttonGroupContext = getButtonGroupContext();
	const parentVariant = buttonGroupContext?.variant;

	$: computedVariant =
		variant ?? (buttonGroupContext && parentVariant && $parentVariant ? $parentVariant : 'default');

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
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="main">
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="trailing">
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
	<Ripple />
</svelte:element>

<style lang="scss">
	.button {
		--radius: var(--default-radius);
		--size: var(--default-size);
		--computed-size: calc(var(--size) - 2 * var(--inset, 0px));
		--computed-radius: calc(var(--radius) - var(--inset, 0px));
		position: relative;
		display: grid;
		grid-template-columns:
			[full-start leading-padding-start]
			calc(2 * var(--default-padding-inline) / 3)
			[leading-padding-end leading-start]
			auto
			[leading-end leading-gutter-start]
			calc(var(--default-padding-inline) / 3)
			[leading-gutter-end main-start]
			1fr
			[main-end trailing-gutter-start]
			calc(var(--default-padding-inline) / 3)
			[trailing-gutter-end trailing-start]
			auto
			[trailing-end trailing-padding-start]
			calc(2 * var(--default-padding-inline) / 3)
			[trailing-padding-end full-end];
		gap: 0;
		font-weight: 400;
		font-size: 1em;
		min-height: var(--computed-size);
		border-radius: var(--computed-radius);
		padding: 0;
		margin: 0;
		cursor: pointer;
		flex-direction: row;
		align-items: center;
		border: none;
		font-family: inherit;
		outline: 0px solid transparent;
		transition: transform 0.15s ease-out;
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
				calc(2 * var(--default-padding-inline) / 3)
				[leading-padding-end leading-start]
				1fr
				[leading-end leading-gutter-start]
				calc(var(--default-padding-inline) / 3)
				[leading-gutter-end main-start]
				auto
				[main-end trailing-gutter-start]
				calc(var(--default-padding-inline) / 3)
				[trailing-gutter-end trailing-start]
				1fr
				[trailing-end trailing-padding-start]
				calc(2 * var(--default-padding-inline) / 3)
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
				[leading-end leading-gutter-start]
				0
				[leading-gutter-end main-start]
				var(--computed-size)
				[main-end trailing-gutter-start]
				0
				[trailing-gutter-end trailing-start]
				0
				[trailing-end trailing-padding-start]
				0
				[trailing-padding-end full-end];
		}
		&.disabled,
		&:disabled {
			cursor: not-allowed;
			transform: scale(0.98);
			&:not(.loading) {
				opacity: 0.5;
			}
			&:active {
				pointer-events: none;
			}
		}
		&.warning {
			outline-width: 2px;
			outline-color: var(--color-error-300);
			background-color: var(--color-error-100);
		}
		&:active {
			transform: scale(0.98);
		}
		&:focus-visible {
			outline: var(--default-focus-outline);
		}
		&.loading {
			transform: scale(0.98);
			.main,
			.leading,
			.trailing {
				opacity: 0.25;
			}
		}
	}
	.main,
	.leading,
	.trailing {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 0.25em;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.main {
		grid-column: main;
		:where(.center) &,
		.square & {
			justify-content: center;
		}
		:where(.start) & {
			justify-content: left;
		}
		:where(.end) {
			justify-content: right;
		}
	}
	.leading {
		justify-content: flex-start;
		grid-column: leading;
		// &:not(:empty) {
		// 	padding-right: 0.5em;
		// }
	}
	.trailing {
		justify-content: flex-end;
		grid-column: trailing;
		// &:not(:empty) {
		// 	padding-left: 0.5em;
		// }
	}

	// Default variant
	.default {
		color: var(--color-contrast-500);
		background-color: var(--color-base-500);
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:global(:not(.active)):hover {
			color: var(--color-contrast-700);
			background-color: var(--color-base-900);
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
		background-color: rgba(var(--rgb-base-900), 0.1);
		transition: all 0.1s ease-out;
		&::after {
			opacity: 0.2;
			border-color: var(--color-contrast-100);
			border-style: solid;
			border-width: 1px;
			transition: all 0.1s ease-in-out;
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:global(:not(.active)):hover {
			&:not(.disabled) {
				color: var(--color-contrast-900);
				background-color: rgba(var(--rgb-base-900), 0.35);
				&::after {
					opacity: 0.5;
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
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:global(:not(.active)):hover {
			&:not(.disabled) {
				color: var(--color-contrast-900);
				background-color: rgba(var(--rgb-base-900), 0.35);
			}
		}
		&:active,
		&:global(.active) {
			&:not(.disabled) {
				color: var(--color-contrast-900);
				background-color: rgba(var(--rgb-base-900), 0.5);
			}
		}
	}

	// Call-to-action variant
	.cta {
		color: var(--color-base-000);
		background-color: var(--color-primary-500);
		&::after {
			box-shadow: 0 0.2em 1em -0.5em rgba(0, 0, 0, 0);
			transition: all 0.1s ease-in-out;
		}
		transition: all 0.15s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:global(:not(.active)):hover {
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
	}
</style>
