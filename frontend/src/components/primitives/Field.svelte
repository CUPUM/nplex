<!--
	@component
	Hello world.
 -->
<script lang="ts" context="module">
	export interface FieldContext {
		// inset: number | CssSizeValue;
	}
</script>

<script lang="ts">
	import { width } from '$transitions/width';
	import type { SvelteProps } from '$types/helpers';
	import { cssSize, type SizeInput } from '$utils/css';
	import { Ctx } from '$utils/keys';
	import { setContext } from 'svelte';
	import { expoIn, expoInOut, expoOut } from 'svelte/easing';
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
	let inputRef: HTMLInputElement;

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

	function selectInput() {
		inputRef.select();
	}
</script>

<div
	class:warning={warning || invalid}
	class:success
	class:focused
	class:disabled={disabled || loading}
	class:has-icon={!value && placeholderIcon}
	class="{variant} container"
	style:font-size={cssSize(size)}
>
	{#if $$slots.left}
		<div class="left">
			<slot name="left" {value} />
		</div>
	{/if}
	{#if placeholderIcon && !value}
		<div class="icon" transition:width={{ opacity: 0, duration: 400, easing: expoInOut }} on:click={selectInput}>
			<Icon name={placeholderIcon} />
		</div>
	{/if}
	<input
		bind:this={inputRef}
		{disabled}
		{type}
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
		on:keypress
		autocomplete="off"
		name={$$restProps.name}
	/>
	{#if value}
		<div
			class="has-value"
			in:width={{ easing: expoOut, duration: 500, opacity: 0 }}
			out:width={{ easing: expoIn, duration: 350, opacity: 0 }}
		>
			<Button type="reset" variant="ghost" on:click={reset} square={true} tabIndex="-1">
				<Icon name="cross" slot="icon" />
			</Button>
			{#if type === 'password'}
				<Button variant="ghost" on:click={togglePassword} square={true}>(eye-icon)</Button>
			{/if}
			<slot name="has-value" {value} />
		</div>
	{/if}
	{#if $$slots.right}
		<div class="right">
			<slot name="right" {value} />
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

<style lang="scss">
	.container {
		--size: var(--default-size);
		--inset: var(--default-inset);
		border: none;
		padding: 0 var(--inset);
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
		transition: all 0.15s cubic-bezier(0, 0, 0, 1);

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
	.has-value {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		gap: 3px;
		height: 100%;
		border-radius: 1em;
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
		padding: var(--inset) 0;
		min-height: 100%;
		height: 100%;
		max-height: 100%;
		margin: 0;
	}

	.right {
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

			& .icon {
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
		background-color: rgba(var(--rgb-light-300), 0.85);
		color: var(--color-dark-100);
		width: 100%;
		&.focused {
			outline-color: white;
			background-color: white;
			box-shadow: 0 1em 2em -0.5em rgba(var(--rgb-dark-900), 0.25);

			& .icon {
				color: var(--color-primary-500);
			}
		}
		&:hover:not(.focused) {
			background-color: white;
			box-shadow: 0 0.5em 2em -1em rgba(var(--rgb-dark-900), 0.25);
			color: var(--color-dark-900);
		}
	}
</style>
