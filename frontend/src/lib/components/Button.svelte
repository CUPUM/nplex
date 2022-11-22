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
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean = false;
	export let warning: boolean = false;
	export let compact: boolean = false;
	export let equi: boolean = false;
	export let round: boolean = false;
	export let type: 'button' | 'submit' | 'reset' | 'file' = 'button';
	let for_: string | undefined = undefined;
	export { for_ as for };
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
	export let as: keyof HTMLElementTagNameMap | undefined = undefined;

	let buttonRef: HTMLElement;
	const buttonGroupContext = getButtonGroupContext();
	const buttonGroupVariant = buttonGroupContext?.variant;

	$: computedVariant = variant ?? buttonGroupVariant ?? 'default';

	setContext<ButtonContext>(CTX_KEY, {});
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svelte:element
	this={as ? as : href && !disabled ? 'a' : 'button'}
	bind:this={buttonRef}
	class="button nest {computedVariant} {contentAlign} {className}"
	class:compact
	class:warning
	class:equi
	class:round
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
		--height: calc(var(--ui-height) - 2 * var(--ui-inset-sum));
		--inset: var(--ui-inset);
		position: relative;
		display: inline-grid;
		grid-template-columns:
			[full-start leading-padding-start]
			var(--ui-padding-inline)
			[leading-padding-end leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end trailing-padding-start]
			var(--ui-padding-inline)
			[trailing-padding-end full-end];
		grid-template-rows: minmax(var(--height), auto);
		border: none;
		padding: 0;
		font-family: inherit;
		gap: 0;
		flex-direction: row;
		align-items: center;
		font-weight: 350;
		font-size: 1em;
		border-radius: calc(var(--ui-radius) - var(--ui-inset-sum));
		cursor: pointer;
		letter-spacing: 0em;
		outline: 0px solid transparent;
		transform-origin: center;
	}
	.center {
		grid-template-columns:
			[full-start leading-padding-start]
			var(--ui-padding-inline)
			[leading-padding-end leading-start]
			1fr
			[leading-end main-start]
			auto
			[main-end trailing-start]
			1fr
			[trailing-end trailing-padding-start]
			var(--ui-padding-inline)
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
			var(--height)
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
		opacity: 0.5;
		pointer-events: none;
		.content {
			transform: scale(0.95);
		}
	}
	.warning {
		// outline-width: 2px;
		// outline-color: col(error, 500);
		// background: col(error, 100);
		color: col(error, 500);
	}
	.button:focus {
		.content {
			animation: press 0.25s ease-in-out;
		}
	}
	.button:focus-visible {
		outline: var(--ui-outline);
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
		.end:not(.equi) {
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

	:where(.default) {
		color: col(fg, 300);
		background: col(fg, 900, 0.1);
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 700);
			background: col(fg, 300);
		}
		&:global(.active) {
			color: col(bg, 900);
			background: col(fg, 900);
		}
	}

	:where(.outlined) {
		color: col(fg, 300);
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
			background: col(fg, 300);
			&::before {
				border: 5px solid transparent;
			}
		}
		&:global(.active) {
			color: col(bg, 900);
			background: col(fg, 900);
			&::before {
				border: 5px solid transparent;
			}
		}
	}

	:where(.ghost) {
		color: col(fg, 500);
		background: transparent;
		transition: all 0.1s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 700);
			background: col(fg, 300);
		}
		&:global(.active) {
			color: col(primary, 700);
			background: col(primary, 100, 0.3);
		}
	}

	:where(.cta) {
		color: col(bg, 300);
		background: col(primary, 500);
		// box-shadow: 0 0.2em 1em -0.5em col(primary, 500, 0);
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 100);
			background: col(primary, 700);
			// box-shadow: 0 0.8em 1.5em -1em col(primary, 900, 0.25);
		}
		&:global(.active) {
			filter: brightness(0.9);
			// box-shadow: 0 0.5em 1em -0.5em col(primary, 900, 0.5);
		}
	}

	:where(.danger) {
		color: col(bg, 300);
		background: col(error, 500);
		box-shadow: 0 0.2em 1em -0.5em col(error, 500, 0);
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			border: 1px solid col(error, 700);
			transition: all 0.1s ease-in-out;
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(bg, 100);
			background: col(error, 700);
			box-shadow: 0 0.8em 1.5em -1em col(error, 900, 0.5);
		}
		&:global(.active) {
			&:not(.disabled) {
				color: var(--color-error-300);
				background: var(--color-error-900);
				box-shadow: 0 0.5em 1em -0.5em col(error, 900, 0.5);
			}
		}
	}
</style>
