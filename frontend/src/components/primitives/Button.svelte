<script lang="ts" context="module">
</script>

<script lang="ts">
	import { ripple } from '$actions/ripple';
	import Loading from '$components/primitives/Loading.svelte';
	import { cssSize } from '$utils/css';

	export let href: string = null;
	export let size: string | number = '1em';
	export let variant: 'default' | 'nav' | 'nav-cta' | 'cta' | 'secondary' | 'ghost' = 'default';
	export let disabled: boolean = undefined;
	export let loading: boolean = false;
	export let warning: boolean = false;
	export let square: boolean = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let active: boolean = false;
	export let display: 'inline' | 'block' = 'block';
	export let contentAlign: 'left' | 'center' | 'right' = 'center';
	export let width: string = undefined;
	export let value: string = undefined;
	export let form: string = undefined;

	let buttonRef;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={buttonRef}
	style:--size={cssSize(size)}
	style:width
	class="button {variant} {display} {contentAlign}"
	class:warning
	class:square
	class:active
	class:has-leading={$$slots.leading}
	class:has-trailing={$$slots.trailing}
	{disabled}
	{href}
	{type}
	{value}
	{form}
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
	<div class="content">
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
		--radius-ratio: var(--ctx-radius-ratio, 0.8);
		--height-ratio: 3;
		--computed-height: calc((var(--height-ratio) * var(--size)) - (2 * var(--inset, 0px)));
		--computed-size: calc(var(--computed-height) / var(--height-ratio));
		--computed-radius: calc(var(--radius-ratio) * var(--computed-size));
		// Use font-size: --computed-size in nested elements only else this messes with calcs when --size has "em" unit...
		font-size: var(--size);
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
		font-weight: 450;
		line-height: 1em;
		padding: 0 1.5em;
		margin: 0;
		gap: 0;
		flex-grow: 1;
		cursor: pointer;
		border-radius: var(--computed-radius);
		height: var(--computed-height);
		min-width: var(--computed-height);
		flex-wrap: nowrap;
		white-space: nowrap;
		border: none;
		font-family: inherit;

		&.center {
			.content {
				text-align: center;
			}

			&.has-leading,
			&.has-trailing {
				grid-template-columns:
					[leading-start]
					1fr
					[leading-end content-start]
					auto
					[content-end trailing-start]
					1fr
					[trailing-end];
			}
		}
		&.left {
			.content {
				text-align: left;
			}
		}
		&.right {
			.content {
				text-align: right;
			}
		}

		&.inline {
			display: inline-grid;
			flex-grow: 0;
		}

		&.square {
			flex: none;
			width: var(--computed-height);
			padding: 0;
			justify-content: center;

			&.content {
				justify-self: stretch;
			}
		}

		// Include attribute selector to also take account for anchor tags
		&:disabled,
		&[disabled='true'] {
			transform: scale(0.99);
			opacity: 0.5;
			pointer-events: none;
		}

		&.warning {
			outline-width: 2px;
			outline-color: var(--color-error-300);
			background-color: var(--color-error-100);
		}

		&.active:not(:global([popover])) {
			pointer-events: none;
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
		font-size: var(--computed-size);
		max-height: 100%;
		position: relative;
		top: -0.1em;
		padding: 0;
		margin: 0;
		display: block;
		grid-column: content;
		text-overflow: ellipsis;
	}

	.leading,
	.trailing {
		font-size: var(--computed-size);
		max-height: 100%;
		position: relative;
		top: -0.1em;
		padding: 0;
		margin: 0;
		display: block;
		transition: padding 0.25s ease-in-out;
	}

	.leading {
		text-align: left;
		grid-column: leading;

		&:not(:empty) {
			padding-right: 1em;
		}
	}

	.trailing {
		text-align: right;
		grid-column: trailing;

		&:not(:empty) {
			padding-left: 1em;
		}
	}

	//
	// Variants
	//

	.default {
		color: var(--color-dark-900);
		background-color: white;
		box-shadow: 0 0.5em 2em -1em transparent;
		transition: all 0.1s ease-out, box-shadow 0.25s ease-out;

		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&:global([popover]) {
			color: var(--color-light-300);
			background-color: var(--color-dark-700);
			box-shadow: 0 1em 2em -1.2em var(--color-dark-900);
		}

		&:active:not([popover]) {
			color: white;
			background-color: var(--color-primary-300);
			box-shadow: 0 1em 2em -1em var(--color-primary-700);
		}
	}

	.secondary {
		color: var(--color-dark-900);
		background-color: transparent;
		box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-500), 0.2);

		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&:global([popover]) {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-dark-100), 0.1);
			box-shadow: inset 0 0 0 3px rgba(var(--rgb-dark-500), 0);
		}
	}

	.cta {
		font-weight: 500;
		color: var(--color-light-100);
		background-color: var(--color-primary-500);
		box-shadow: 0 0.5em 1em -0.8em rgba(var(--rgb-primary-700), 0.5);
		transition: all 0.15s ease-out, box-shadow 0.3s ease-out;
		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&:global([popover]) {
			color: white;
			background-color: var(--color-primary-700);
			box-shadow: 0 1em 2em -1em rgba(var(--rgb-primary-700), 0.8);
		}
		&.active:not([popover]) {
			color: var(--color-primary-900);
			background-color: var(--color-primary-300);
		}
	}

	.ghost {
		color: var(--color-dark-300);
		background-color: transparent;
		transition: all 0.1s ease-out;

		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&:global([popover]) {
			color: var(--color-primary-700);
			background-color: rgba(var(--rgb-primary-300), 0.1);
		}
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
			border-radius: 3px;
			transform: translate(-50%, -100%);
			transition: opacity 0.2s, width 0.15s cubic-bezier(0, 0, 0, 1),
				transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
		}
		&.square::after {
			display: none;
		}

		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&:global([popover]) {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-dark-100), 0.1) !important;

			&::after {
				opacity: 1;
				width: 10px;
				transform: translate(-50%, 0%);
			}

			& .content {
				transform: translateY(-0.1em);
			}
		}

		&.active:not([popover]) {
			color: var(--color-primary-500);
			background-color: rgba(var(--rgb-light-100), 0.5);

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

		// prettier-ignore
		@at-root :global(.button-parent:hover) &,
		&:hover,
		&:global([popover]) {
			box-shadow: 0 0 0 3px rgba(var(--rgb-primary-500), 0.25);
			background-color: var(--color-primary-700);
			color: white;
			--radius-ratio: 1.4;
		}
	}
</style>
