<!--
	@component
	## Button
	Primitive button component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'button-context';
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import type { ComponentStyleProps } from '$types/utils';
	import { UnbasedURL } from '$utils/url';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Href = $$Generic<string>;
	type As = $$Generic<'button' | 'label' | 'input'>;
	type ButtonProps = {
		tabindex?: typeof tabindex;
		as?: As;
		href?: Href;
		variant?: typeof variant;
		state?: typeof state;
		equi?: typeof equi;
		compact?: typeof compact;
		loading?: typeof loading;
		rounded?: typeof rounded;
		active?: typeof active;
		disabled?: typeof disabled;
		autoActive?: typeof autoActive;
		contentAlign?: typeof contentAlign;
		type?: typeof type;
	};
	type ButtonStyleProps = ComponentStyleProps<
		'button',
		{
			static: {
				'radius': string;
				'backdrop-filter': string;
			};
			dynamic: {
				'filter': string;
				'color': string;
				'side-color': string;
				'background': string;
				'border': string;
				'shadow': string;
			};
			conditions: 'hover' | 'focus' | 'active';
		}
	>;

	type $$Props = Omit<HTMLButtonAttributes, 'class'> & ButtonProps & ButtonStyleProps;

	export let as: As | undefined = undefined;
	export let variant: 'default' | 'outlined' | 'dashed' | 'cta' | 'ghost' = 'default';
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let state: '' | 'warning' | 'success' | 'error' = '';
	export let href: Href | undefined = undefined;
	export let equi: boolean | undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let loading: boolean | undefined = false;
	export let disabled: boolean | undefined = undefined;
	export let active: boolean | undefined = undefined;
	export let rounded: boolean | undefined = false;
	export let autoActive: boolean | undefined = true;
	export let contentAlign: 'start' | 'center' | 'end' = 'start';
	export let tabindex: number | undefined = undefined;

	$: element = (as ? as : href ? 'a' : 'button') as 'button' | 'a';
	$: hrefURL = href ? new UnbasedURL(href) : undefined;
	$: if (autoActive && hrefURL) {
		active = type === 'submit' ? false : $page.url.pathname === hrefURL.pathname;
	}
	$: iconAnimationClass = active ? ICON_CLASS.hold : ICON_CLASS.hover;
</script>

<svelte:element
	this={element}
	role="button"
	class="button {variant} {state} {contentAlign} {iconAnimationClass}"
	class:compact
	class:equi
	class:rounded
	class:active
	class:loading
	class:disabled
	{type}
	{disabled}
	href={element === 'a' ? href : undefined}
	{tabindex}
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
		<div class="content button-leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="content button-main">
		<slot />
	</div>
	{#if $$slots.trailing && !equi}
		<div class="content button-trailing">
			<slot name="trailing" />
		</div>
	{/if}
	{#if loading}
		<div class="button-loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	.button {
		// Exposed dynamic style props
		@include dynamic-props(
			'button',
			('color', 'side-color', 'background', 'border', 'shadow', 'filter'),
			('hover', 'focus', 'active')
		);
		// Exposed static style props
		--ui-button-radius: calc(
			var(--button-radius, var(--radius, var(--ui-radius-md))) - var(--inset, 0px)
		);
		--ui-button-backdrop-filter: var(--button-backdrop-filter, none);
		// Private static style props
		--ui-button-size: calc(var(--ui-block-lg) - 2 * var(--inset, 0px));
		--ui-button-padding-inline: var(--ui-pad-md);
		// Base style
		position: relative;
		display: inline-grid;
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
		filter: var(--ui-button-filter);
		backdrop-filter: var(--ui-button-backdrop-filter);
		outline: var(--ui-outline-inactive);
		transition: all 0.1s ease-out;
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border: var(--ui-button-border);
			border-radius: inherit;
			transition: all 0.1s ease-out;
		}
		&:focus-visible {
			outline: var(--ui-outline-active);
		}
		&:hover,
		&:focus-visible {
			color: var(--ui-button-hover-color);
			background-color: var(--ui-button-hover-background);
			box-shadow: var(--ui-button-hover-shadow);
			filter: var(--ui-button-hover-filter);
			&::after {
				border: var(--ui-button-hover-border);
			}
			.button-leading,
			.button-trailing {
				color: var(--ui-button-hover-side-color);
			}
		}
		&:global(.active) {
			color: var(--ui-button-active-color);
			background-color: var(--ui-button-active-background);
			box-shadow: var(--ui-button-active-shadow);
			filter: var(--ui-button-active-filter);
			&::after {
				border: var(--ui-button-active-border);
			}
			.button-leading,
			.button-trailing {
				color: var(--ui-button-active-side-color);
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
		padding-bottom: 0.2em;
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: transform 0.1s ease-out;
	}
	.button-main {
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
	.button-leading {
		color: var(--ui-button-side-color);
		justify-content: flex-start;
		text-align: left;
		grid-column: leading;
		&:not(:empty) {
			padding-right: 0.5em;
		}
	}
	.button-trailing {
		color: var(--ui-button-side-color);
		justify-content: flex-end;
		text-align: right;
		grid-column: trailing;
		&:not(:empty) {
			padding-left: 0.5em;
		}
	}

	// Default variant
	.default {
		--button-variant-color: #{col(fg, 300)};
		--button-variant-background: #{col(fg, 100, 0.1)};
		--button-variant-hover-color: #{col(fg, 900)};
		--button-variant-hover-background: #{col(fg, 100, 0.2)};
		--button-variant-active-color: #{col(bg, 500)};
		--button-variant-active-background: #{col(fg, 300)};
		--button-variant-hover-filter: brightness(0.95);
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
		--ui-button-border-style: solid;
		--button-variant-color: #{col(fg, 500)};
		--button-variant-background: transparent;
		--button-variant-border: var(--ui-border-size) var(--ui-button-border-style) #{col(fg, 100, 0.1)};
		--button-variant-hover-color: #{col(fg, 900)};
		--button-variant-hover-background: #{col(fg, 100, 0.1)};
		--button-variant-hover-border: 3px var(--ui-button-border-style) transparent;
		--button-variant-active-color: #{col(bg, 500)};
		--button-variant-active-background: #{col(fg, 500)};
		--button-variant-active-border: 3px var(--ui-button-border-style) transparent;
		&.warning {
			--button-variant-color: #{col(error, 900)};
			--button-variant-border: var(--ui-border-size) var(--ui-button-border-style) currentColor;
			--button-variant-hover-color: #{col(error, 900)};
			--button-variant-hover-background: #{col(error, 900, 0.1)};
			--button-variant-active-color: #{col(error, 900)};
			--button-variant-active-background: #{col(error, 100, 0.1)};
		}
		&.error {
			--button-variant-color: #{col(error, 700)};
			--button-variant-background: #{col(error, 100, 0.1)};
			--button-variant-border: var(--ui-border-size) var(--ui-button-border-style) currentColor;
			--button-variant-hover-color: #{col(error, 900)};
			--button-variant-hover-background: #{col(error, 300, 0.2)};
			--button-variant-hover-border: 3px var(--ui-button-border-style) #{col(error, 500, 0)};
			--button-variant-active-color: #{col(error, 900)};
			--button-variant-active-background: #{col(error, 500, 0.2)};
			--button-variant-active-border: 3px var(--ui-button-border-style) #{col(error, 500, 0)};
		}
		&.success {
			--button-variant-color: #{col(success, 700)};
			--button-variant-background: #{col(success, 100, 0.1)};
			--button-variant-border: var(--ui-border-size) var(--ui-button-border-style) currentColor;
			--button-variant-hover-color: #{col(success, 900)};
			--button-variant-hover-background: #{col(success, 300, 0.2)};
			--button-variant-hover-border: 3px var(--ui-button-border-style) #{col(success, 500, 0)};
			--button-variant-active-color: #{col(success, 900)};
			--button-variant-active-background: #{col(success, 500, 0.2)};
			--button-variant-active-border: 3px var(--ui-button-border-style) #{col(success, 500, 0)};
		}
	}

	// Dashed variant
	.dashed {
		--ui-button-border-style: dashed;
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
		--button-variant-active-filter: brightness(0.9);
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
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
