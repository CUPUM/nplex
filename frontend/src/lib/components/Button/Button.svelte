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
	import { page } from '$app/stores';

	import { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { getContext, setContext } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { getButtonGroupContext } from './ButtonGroup.svelte';

	export let href: HTMLAnchorAttributes['href'] = undefined;
	export let id: HTMLButtonAttributes['id'] = undefined;
	export let variant: 'default' | 'outlined' | 'ghost' | 'cta' | 'danger' | 'dashed' = 'default';
	export let disabled: HTMLButtonAttributes['disabled'] = undefined;
	export let loading: boolean = false;
	export let warning: boolean = false;
	export let compact: boolean = false;
	export let equi: boolean = false;
	export let round: boolean = false;
	export let type: 'button' | 'submit' | 'reset' | 'file' = 'button';
	export let readonly: boolean | undefined = undefined;
	let for_: string | undefined = undefined;
	export { for_ as for };
	export let active: boolean | undefined = false;
	export let autoActive: boolean = true;
	export let contentAlign: 'start' | 'center' | 'end' = 'start';
	export let value: HTMLButtonAttributes['value'] = undefined;
	export let form: HTMLButtonAttributes['form'] = undefined;
	export let title: HTMLButtonAttributes['title'] = undefined;
	export let formaction: HTMLButtonAttributes['formaction'] = undefined;
	export let formnovalidate: HTMLButtonAttributes['formnovalidate'] = undefined;
	export let tabindex: HTMLButtonAttributes['tabindex'] = undefined;
	let className: string | undefined = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export let as: keyof HTMLElementTagNameMap | undefined = undefined;
	export let noscroll: true | undefined = undefined;

	let buttonRef: HTMLElement;
	const buttonGroupContext = getButtonGroupContext();
	const buttonGroupVariant = buttonGroupContext?.variant;

	$: computedVariant = variant ?? buttonGroupVariant ?? 'default';
	$: if (autoActive && href) {
		active = $page.url.pathname === href.split('#')[0].split('?')[0];
	}

	setContext<ButtonContext>(CTX_KEY, {});
</script>

<svelte:element
	this={as ? as : href && !disabled ? 'a' : 'button'}
	bind:this={buttonRef}
	data-sveltekit-noscroll={noscroll ? '' : 'off'}
	class="button focus-outline-visible {computedVariant} {contentAlign} {className} {ICON_CLASS.hover}"
	class:compact
	class:warning
	class:equi
	class:round
	class:active
	class:disabled
	class:loading
	class:grouped={buttonGroupContext}
	role="button"
	{disabled}
	{style}
	{href}
	{id}
	{type}
	{value}
	{form}
	{title}
	{tabindex}
	{formaction}
	{readonly}
	{formnovalidate}
	for={for_}
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
	{#if $$slots.leading && !equi}
		<div class="content leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="content main">
		<slot />
	</div>
	{#if $$slots.trailing && !equi}
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
	:where(.button) {
		--button-height: calc(var(--ui-height) - 2 * var(--inset, 0px));
		--button-radius: calc(var(--radius, var(--ui-radius-md)) - var(--inset, 0px));
		position: relative;
		display: inline-grid;
		grid-template-columns:
			[full-start leading-padding-start]
			var(--ui-pad-x)
			[leading-padding-end leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end trailing-padding-start]
			var(--ui-pad-x)
			[trailing-padding-end full-end];
		grid-template-rows: var(--button-height);
		border: none;
		padding: 0;
		font-family: inherit;
		gap: 0;
		flex-direction: row;
		align-items: center;
		font-weight: 400;
		font-size: inherit;
		border-radius: var(--button-radius);
		cursor: pointer;
		letter-spacing: 0em;
		transform-origin: center;
	}
	.center {
		grid-template-columns:
			[full-start leading-padding-start]
			var(--ui-pad-x)
			[leading-padding-end leading-start]
			1fr
			[leading-end main-start]
			auto
			[main-end trailing-start]
			1fr
			[trailing-end trailing-padding-start]
			var(--ui-pad-x)
			[trailing-padding-end full-end];
	}
	.equi {
		flex: none;
		aspect-ratio: 1 / 1;
		justify-content: center;
		padding: 0;
		grid-template-columns:
			[full-start leading-padding-start]
			0
			[leading-padding-end leading-start]
			0
			[leading-end main-start]
			var(--button-height)
			[main-end trailing-start]
			0
			[trailing-end trailing-padding-start]
			0
			[trailing-padding-end full-end];
	}
	.round {
		border-radius: 999px;
	}
	.disabled,
	.button:disabled {
		opacity: 0.25;
		pointer-events: none;
		background: transparent;
		color: col(fg, 100);
		.content {
			transform: scale(0.95);
		}
	}
	.warning {
		color: col(error, 500);
	}
	.button:focus {
		.content {
			animation: press 0.25s ease-in-out;
		}
	}
	.loading {
		.content {
			transform: scale(0.98);
			opacity: 0.25;
		}
	}
	.content {
		position: relative;
		display: inline-block;
		line-height: 1em;
		padding-bottom: calc(0.5em - 0.5ex);
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: transform 0.1s ease-out;
	}
	.main {
		grid-column: main;
		.center &,
		.equi & {
			justify-content: center;
			text-align: center;
		}
		.start:not(.equi) & {
			justify-content: left;
			text-align: left;
		}
		.end:not(.equi) & {
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

	// Variants

	.default {
		color: col(fg, 500);
		background: col(fg, 100, 0.1);
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 700);
			background: col(fg, 500);
		}
		&:global(.active) {
			color: col(bg, 900);
			background: col(fg, 000);
		}
	}

	.outlined,
	.dashed {
		color: col(fg, 500);
		background: transparent;
		transition: all 0.1s ease-out;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			border: 1px solid currentColor;
			transition: all 0.1s ease-out;
			opacity: 0.25;
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 700);
			background: col(fg, 500);
			&::before {
				border: 5px solid transparent;
			}
		}
		&:global(.active) {
			color: col(bg, 900);
			background: col(fg, 000);
			&::before {
				border: 5px solid transparent;
			}
		}
	}

	.dashed {
		&::before {
			border-style: dashed !important;
		}
	}

	.ghost {
		color: col(fg, 300);
		background: transparent;
		transition: all 0.1s;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(fg, 900);
			background: col(bg, 900, 0.5);
		}
		&:global(.active) {
			color: col(primary, 500);
			&:hover {
				background: col(primary, 100, 0.1);
			}
		}
	}

	.cta {
		color: col(bg, 300);
		background: col(primary, 500);
		// box-shadow: 0 0.2em 1em -0.5em col(primary, 500, 0);
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 500);
			background: col(primary, 700);
			// box-shadow: 0 0.8em 1.5em -1em col(primary, 900, 0.25);
		}
		&:global(.active) {
			filter: brightness(0.9);
			// box-shadow: 0 0.5em 1em -0.5em col(primary, 900, 0.5);
		}
	}

	.danger {
		color: col(error, 500);
		background: col(error, 700, 0.2);
		box-shadow: 0 0.2em 1em -0.5em col(error, 500, 0);
		transition: all 0.1s ease-out, box-shadow 0.2s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: rgb(250, 245, 230);
			background: col(error, 700);
		}
		&:global(.active) {
			&:not(.disabled) {
				color: var(--color-error-300);
				background: var(--color-error-900);
			}
		}
	}
</style>
