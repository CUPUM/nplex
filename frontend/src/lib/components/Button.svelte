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
	import { forwardEvents } from '$utils/forwardEvents';
	import { getContext, setContext } from 'svelte';

	export let href: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let variant: 'default' | 'outlined' | 'ghost' | 'cta' = 'default';
	export let compact: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let warning: boolean | undefined = undefined;
	export let square: boolean | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let active: boolean | undefined = false;
	export let contentAlign: 'start' | 'center' | 'end' = 'center';
	export let value: string | undefined = undefined;
	export let form: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let formaction: string | undefined = undefined;
	export let tabindex: number | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };
	export let style: string | undefined = undefined;

	let buttonRef: HTMLButtonElement | HTMLAnchorElement;

	forwardEvents(() => buttonRef);

	setContext<ButtonContext>(CTX_KEY, {});
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svelte:element
	this={href && !disabled ? 'a' : 'button'}
	bind:this={buttonRef}
	class="button {variant} {contentAlign} {className}"
	class:compact
	class:warning
	class:square
	class:active
	class:disabled
	class:loading
	{style}
	{disabled}
	{href}
	{id}
	{type}
	{value}
	{form}
	{title}
	{tabindex}
	{formaction}
>
	{#if $$slots.leading}
		<div class="inner leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="inner main">
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="inner trailing">
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
		grid-template-columns: [full-start leading-start] auto [leading-end main-start] 1fr [main-end trailing-start] auto [trailing-end full-end];
		gap: 0;
		font-weight: 400;
		font-size: 1em;
		line-height: 1em;
		padding: 0 var(--default-padding-inline);
		border-radius: var(--computed-radius);
		margin: 0;
		cursor: pointer;
		height: var(--computed-size);
		border: none;
		font-family: inherit;
		align-items: center;
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
			grid-template-columns: [full-start leading-start] 1fr [leading-end main-start] auto [main-end trailing-start] 1fr [trailing-end full-end];
		}
		&.square {
			flex: none;
			aspect-ratio: 1 / 1;
			padding: 0;
			justify-content: center;
		}
		&:disabled,
		&.disabled {
			transform: scale(0.98);
			pointer-events: none;
			&:not(.loading) {
				opacity: 0.5;
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
		&:focus {
			outline: var(--default-focus-outline);
			// outline-color: rgba(var(--rgb-primary-500), 0.25);
			// outline-width: 3px;
			// outline-offset: var(--default-outline-offset);
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

	.inner {
		display: block;
		max-height: 100%;
		top: -0.1em;
		position: relative;
		padding: 0;
		margin: 0;
	}

	.main {
		grid-column: main;
		text-overflow: ellipsis;
		.center & {
			text-align: center;
		}
		.left & {
			text-align: left;
		}
		.right & {
			text-align: right;
		}
	}

	.leading,
	.trailing {
		overflow: hidden;
	}
	.leading {
		text-align: left;
		grid-column: leading;
		&:not(:empty) {
			padding-right: calc(2 * var(--default-padding-inline) / 3);
		}
	}
	.trailing {
		text-align: right;
		grid-column: trailing;
		&:not(:empty) {
			padding-left: calc(2 * var(--default-padding-inline) / 3);
		}
	}

	// Default variant
	.default {
		color: var(--color-contrast-500);
		background-color: var(--color-base-500);
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: var(--color-contrast-700);
			background-color: var(--color-base-900);
		}
		&:active,
		&.active {
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
		&:hover {
			color: var(--color-contrast-900);
			background-color: rgba(var(--rgb-base-900), 0.35);
			&::after {
				opacity: 0.5;
			}
		}
		&:active,
		&.active {
			color: var(--color-contrast-900);
			background-color: rgba(var(--rgb-base-900), 1);
			&::after {
				border-width: 1.5px;
				opacity: 0.5;
			}
		}
	}

	// Ghost variant
	.ghost {
		color: var(--color-contrast-300);
		background-color: transparent;
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: var(--color-contrast-900);
			background-color: rgba(var(--rgb-base-900), 0.35);
		}
		&:active,
		&.active {
			color: var(--color-contrast-900);
			background-color: rgba(var(--rgb-base-900), 0.5);
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
		&:hover {
			color: var(--color-base-100);
			background-color: var(--color-primary-700);
			&::after {
				box-shadow: 0 0.8em 1.5em -1em rgba(0, 0, 0, 0.5);
			}
		}
		&:active,
		&.active {
			background-color: var(--color-primary-900);
			&::after {
				box-shadow: 0 0.5em 1em -0.5em rgba(0, 0, 0, 0.25);
			}
		}
	}

	// // Move into separate NavbarButton component
	// .nav {
	// 	--radius-ratio: 1.5;
	// 	padding: 0 1.25em;
	// 	font-weight: 500;
	// 	color: var(--color-dark-900);
	// 	background-color: transparent;

	// 	.content {
	// 		transition: transform 0.2s cubic-bezier(0.25, 2.25, 0.75, 0.5);
	// 	}

	// 	&::after {
	// 		content: '';
	// 		opacity: 0;
	// 		position: absolute;
	// 		bottom: 0em;
	// 		left: 50%;
	// 		width: 8px;
	// 		height: 2px;
	// 		background-color: currentColor;
	// 		border-radius: 3px;
	// 		transform: translate(-50%, -0.1em);
	// 		transition: opacity 0.2s, width 0.15s cubic-bezier(0, 0, 0, 1),
	// 			transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
	// 	}
	// 	&.square::after {
	// 		display: none;
	// 	}

	// 	// prettier-ignore
	// 	@at-root :global(.button-parent:hover) &,
	// 	&:hover:not(.active),
	// 	&:global([popover]) {
	// 		color: var(--color-dark-900);
	// 		background-color: rgba(var(--rgb-dark-100), 0.1) !important;

	// 		&::after {
	// 			opacity: 1;
	// 			transform: translate(-50%, -.5em);
	// 		}

	// 		& .content {
	// 			transform: translateY(-0.07em);
	// 		}
	// 	}

	// 	&.active:not([popover]) {
	// 		color: var(--color-primary-500);

	// 		&::after {
	// 			opacity: 1;
	// 			height: 5px;
	// 			width: 5px;
	// 			transform: translate(-50%, -0.25em);
	// 		}
	// 	}
	// }

	// .nav-cta {
	// 	--radius-ratio: 1.5;
	// 	background-color: var(--color-primary-500);
	// 	color: var(--color-light-100);
	// 	font-weight: 500;
	// 	box-shadow: 0 0.5em 1em -0.5em rgba(0, 0, 0, 0);
	// 	transition: background-color 0.15s, border-radius 0.2s cubic-bezier(0.25, 0, 0, 1), box-shadow 0.2s ease-out;

	// 	:global(.button-parent:hover) &,
	// 	&:hover,
	// 	&:global([popover]) {
	// 		box-shadow: 0 0.5em 1em -0.5em var(--color-primary-700);
	// 		background-color: var(--color-primary-900);
	// 		color: white;
	// 		--radius-ratio: 1.2;
	// 	}
	// }
</style>
