<script lang="ts">
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';

	import type { SvelteProps } from '$utils/helpers/types';
	import { sizes } from '$utils/sizes';
	import { fly } from 'svelte/transition';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	/**
	 * Field input type, useful for a11y.
	 */
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	/**
	 * Styling options.
	 */
	export let size: number | CssSizeValue = '1em';
	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' = 'normal';
	export let warning: boolean = undefined;
	export let display: 'inline' | 'block' = 'inline';
	export let disabled: boolean = undefined;
	export let invalid: boolean = undefined;
	/**
	 * Regex validator to be used on submit & during user input
	 */
	export let validator: RegExp = undefined;
	/**
	 * Auto formatting template for the user input
	 */
	export let formatting = undefined;
	/**
	 * Placeholder text and field icon.
	 */
	export let placeholder: string = '';
	export let placeholderIcon: SvelteProps<Icon>['name'] = undefined;
	/**
	 * Autocomplete choices
	 */
	export let choices: string[] = undefined;
	/**
	 * Input text value
	 */
	export let value = '';

	let focused = false;

	function handleInput(e) {
		value = e.target.value;
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
	id="wrap"
	class:warning
	class="{variant} {display}"
	style:font-size={cssSize(size)}
	{...$$restProps}
	class:no-placeholder={value || (!placeholder && !placeholderIcon)}
>
	{#if placeholderIcon}
		<div id="icon">
			<Icon name={placeholderIcon} style="position: absolute;" />
		</div>
	{/if}
	{#if $$slots.left}
		<div id="left">
			<slot name="left" />
		</div>
	{/if}
	<input
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
		data-lpignore="true"
		name={$$restProps.name}
		autocomplete={$$restProps.autocomplete || 'off'}
	/>
	{#if value}
		<div id="right" transition:fly={{ x: sizes[size] }}>
			<Button {size} icon="cross" on:click={reset} />
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
	#wrap {
		position: relative;
		display: flex;
		flex-direction: row;
		--size: 2.8em;
	}

	#icon {
		position: absolute;
		height: var(--size);
		width: var(--size);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		transform: translateX(0);
		transition: all 0.15s ease-out;
	}

	.no-placeholder {
		& #icon {
			opacity: 0;
			transform: translateX(-1em);
		}

		& input {
			text-indent: 0;
		}
	}

	input {
		flex: 1;
		font-size: 1em;
		padding: 1em;
		height: var(--size);
		text-indent: 1.5em;
		min-height: var(--size);
		max-height: var(--size);
		min-width: var(--size);
		border-radius: 0.8em;
		font-family: var(--font-main);
		font-weight: 400;
		background-color: var(--field-bg);
		color: var(--field-fg);
		outline-color: var(--color-primary-100);
		border: none;
		line-height: 1em;
		vertical-align: bottom;
		transition: all 0.15s ease-out;

		&::placeholder {
			font-weight: 400;
			opacity: 0.5;
		}

		&:hover {
			color: var(--field-hover-fg);
			background-color: var(--field-hover-bg);
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}

		&:focus {
			color: var(--field-active-fg);
			background-color: var(--field-active-bg);
		}
	}

	#right {
		position: absolute;
		right: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
		transform: scale(0.9);
	}

	/* Variants */
	.normal {
		--field-bg: var(--color-light-500);
		--field-hover-bg: var(--color-light-700);
		--field-active-bg: var(--color-light-300);
		--field-fg: var(--color-dark-100);
		--field-hover-fg: var(--color-primary-500);
		--field-active-fg: var(--color-dark-700);
	}
</style>
