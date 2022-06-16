<script lang="ts" context="module">
	export interface FieldContext {
		// inset: number | CssSizeValue;
	}
</script>

<script lang="ts">
	import { width } from '$transitions/width';
	import { Ctx } from '$utils/contexts';
	import { cssSize, type SizeInput } from '$utils/helpers/css';
	import type { SvelteProps } from '$utils/helpers/types';
	import { setContext } from 'svelte';
	import { expoInOut, expoOut } from 'svelte/easing';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	/** Field input type, useful for a11y. */
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	/** Styling options. */
	export let size: SizeInput = '1em';
	export let variant: 'default' | 'secondary' | 'ghost' | 'cta' | 'searchbar' = 'default';
	export let warning: boolean = undefined;
	export let success: boolean = undefined;
	export let disabled: boolean = undefined;
	export let loading: boolean = undefined;
	export let invalid: boolean = undefined;
	/** Regex validator to be used on submit & during user input */
	export let validator: RegExp = undefined;
	/** Auto formatting template for the user input */
	export let formatting = undefined;
	/** Placeholder text and field icon. */
	export let placeholder: string = '';
	export let placeholderIcon: SvelteProps<Icon>['name'] = undefined;
	/** Autocomplete choices */
	export let choices: string[] = undefined;
	/** Input text value */
	export let value = '';
	/** Focus state for styling of wrapper element instead of input element. */
	let focused = false;
	/** Filtering input type (temp fix for stoopid vendor auto-styling that breaks the UI (┛ಠ_ಠ)┛彡┻━┻) */
	let filteredType;
	$: filteredType = ['email', 'password'].includes(type) ? 'text' : type;

	let showPassword = false;

	setContext<FieldContext>(Ctx.Field, {
		// inset,
	});

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
	id="wrapper"
	class:warning={warning || invalid}
	class:success
	class:disabled={disabled || loading}
	class:has-icon={!value && placeholderIcon}
	class:focused
	class={variant}
	style:font-size={cssSize(size)}
	{...$$restProps}
>
	{#if $$slots.left}
		<div id="left">
			<slot name="left" />
		</div>
	{/if}
	{#if placeholderIcon && !value}
		<div id="icon" transition:width={{ opacity: 0, duration: 400, easing: expoInOut }}>
			<Icon name={placeholderIcon} />
		</div>
	{/if}
	<input
		{disabled}
		type="text"
		{value}
		{placeholder}
		on:input={handleInput}
		on:change
		on:click
		on:focus
		on:focus={focus}
		on:blur
		on:blur={blur}
		on:submit
		autocomplete="new-{type}"
		name={$$restProps.name}
	/>
	{#if value}
		<div id="has-value" transition:width={{ easing: expoOut, duration: 750, opacity: 0 }}>
			<Button variant="ghost" on:click={reset} square={true}>
				<Icon name="cross" slot="icon" />
			</Button>
			{#if type === 'password'}
				<Button variant="ghost" on:click={togglePassword} square={true}>(eye-icon)</Button>
			{/if}
			<slot name="has-value" />
		</div>
	{/if}
	{#if $$slots.right}
		<div id="right">
			<slot name="right" />
		</div>
	{/if}
	{#if choices}
		<ul>
			{#each choices as choice}
				<li>{choice}</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	#wrapper {
		--size: 3em;
		--inset: 3px;
		border: none;
		padding: 0 var(--inset);
		margin: 0;
		position: relative;
		display: inline-flex;
		flex-direction: row;
		border-radius: 1.1em;
		height: var(--size);
		outline-style: solid;
		outline-width: 2px;
		outline-color: transparent;
		transition: all 0.1s ease-out;
		overflow: visible;
	}

	#icon {
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
		padding-inline: 0.8em 1em;
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
		transition: all 0.15s ease-out, text-indent 0.35s cubic-bezier(0, 0, 0, 1);

		&::placeholder {
			font-weight: 300;
			opacity: 0.5;
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}

		/* &:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 50px var(--color-light-100) inset !important;
		}
		&:-webkit-autofill {
			-webkit-text-fill-color: var(--color-secondary-500) !important;
		} */
	}

	/* Default buttons */
	#has-value {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		gap: 3px;
		height: 100%;
		border-radius: 1em;
	}

	/* Slots */
	#left,
	#right {
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		white-space: nowrap;
		flex-direction: row;
		align-self: stretch;
		justify-content: flex-start;
		padding: var(--inset) 0;
		min-height: 100%;
		height: 100%;
		max-height: 100%;
		margin: 0;
	}

	#right {
		justify-content: flex-end;
	}

	/* Variants */
	/* Default theme */
	.default {
		background-color: rgba(var(--rgb-light-500), 0.9);
		color: var(--color-dark-100);
		width: 100%;
		&.focused {
			outline-color: white;
			background-color: white;
			box-shadow: 0 1em 2em -1em rgba(0, 0, 20, 0.2);

			& #icon {
				color: var(--color-primary-500);
			}
		}
		&:hover:not(.focused) {
			/* background-color: var(--color-light-300); */
			color: var(--color-dark-900);
		}
	}

	/* Secondary theme */

	/* Ghost theme */

	/* Cta theme */

	/* Searchbar theme */
	.searchbar {
		background-color: rgba(var(--rgb-light-500), 0.9);
		color: var(--color-dark-100);
		width: 100%;
		&.focused {
			outline-color: white;
			background-color: white;
			box-shadow: 0 1em 2em -1em rgba(0, 0, 20, 0.2);

			& #icon {
				color: var(--color-primary-500);
			}
		}
		&:hover:not(.focused) {
			/* background-color: var(--color-light-300); */
			color: var(--color-dark-900);
		}
	}
</style>
