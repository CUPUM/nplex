<script lang="ts" context="module">
</script>

<script lang="ts">
	import { ripple } from '$actions/ripple';
	import Loading from '$components/primitives/Loading.svelte';
	import { cssSize } from '$utils/css';

	export let href: string = null;
	export let size: string | number = '1em';
	export let variant: 'default' | 'nav' | 'nav-cta' | 'cta' | 'secondary' | 'ghost' = 'default';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let warning: boolean = false;
	export let square: boolean = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let active: boolean = false;
	export let display: 'inline' | 'block' = 'block';
	export let contentAlign: 'left' | 'center' | 'right' = 'center';
	export let width: string = undefined;

	let buttonRef;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={buttonRef}
	style:--size={cssSize(size)}
	style:width
	class="button {variant} {display}"
	class:warning
	class:square
	class:active
	{disabled}
	{href}
	{type}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mousedown
	on:mouseup
>
	<div class="ripple" use:ripple={{ controlElement: buttonRef }} />
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="content" style:text-align={contentAlign}>
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
	<slot name="badge" />
	{#if loading}
		<Loading color="currentColor" />
	{/if}
</svelte:element>

<style lang="scss">
	//
	// Base styling (variant agnostic)
	//

	.button {
		--radius-ratio: 1;
		--height-ratio: 3;
		--computed-size: calc(var(--size) - 2 * var(--inset, 0px));
		--computed-radius: calc(var(--radius-ratio) * var(--size) - var(--inset, 0px));
		--computed-height: calc(var(--height-ratio) * var(--size) - 2 * var(--inset, 0px));
		position: relative;
		display: grid;
		grid-template-columns:
			[leading-start]
			auto
			[leading-end content-start]
			1fr
			[content-end trailing-start]
			auto
			[trailing-end];
		flex-direction: row;
		align-items: center;
		font-size: var(--computed-size);
		font-weight: 400;
		line-height: 1em;
		padding: 0 1.5em;
		margin: 0;
		gap: 0;
		cursor: pointer;
		border-radius: var(--computed-radius);
		height: var(--computed-height);
		min-width: var(--computed-height);
		flex-wrap: nowrap;
		white-space: nowrap;
		border: none;
		font-family: inherit;

		&.inline {
			display: inline-grid;
		}

		&.square {
			width: var(--computed-height);
			padding: 0;
			justify-content: center;

			&.content {
				justify-self: stretch;
			}
		}

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&.warning {
			outline-width: 2px;
			outline-color: var(--color-error-300);
			background-color: var(--color-error-100);
		}
	}

	.ripple {
		pointer-events: none;
		position: absolute;
		border-radius: inherit;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.content {
		max-height: 100%;
		position: relative;
		top: -0.1em;
		padding: 0;
		margin: 0;
		display: block;
		grid-column: content;
	}

	.leading,
	.trailing {
		max-height: 100%;
		position: relative;
		top: -0.1em;
		padding: 0;
		margin: 0;
		display: block;
		transition: padding 0.25s ease-in-out;
	}

	.leading {
		grid-column: leading;

		&:not(:empty) {
			padding-right: 0.5em;
		}
	}

	.trailing {
		grid-column: trailing;

		&:not(:empty) {
			padding-left: 0.5em;
		}
	}

	//
	// Variants
	//

	.default {
	}

	.nav {
		--radius-ratio: 1.5;
		padding: 0 1.25em;
		font-weight: 500;
		color: var(--color-dark-900);
		transition: all 0.2s cubic-bezier(0, 0, 0.25, 1);

		.content {
			transition: transform 0.2s cubic-bezier(0.25, 2.25, 0.75, 0.5);
		}

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
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-dark-100), 0.1);

			&::after {
				opacity: 1;
				width: 6px;
				transform: translate(-50%, 50%);
			}

			& .content {
				transform: translateY(-0.1em);
			}
		}

		&.active {
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

	.nav-cta {
		--radius-ratio: 1.5;
		background-color: var(--color-primary-500);
		color: var(--color-light-100);
		font-weight: 500;
		box-shadow: 0 0 0 0 rgba(var(--rgb-primary-500), 0);
		transition: all 0.25s cubic-bezier(0, 0, 0.25, 1);

		&:hover {
			box-shadow: 0 0 0 3px rgba(var(--rgb-primary-500), 0.25);
			background-color: var(--color-primary-700);
			color: white;
			--radius-ratio: 1.2;
		}
	}
</style>
