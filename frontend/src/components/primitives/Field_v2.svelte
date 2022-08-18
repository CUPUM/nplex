<script lang="ts" context="module">
	export interface FieldContext {}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';
	import { cssSize } from '$utils/css';
	import { Ctx } from '$utils/values/keys';
	import { setContext } from 'svelte';

	export let value: string = '';
	export let beforeValue: string = '';
	export let afterValue: string = '';
	export let name: string = undefined;
	export let size: string | number = '1em';
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let variant: 'default' | 'secondary' | 'cta' | 'ghost' = 'default';
	export let required: boolean = undefined;
	export let disabled: boolean = undefined;
	export let warning: boolean = undefined;
	export let success: boolean = undefined;
	export let invalid: boolean = undefined;
	export let maxlength: number = undefined;
	export let minlength: number = undefined;
	export let readonly: boolean = undefined;
	export let placeholder: string = '';
	export let leadingSeparator: boolean = false;
	export let trailingSeparator: boolean = false;
	export let format: (value: string) => string = undefined;
	export let validator = undefined;

	let focused = false;
	let hasPlaceholder = false;
	let leadingWidth = 0;
	let trailingWidth = 0;

	$: hasPlaceholder = placeholder !== '';

	function setValue(e) {
		value = format ? format(e.target.value) : e.target.value;
	}

	function handleFocus() {
		focused = true;
	}

	function handleBlur() {
		focused = false;
	}

	setContext<FieldContext>(Ctx.Field, {});
</script>

<div
	class="field {variant}"
	style:--size={cssSize(size)}
	style:--leading-width="{leadingWidth}px"
	style:--trailing-width="{trailingWidth}px"
	class:focused
	class:has-value={value !== ''}
	class:has-placeholder={hasPlaceholder}
>
	{#if $$slots.leading}
		<div class="leading" bind:clientWidth={leadingWidth}><slot name="leading" /></div>
	{/if}
	<label class="main">
		{#if beforeValue}
			<span class="before-value">{beforeValue}</span>
		{/if}
		<input
			class="input"
			{type}
			{placeholder}
			{value}
			{readonly}
			{maxlength}
			{minlength}
			{disabled}
			use:inputOnReset
			on:change
			on:reset
			on:input
			on:focus
			on:blur
			on:input={setValue}
			on:focus={handleFocus}
			on:blur={handleBlur}
		/>
		{#if afterValue}
			<span class="after-value">{afterValue}</span>
		{/if}
	</label>
	{#if $$slots.trailing}
		<div class="trailing" bind:clientWidth={trailingWidth}><slot name="trailing" /></div>
	{/if}
	<fieldset>
		<!-- {#if $$slots.label} -->
		<legend>
			<slot name="label" />
		</legend>
		<!-- {/if} -->
	</fieldset>
</div>

<style lang="scss">
	.field {
		--base: var(--default-size);
		--baseline: calc(var(--base) - 0.1em);
		--border-radius: var(--default-radius);
		--border-width: 1px;
		--padding-inline: 1.5em;
		--inset: var(--default-inset);
		font-size: var(--size);
		position: relative;
		display: inline-grid;
		grid-template-columns:
			[leading-start]
			auto
			[leading-end main-start]
			auto
			[main-end trailing-start]
			auto
			[trailing-end];
		gap: 0;
		max-height: var(--base);
		height: var(--base);
		line-height: var(--baseline);
		border-radius: var(--border-radius);
		padding: 0;
		margin: 0;
	}

	.leading,
	.trailing {
		position: relative;
		display: inline-flex;
		top: 0;
		flex-direction: row;
		padding: var(--inset);
		line-height: calc(var(--baseline) - 2 * var(--inset));
		margin: 0;
	}
	.leading {
		grid-column: leading;
	}
	.trailing {
		grid-column: trailing;
	}

	.main {
		grid-column: main;
		cursor: text;
		position: relative;
		display: inline-flex;
		height: 100%;
		line-height: var(--baseline);
		padding: 0 var(--padding-inline);
		vertical-align: baseline;
	}

	.before-value,
	.after-value {
		vertical-align: baseline;
		position: relative;
		display: inline-flex;
		opacity: 0;
		transform: translateY(0.25em);
		transition: opacity 0.2s ease-in-out, transform 0.25s cubic-bezier(0.8, 0, 0.8, 1);
	}
	.focused,
	.has-placeholder,
	.has-value {
		.before-value,
		.after-value {
			transform: translateY(0);
			opacity: 0.5;
			transition: opacity 0.2s 0.1s ease-in-out, transform 0.25s 0.1s cubic-bezier(0.2, 0, 0.2, 1);
		}
	}

	input {
		grid-column: input;
		display: inline-flex;
		font-family: inherit;
		font-size: inherit;
		border-radius: inherit;
		border: none;
		outline: none;
		background-color: transparent;
		line-height: var(--baseline);
		align-self: baseline;
		text-overflow: ellipsis;
		padding: 0;
		margin: 0;

		&::placeholder {
			color: lightcoral;
		}
	}

	/**
	* Notched outline styling
	*/

	fieldset {
		pointer-events: none;
		position: absolute;
		margin: 0;
		padding-block: 0;
		padding-inline: calc(var(--leading-width, 0px) + var(--padding-inline))
			calc(var(--trailing-width, 0px) + var(--padding-inline));
		inset: calc(-0.5 * var(--border-width));
		line-height: inherit;
		border-radius: inherit;
		border-width: var(--border-width);
		border-color: var(--border-color);
		border-style: solid;
		transition: all 0.15s cubic-bezier(0, 0, 0, 1);
	}

	legend {
		white-space: nowrap;
		position: relative;
		font-size: 1em;
		line-height: var(--baseline);
		align-self: baseline;
		height: 0;
		padding: 0;
		margin-left: 0;
		top: 0;
		max-width: 0%;
		text-overflow: ellipsis;
		transition: all 0.15s cubic-bezier(0, 0, 0, 1);
	}

	.focused,
	.has-value,
	.has-placeholder {
		legend:not(:empty) {
			max-width: 100%;
			font-size: clamp(10px, 0.7em, 24px);
			top: -0.7em;
			line-height: 1em;
			padding-inline: 0.5em;
			margin-left: -0.5em;
		}
	}

	// .has-value:not(.focused),
	// .has-placeholder:not(.focused) {
	// 	legend:not(:empty) {
	// 		font-size: clamp(10px, 0.7em, 24px);
	// 		top: -1.5em;
	// 		line-height: 1em;
	// 	}
	// }

	/**
	* Vaiants
	*/

	.default {
		&.focused {
			--border-width: 1.5px;
			color: var(--color-primary-500);
		}
	}
</style>
