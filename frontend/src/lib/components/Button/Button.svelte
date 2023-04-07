<!--
	@component
	## Button
	Primitive button component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'button-context';

	type ButtonElement = keyof Pick<
		SvelteHTMLElements,
		'a' | 'span' | 'button' | 'label' | 'div' | 'input'
	>;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import type { StylePropsDynamic, StylePropsStatic } from '$types/utils';
	import { UnbasedURL } from '$utils/url';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		SvelteHTMLElements,
	} from 'svelte/elements';

	type $$Props = (HTMLButtonAttributes | HTMLAnchorAttributes) &
		StylePropsStatic<'button', 'radius'> &
		StylePropsDynamic<
			'button',
			'color' | 'background' | 'border' | 'shadow',
			'hover' | 'checked'
		> & {
			tabindex?: number;
			as?: ButtonElement;
			href?: string;
			variant?: 'default' | 'outlined' | 'dashed' | 'cta' | 'ghost';
			state?: undefined | 'warning' | 'success' | 'error';
			equi?: boolean;
			compact?: boolean;
			loading?: boolean;
			rounded?: boolean;
			active?: boolean;
			disabled?: boolean;
			autoActive?: boolean;
			contentAlign?: 'start' | 'center' | 'end';
			type?: HTMLButtonAttributes['type'];
		};

	export let as: $$Props['as'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let type: $$Props['type'] = 'button';
	export let state: $$Props['state'] = undefined;
	export let href: $$Props['href'] = undefined;
	export let equi: $$Props['equi'] = undefined;
	export let compact: $$Props['compact'] = undefined;
	export let loading: $$Props['loading'] = false;
	export let disabled: $$Props['disabled'] = undefined;
	export let active: $$Props['active'] = undefined;
	export let rounded: $$Props['rounded'] = false;
	export let autoActive: $$Props['active'] = true;
	export let contentAlign: $$Props['contentAlign'] = 'start';
	export let tabindex: $$Props['tabindex'] = undefined;

	$: element = as ? as : href ? 'a' : 'button';
	$: hrefURL = href ? new UnbasedURL(href) : undefined;
	$: if (autoActive && hrefURL) {
		active = type === 'submit' ? false : $page.url.pathname === hrefURL.pathname;
	}
</script>

<svelte:element
	this={element}
	role="button"
	{type}
	class="button {variant} {state} {contentAlign} {active ? ICON_CLASS.hold : ICON_CLASS.hover}"
	class:compact
	class:equi
	class:rounded
	class:active
	class:loading
	class:disabled
	disabled={element === 'button' ? disabled : undefined}
	{tabindex}
	{href}
	{...$$restProps}
	on:click
	on:pointerdown
	on:pointercancel
	on:pointerup
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
	.button {
		// Dynamic style vars
		@include component-dynamic-vars(
			'button',
			('color', 'background', 'border', 'shadow'),
			('hover', 'focus', 'active')
		);
		// Exposed static style vars
		--ui-button-radius: calc(
			var(--button-radius, var(--radius, var(--ui-radius-md))) - var(--inset, 0px)
		);
		// Not exposed static style vars
		--ui-button-size: calc(var(--ui-block-lg) - 2 * var(--inset, 0px));
		--ui-button-padding-inline: var(--ui-pad-md);
		// Base style
		position: relative;
		display: grid;
		grid-template-columns:
			[full-start leading-padding-start]
			var(--ui-button-padding-inline)
			[leading-padding-end leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end trailing-padding-start]
			var(--ui-button-padding-inline)
			[trailing-padding-end full-end];
		grid-template-rows: var(--ui-button-size);
		border: none;
		padding: 0;
		gap: 0;
		flex-direction: row;
		align-items: center;
		font-weight: 400;
		border-radius: var(--ui-button-radius);
		cursor: pointer;
		letter-spacing: 0em;
		transform-origin: center;
		color: var(--ui-button-color);
		background: var(--ui-button-background);
		box-shadow: var(--ui-button-shadow);
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border: var(--ui-button-border);
			transition: all 0.1s;
		}
		&:hover,
		&:focus-visible {
			color: var(--ui-button-hover-color);
			background-color: var(--ui-button-hover-background);
			box-shadow: var(--ui-button-hover-shadow);
			&::after {
				border: var(--ui-button-hover-border);
			}
		}
		&:global(.active) {
			color: var(--ui-button-active-color);
			background-color: var(--ui-button-active-background);
			box-shadow: var(--ui-button-active-shadow);
			&::after {
				border: var(--ui-button-active-border);
			}
		}
		&.center {
			grid-template-columns:
				[full-start leading-padding-start]
				var(--ui-button-padding-inline)
				[leading-padding-end leading-start]
				1fr
				[leading-end main-start]
				auto
				[main-end trailing-start]
				1fr
				[trailing-end trailing-padding-start]
				var(--ui-button-padding-inline)
				[trailing-padding-end full-end];
		}
		&.compact {
			--ui-button-size: calc(var(--ui-block-md) - 2 * var(--inset, 0px));
		}
		&.equi {
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
				var(--ui-button-size)
				[main-end trailing-start]
				0
				[trailing-end trailing-padding-start]
				0
				[trailing-padding-end full-end];
		}
		&.disabled,
		&:disabled {
			opacity: 0.5;
			cursor: default;
			pointer-events: none;
			.content {
				transform: scale(0.9);
			}
		}
		&:focus {
			.content {
				animation: press 0.25s ease-in-out;
			}
		}
		&.loading {
			pointer-events: none;
			.content {
				transform: scale(0.95);
				opacity: 0.25;
			}
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

	// Default variant
	.default {
		--button-variant-color: #{col(fg, 500)};
		--button-variant-background: #{col(fg, 000, 0.15)};
		--button-variant-hover-color: #{col(bg, 700)};
		--button-variant-hover-background: #{col(fg, 500)};
		--button-variant-active-color: #{col(bg, 900)};
		--button-variant-active-background: #{col(fg, 000)};
		&.warning {
			--button-variant-color: #{col(notice, 900)};
			--button-variant-background: #{col(notice, 300, 0.25)};
			--button-variant-hover-color: #{col(fg, 900)};
			--button-variant-hover-background: #{col(notice, 300)};
			--button-variant-active-color: #{col(bg, 900)};
			--button-variant-active-background: #{col(fg, 000)};
		}
		&.error {
			--button-variant-color: #{col(error, 900)};
			--button-variant-background: #{col(error, 300, 0.25)};
			--button-variant-hover-color: #{col(fg, 900)};
			--button-variant-hover-background: #{col(error, 100)};
			--button-variant-active-color: #{col(bg, 900)};
			--button-variant-active-background: #{col(fg, 000)};
		}
		&.success {
			--button-variant-color: #{col(success, 900)};
			--button-variant-background: #{col(success, 300, 0.25)};
			--button-variant-hover-color: #{col(fg, 900)};
			--button-variant-hover-background: #{col(success, 300)};
			--button-variant-active-color: #{col(bg, 900)};
			--button-variant-active-background: #{col(fg, 000)};
		}
	}

	// Outlined variant(s)
	.outlined,
	.dashed {
		--button-variant-color: #{col(fg, 500)};
		--button-variant-background: transparent;
		--button-variant-border-style: solid;
		--button-variant-border: var(--ui-border-size) var(--border-style) #{col(fg, 100, 0.1)};
		--button-variant-hover-color: #{col(fg, 900)};
		--button-variant-hover-background: #{col(fg, 100, 0.1)};
		--button-variant-hover-border: 3px var(--border-style) transparent;
		--button-variant-active-color: #{col(fg, 700)};
		--button-variant-active-background: #{col(fg, 000, 0.1)};
		--button-variant-active-border: 3px var(--border-style) transparent;
		&.warning {
			--button-variant-color: #{col(error, 900)};
			--button-variant-border: var(--ui-border-size) var(--border-style) currentColor;
			--button-variant-hover-color: #{col(error, 900)};
			--button-variant-hover-background: #{col(error, 900, 0.1)};
			--button-variant-active-color: #{col(error, 900)};
			--button-variant-active-background: #{col(error, 100, 0.1)};
		}
		&.error {
			--button-variant-color: #{col(error, 700)};
			--button-variant-background: #{col(error, 100, 0.1)};
			--button-variant-border: var(--ui-border-size) var(--border-style) currentColor;
			--button-variant-hover-color: #{col(error, 900)};
			--button-variant-hover-background: #{col(error, 300, 0.2)};
			--button-variant-hover-border: 3px var(--border-style) #{col(error, 500, 0)};
			--button-variant-active-color: #{col(error, 900)};
			--button-variant-active-background: #{col(error, 500, 0.2)};
			--button-variant-active-border: 3px var(--border-style) #{col(error, 500, 0)};
		}
		&.success {
			--button-variant-color: #{col(success, 700)};
			--button-variant-background: #{col(success, 100, 0.1)};
			--button-variant-border: var(--ui-border-size) var(--border-style) currentColor;
			--button-variant-hover-color: #{col(success, 900)};
			--button-variant-hover-background: #{col(success, 300, 0.2)};
			--button-variant-hover-border: 3px var(--border-style) #{col(success, 500, 0)};
			--button-variant-active-color: #{col(success, 900)};
			--button-variant-active-background: #{col(success, 500, 0.2)};
			--button-variant-active-border: 3px var(--border-style) #{col(success, 500, 0)};
		}
	}

	// Dashed variant
	.dashed {
		--border-style: dashed;
	}

	// Ghost variant
	.ghost {
		--button-variant-color: #{col(fg, 300)};
		--button-variant-background: transparent;
		--button-variant-hover-color: #{col(fg, 900)};
		--button-variant-hover-background: #{col(fg, 100, 0.05)};
		--button-variant-active-color: #{col(primary, 500)};
		--button-variant-active-background: #{col(primary, 100, 0.1)};
		&.warning {
			--button-variant-color: #{col(error, 900)};
		}
		&.error {
			--button-variant-color: #{col(error, 500)};
			--button-variant-hover-color: #{col(error, 700)};
			--button-variant-hover-background: #{col(error, 300, 0.2)};
			--button-variant-hover-color: #{col(error, 900)};
			--button-variant-hover-background: #{col(error, 500, 0.2)};
		}
		&.success {
			--button-variant-color: #{col(success, 500)};
			--button-variant-hover-color: #{col(success, 700)};
			--button-variant-hover-background: #{col(success, 300, 0.2)};
			--button-variant-hover-color: #{col(success, 900)};
			--button-variant-hover-background: #{col(success, 500, 0.2)};
		}
	}

	// Call to action variant

	.cta {
		--button-variant-color: #{col(bg, 500)};
		--button-variant-background: #{col(primary, 500)};
		--button-variant-shadow: 0 0.2em 1em -0.5em #{col(primary, 300, 0)};
		--button-variant-hover-color: #{col(bg, 900)};
		--button-variant-hover-background: #{col(primary, 700)};
		--button-variant-hover-shadow: 0 0.8em 1.5em -1em #{col(primary, 300, 0.25)};
		--button-variant-active-shadow: 0 0.5em 1em -0.5em #{col(primary, 300, 0.5)};
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
		&:global(.active) {
			filter: brightness(0.9);
		}
		&.warning {
			--button-variant-color: #{col(bg, 300)};
			--button-variant-background: #{col(error, 700)};
			--button-variant-shadow: 0 0.2em 1em -0.5em #{col(error, 500, 0)};
			--button-variant-hover-color: #{col(error, 100)};
			--button-variant-hover-background: #{col(error, 900)};
			--button-variant-hover-shadow: 0 0.8em 1.5em -1em #{col(error, 500, 0.25)};
			--button-variant-active-shadow: 0 0.5em 1em -0.5em #{col(error, 300, 0.5)};
		}
		&.error {
			--button-variant-color: #{col(error, 500)};
			--button-variant-background: #{col(bg, 000)};
			--button-variant-shadow: 0 0.2em 1em -0.5em #{col(error, 300, 0.25)};
			--button-variant-hover-color: #{col(error, 900)};
			--button-variant-hover-background: #{col(bg, 000)};
			--button-variant-hover-shadow: 0 0.8em 1.5em -1em #{col(error, 300, 0.5)};
			--button-variant-active-shadow: 0 0.5em 1em -0.5em #{col(error, 300, 0.5)};
		}
		&.success {
			--button-variant-color: #{col(success, 500)};
			--button-variant-background: #{col(bg, 000)};
			--button-variant-shadow: 0 0.2em 1em -0.5em #{col(success, 300, 0.25)};
			--button-variant-hover-color: #{col(success, 900)};
			--button-variant-hover-background: #{col(bg, 000)};
			--button-variant-hover-shadow: 0 0.8em 1.5em -1em #{col(success, 300, 0.5)};
			--button-variant-active-shadow: 0 0.5em 1em -0.5em #{col(success, 300, 0.5)};
		}
	}
</style>
