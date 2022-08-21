<script lang="ts" context="module">
	export interface FieldContext {}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';
	import { cssSize } from '$utils/css';
	import { Ctx } from '$utils/values/keys';
	import { setContext } from 'svelte';

	export let value: string = '';
	export let prefix: string = '';
	export let suffix: string = '';
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
	export let display: 'inline' | 'block' = 'block';

	let focused = false;
	let hasPlaceholder = false;
	$: hasPlaceholder = placeholder !== '';
	let leadingWidth = 0;

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
	class="field {variant} {display}"
	style:--size={cssSize(size)}
	class:focused
	class:warning
	class:success
	class:disabled
	class:has-value={value !== ''}
	class:has-placeholder={hasPlaceholder}
	class:has-label={$$slots.label}
>
	{#if $$slots.leading}
		<div class="leading" bind:clientWidth={leadingWidth}>
			<slot name="leading" />
		</div>
	{/if}
	<label class="main">
		{#if prefix}
			<span class="prefix">{prefix}</span>
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
		{#if suffix}
			<span class="suffix">{suffix}</span>
		{/if}
	</label>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
	<fieldset style:--leading-width="{leadingWidth}px">
		{#if $$slots.label}
			<legend>
				<slot name="label" />
			</legend>
		{/if}
	</fieldset>
</div>

<style lang="scss">
	.field {
		--inset: 5px;
		--radius-ratio: 1;
		--height-ratio: 3;
		--computed-height: calc(var(--size) * var(--height-ratio));
		--computed-radius: calc(var(--size) * var(--radius-ratio));
		font-size: var(--size);
		position: relative;
		display: grid;
		grid-template-columns:
			[leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end];
		gap: 0;
		flex-direction: row;
		align-items: center;
		line-height: 1em;
		flex-wrap: nowrap;
		white-space: nowrap;
		height: var(--computed-height);
		border-radius: var(--computed-radius);
		padding: 0;
		margin: 0;

		&.inline {
			display: inline-grid;
		}

		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&.warning {
			outline-width: 2px;
			outline-color: var(--color-error-300);
			background-color: var(--color-error-100);
		}

		&.focused,
		&:not(.focused):not(.has-label) {
			.prefix,
			.suffix {
				transform: translateY(0);
				opacity: 0.5;
				transition: opacity 0.2s 0.1s ease-in-out, transform 0.25s 0.1s cubic-bezier(0.2, 0, 0.2, 1);
			}
		}
	}

	.main {
		grid-column: main;
		cursor: text;
		position: relative;
		display: inline-flex;
		height: 100%;
		align-items: center;
		padding: 0 1.5em;
		margin: 0;
	}

	.leading,
	.trailing {
		height: 100%;
		position: relative;
		padding: 0;
		margin: 0;
		gap: 0;
		display: flex;
		align-items: center;
		transition: padding 0.25s ease-in-out;

		&:not(:empty) {
			gap: 3px;
			padding: 0 var(--inset);
		}
	}

	.leading {
		grid-column: leading;
	}

	.trailing {
		grid-column: trailing;
	}

	.prefix,
	.suffix {
		white-space: pre;
		line-height: 1em;
		position: relative;
		top: -0.1em;
		display: inline-block;
		opacity: 0;
		transform: translateY(0.25em);
		transition: opacity 0.2s ease-in-out, transform 0.25s cubic-bezier(0.8, 0, 0.8, 1);
	}

	input {
		position: relative;
		grid-column: input;
		flex: 1;
		font-family: inherit;
		font-size: inherit;
		border-radius: inherit;
		border: none;
		outline: none;
		background-color: transparent;
		line-height: 1em;
		text-overflow: ellipsis;
		padding: 0;
		margin: 0;
		top: -0.1em;

		&::placeholder {
			color: currentColor;
			opacity: 0.35;
			transition: all 0.2s;

			@at-root .has-label:not(.focused) & {
				opacity: 0;
			}
		}
	}

	//
	// Notched outline styling
	//

	fieldset {
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		padding-left: var(--leading-width, 0px);
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 1em;
		border-radius: inherit;
		border: 1px solid transparent;
		transition: all 0.15s ease-in-out;
	}

	legend {
		white-space: nowrap;
		position: relative;
		font-size: 1em;
		line-height: calc(var(--computed-height) - 0.2em);
		height: 0;
		padding: 0;
		top: 0;
		margin-left: 1.5em;
		max-width: 0;
		transition: all 0.35s cubic-bezier(0, 0, 0, 1);
	}

	.focused,
	.has-value {
		legend:not(:empty) {
			max-width: 100%;
			line-height: 1em;
			font-size: max(12px, 0.5em);
			top: -0.8em;
			padding-inline: calc(0.5 * var(--size));
			margin-left: var(--size);
		}
	}

	//
	// Variants
	//

	.default {
		background-color: rgba(var(--rgb-dark-100), 0.1);

		&:hover {
		}
	}

	.secondary {
	}

	.ghost {
	}

	.cta {
	}
</style>
