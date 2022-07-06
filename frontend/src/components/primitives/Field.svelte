<!--
	@component
	This component provides a primitive single-line text-input field.
 -->
<script lang="ts" context="module">
	export interface FieldContext {}
</script>

<script lang="ts">
	import { slip } from '$transitions/slip';

	import type { SvelteProps } from '$types/helpers';
	import { cssSize, type SizeInput } from '$utils/css';
	import { Ctx } from '$utils/keys';
	import { setContext } from 'svelte';
	import { expoInOut } from 'svelte/easing';
	import Icon from './Icon.svelte';

	export let name: string = undefined;
	/**
	 * Field input type, useful for a11y.
	 */
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	/**
	 * Styling options.
	 */
	export let size: SizeInput = '1em';
	export let variant: 'default' | 'secondary' | 'ghost' | 'cta' | 'searchbar' = 'default';
	export let warning: boolean = undefined;
	export let success: boolean = undefined;
	export let disabled: boolean = undefined;
	export let loading: boolean = undefined;
	export let invalid: boolean = undefined;
	export let width: string = undefined;
	/**
	 * Regex validator to be used on submit & during user input
	 */
	export let validator: RegExp = undefined;
	/**
	 * Auto formatting template for the user input
	 */
	export let format = undefined;
	/**
	 * Placeholder text and field icon.
	 */
	export let placeholder: string = '';
	export let placeholderIcon: SvelteProps<Icon>['name'] = undefined;
	/**
	 * Input text value
	 */
	export let value = '';

	let inputRef: HTMLInputElement;
	/**
	 * Focus state for styling of wrapper element instead of input element.
	 */
	let focused = false;
	/**
	 * If type is password, this determines if the input content is rendered as bullets or chars.
	 */
	let showPassword = false;

	setContext<FieldContext>(Ctx.Field, {});

	function handleInput(e) {
		value = e.target.value;
	}

	function togglePassword() {
		showPassword = !showPassword;
	}

	function focus() {
		focused = true;
	}

	function blur() {
		focused = false;
	}

	function reset() {
		value = '';
	}
</script>

<div
	class:warning={warning || invalid}
	class:success
	class:focused
	class:disabled={disabled || loading}
	class="{variant} outer"
	style:font-size={cssSize(size)}
	style:width
>
	{#if $$slots.default}
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label on:click={() => inputRef.focus()}>
			<slot {value} />
		</label>
	{/if}
	<div class="inner">
		{#if $$slots.left}
			<div class="left">
				<slot name="left" {value} />
			</div>
		{/if}
		{#if placeholderIcon && !value}
			<div
				class="icon"
				on:click={() => inputRef.focus()}
				transition:slip={{ width: true, opacity: 0, duration: 400, easing: expoInOut }}
			>
				<Icon name={placeholderIcon} />
			</div>
		{/if}
		<input
			bind:this={inputRef}
			{disabled}
			{type}
			{value}
			{placeholder}
			{name}
			on:input={handleInput}
			on:change
			on:click
			on:focus
			on:focus={focus}
			on:blur
			on:blur={blur}
			on:submit
			on:keypress
			autocomplete="new-{type}"
		/>
		{#if value}
			<div class="has-value" transition:slip={{ width: true, opacity: 0, overflow: 'hidden' }}>
				<slot name="has-value" {value} />
			</div>
		{/if}
		{#if $$slots.right}
			<div class="right">
				<slot name="right" {value} />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.outer {
		--size: var(--default-size);
		--inset: var(--default-inset);
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}

	.outer > * {
		pointer-events: initial;
	}

	label {
		position: relative;
		display: block;
		padding: 0.5em 1em;
		font-size: max(0.8em, 12px);
		font-weight: 500;
		color: var(--color-dark-100);
	}

	.inner {
		border: none;
		padding: var(--inset);
		margin: 0;
		position: relative;
		display: inline-flex;
		flex-direction: row;
		border-radius: var(--default-radius);
		height: var(--size);
		outline-style: solid;
		outline-width: 2px;
		outline-color: transparent;
		transition: all 0.15s ease-out;
		overflow: visible;
		width: 100%;
	}

	.icon {
		cursor: pointer;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		padding-left: 0.8em;
		margin: 0;
		transform: translateX(0);
		transition: all 0.15s ease-out;
		top: -0.05em;
	}

	input {
		outline: none;
		display: flex;
		position: relative;
		flex: 1;
		font-size: 1em;
		padding-inline: 1em 1em;
		padding-block: 0.9em 1.1em;
		height: 100%;
		min-height: 100%;
		max-height: 100%;
		min-width: var(--size);
		font-family: var(--font-main);
		background-color: transparent;
		background: transparent;
		font-weight: 400;
		border: none;
		line-height: 1em;
		vertical-align: middle;
		border-radius: calc(var(--default-radius) - var(--inset));
		appearance: none;
		background-clip: text !important;
		transition: all 0.12s ease-out;

		&::placeholder {
			color: currentColor;
			opacity: 0.2;
			transition: all 0.5s;
		}

		@at-root .icon:hover + &:not(:focus)::placeholder,
			&:hover:not(:focus)::placeholder {
			opacity: 0.5;
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}

		&:invalid:not(:placeholder-shown) {
			color: red;
		}

		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			font-family: inherit !important;
			font-size: inherit !important;
		}
	}

	/* Slots */
	.left,
	.right {
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		white-space: nowrap;
		flex-direction: row;
		align-self: stretch;
		justify-content: flex-start;
		padding: 0;
		min-height: 100%;
		height: 100%;
		max-height: 100%;
		margin: 0;
	}

	.right {
		justify-content: flex-end;
	}

	.has-value {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		gap: 3px;
		height: 100%;
		border-radius: calc(var(--default-radius) - var(--inset));
	}

	/* Variants */
	/* Default theme */
	.default {
		& .inner {
			color: var(--color-dark-100);
			background-color: rgba(var(--rgb-dark-100), 0.1);
			width: 100%;
		}
		&.focused {
			& .inner {
				outline-color: var(--color-light-500);
				background-color: var(--color-light-500);
			}

			& .icon {
				color: var(--color-primary-500);
			}
		}

		&:hover:not(.focused) {
			& .inner {
				color: var(--color-dark-900);
				background-color: rgba(var(--rgb-light-500), 0.8);
			}
		}
	}

	/* Secondary theme */

	/* Ghost theme */

	/* Cta theme */

	/* Searchbar theme */
	.searchbar {
		& .inner {
			background-color: rgba(var(--rgb-light-300), 0.85);
			color: var(--color-dark-100);
			width: 100%;
		}

		&.focused {
			& .inner {
				outline-color: white;
				background-color: white;
				box-shadow: 0 1em 2em -0.5em rgba(var(--rgb-dark-900), 0.25);
			}

			& .icon {
				color: var(--color-primary-500);
			}
		}

		&:hover:not(.focused) {
			& .inner {
				background-color: white;
				box-shadow: 0 0.5em 2em -1em rgba(var(--rgb-dark-900), 0.25);
				color: var(--color-dark-900);
			}
		}
	}
</style>
