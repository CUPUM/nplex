<!--
	@component
	## Field
	Primitive single-line input field component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'field-context';

	interface FieldContext {
		value: Writable<string>;
		inputRef: Writable<HTMLInputElement>;
	}

	export function getFieldContext() {
		return getContext<FieldContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';
	import { forwardEvents } from '$utils/forwardEvents';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Ripple from './Ripple.svelte';

	export let id: string | undefined = undefined;
	export let value: string = '';
	export let prefix: string = '';
	export let suffix: string = '';
	export let name: string | undefined = undefined;
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let variant: 'default' | 'outlined' | 'ghost' | 'cta' = 'default';
	export let compact: boolean | undefined = undefined;
	export let leadingSeparator: boolean = false;
	export let trailingSeparator: boolean = false;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let warning: boolean | undefined = undefined;
	export let success: boolean | undefined = undefined;
	export let invalid: boolean | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let placeholder: string = '';
	export let pattern: RegExp | undefined = undefined;
	export let format: ((value: string) => string) | undefined = undefined;
	export let dirty: boolean = false;
	export let tabindex: number = 0;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export function focus() {
		inputRef.focus();
	}

	const _value = writable(value);
	$: value = $_value;
	$: _value.set(value);

	let inputRef: HTMLInputElement;
	const _inputRef = writable<typeof inputRef>();
	$: _inputRef.set(inputRef);

	let labelWidth = 0;
	let focused = false;
	let focusedOnce = false;

	function checkValidity() {
		invalid = !value
			? false
			: pattern
			? !inputRef?.checkValidity()
			: minlength
			? !(inputRef.value.length >= minlength)
			: maxlength
			? !(inputRef.value.length <= maxlength)
			: undefined;
		// success = pattern || minlength || maxlength ? !invalid : undefined;
	}

	function handleInput(e: Event) {
		const ev = (e.target as HTMLInputElement).value;
		value = format ? format(ev) : ev;
	}

	function handleFocus() {
		focused = true;
		invalid = undefined;
		success = undefined;
	}

	function handleBlur(e: FocusEvent) {
		focused = false;
		checkValidity();
	}

	forwardEvents(() => inputRef);

	setContext<FieldContext>(CTX_KEY, {
		value: _value,
		inputRef: _inputRef,
	});
</script>

<div
	class="field {variant} {className}"
	{style}
	class:compact
	class:warning
	class:focused
	class:disabled
	class:readonly
	class:loading
	class:success
	class:invalid
	class:dirty
	class:has-value={value !== ''}
	class:has-placeholder={placeholder !== ''}
	class:has-label={$$slots.label}
	style:--label-width="{labelWidth}px"
	on:pointerup={focus}
>
	<Ripple />
	<div class="outline left" />
	<div class="outline right" />
	<div class="outline bottom" />
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	{#if $$slots.label}
		<label for={id} bind:clientWidth={labelWidth}>
			<slot name="label" />
		</label>
	{/if}
	{#if prefix}
		<span class="prefix">{prefix}</span>
	{/if}
	<input
		bind:this={inputRef}
		class="input"
		autocomplete="current-{type}"
		{type}
		{name}
		{placeholder}
		{value}
		{maxlength}
		{minlength}
		{disabled}
		{required}
		{tabindex}
		readonly={!focusedOnce ?? readonly}
		pattern={pattern ? pattern.source : undefined}
		use:inputOnReset
		on:input={handleInput}
		on:focus={handleFocus}
		on:focus|once={() => (focusedOnce = true)}
		on:blur={handleBlur}
	/>
	{#if suffix}
		<span class="suffix">{suffix}</span>
	{/if}
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
</div>

<style lang="scss">
	.field {
		--radius: var(--default-radius);
		--inset: var(--default-inset);
		--size: var(--default-size);
		--gutter: calc(var(--default-padding-inline) / 3);
		--padding-inline: calc(2 * var(--default-padding-inline) / 3);
		--notch-padding: 0.5em;
		--outline-thickness: 1px;
		position: relative;
		display: inline-grid;
		grid-template-columns:
			[full-start leading-start]
			minmax(var(--padding-inline), auto)
			[leading-end leading-gutter-start]
			var(--gutter)
			[leading-gutter-end prefix-start]
			auto
			[prefix-end main-start]
			minmax(0, 1fr)
			[main-end suffix-start]
			auto
			[suffix-end trailing-gutter-start]
			var(--gutter)
			[trailing-gutter-end trailing-start]
			minmax(var(--padding-inline), auto)
			[trailing-end full-end];
		gap: 0;
		font-weight: 400;
		font-size: 1em;
		min-height: var(--size);
		border-radius: var(--radius);
		padding: 0;
		margin: 0;
		cursor: text;
		align-items: center;
		outline: 0px solid transparent;
		transition: transform 0.15s ease-out;
		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}
		&.warning {
			color: red !important;
			background-color: rgba(var(--rgb-error-100), 0.1);
		}
		&.invalid {
			color: var(--color-error-700) !important;
			background-color: rgba(var(--rgb-error-100), 0.1) !important;
		}
		&.success {
			color: var(--color-success-700) !important;
			background-color: rgba(var(--rgb-success-100), 0.1) !important;
		}
		&.dirty:not(.warning):not(.invalid):not(.success) {
			.outline {
				opacity: 1 !important;
				color: var(--color-secondary-700) !important;
			}
		}
	}
	.leading,
	.trailing {
		min-height: var(--size);
		position: relative;
		padding: 0;
		margin: 0;
		gap: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		transition: padding 0.15s ease-out;
		&:not(:empty) {
			gap: 3px;
			padding: var(--inset);
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
		position: relative;
		display: inline-block;
		padding-bottom: 0.25em;
		top: 0;
		flex: 0;
		white-space: pre;
		vertical-align: middle;
		opacity: 0.25;
		transition: all 0.2s cubic-bezier(0.25, 0, 0, 1);
		.focused &,
		:not(.focused):not(.has-label) & {
			transform: translateY(0);
			opacity: 0.5;
		}
	}
	.prefix {
		grid-column: prefix;
	}
	.suffix {
		grid-column: suffix;
	}
	input {
		padding: 0;
		margin: 0;
		padding-bottom: 0.25em;
		position: relative;
		display: flex;
		align-items: center;
		grid-column: main;
		top: 0;
		vertical-align: middle;
		white-space: nowrap;
		flex: 1;
		font-family: inherit;
		font-size: inherit;
		border: none;
		outline: none;
		background: transparent;
		overflow: hidden;
		text-overflow: ellipsis;
		color: currentColor;
		transition: all 0.2s cubic-bezier(0.25, 0, 0, 1);
		&::placeholder {
			color: currentColor;
			opacity: 0.35;
		}
		// &:focus-visible {
		// 	outline: var(--default-focus-outline);
		// }
	}
	label {
		pointer-events: none;
		position: absolute;
		padding-inline: var(--label-padding);
		grid-column: prefix-start / suffix-end;
		white-space: pre;
		max-width: 100%;
		text-overflow: ellipsis;
		min-height: var(--size);
		line-height: var(--size);
		padding-block: inherit;
		vertical-align: middle;
		white-space: nowrap;
		top: 0;
		transition: all 0.2s cubic-bezier(0, 0, 0, 1);
	}
	.left,
	.right,
	.bottom {
		pointer-events: none;
		position: absolute;
		height: 50%;
		transition: all 0.15s ease-out;
		border-width: var(--outline-thickness);
		border-style: solid;
	}
	.left {
		grid-column-end: leading-gutter-end;
		left: 0;
		right: 0;
		top: 0;
		border-top-left-radius: inherit;
		border-right-width: 0;
		border-bottom-width: 0;
	}
	.right {
		grid-column-start: leading-gutter-end;
		left: 0;
		right: 0;
		top: 0;
		border-left-width: 0;
		border-bottom-width: 0;
		border-top-right-radius: inherit;
	}
	.bottom {
		left: 0;
		right: 0;
		bottom: 0;
		border-top-width: 0;
		border-bottom-right-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	// Default variant
	.default {
		color: var(--color-dark-500);
		background-color: var(--color-base-500);
		transition: all 0.1s ease-out;
		.outline {
			display: none;
		}
		label {
			opacity: 0.35;
		}
		&.has-label {
			.prefix,
			.suffix {
				opacity: 0;
			}
		}
		&.has-placeholder,
		&.has-value,
		&.focused {
			label {
				top: -0.35em;
				font-size: clamp(10px, 0.5em, 24px);
			}
			.prefix,
			.suffix {
				opacity: 0.5;
			}
			&.has-label {
				.prefix,
				.suffix,
				input {
					top: 0.35em;
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&.focused {
			color: var(--color-contrast-700);
			background-color: var(--color-base-900);
			label {
				opacity: 0.5;
			}
		}
		&.focused {
			color: var(--color-contrast-900);
		}
	}

	// Outlined variant
	.outlined {
		color: var(--color-contrast-300);
		background-color: rgba(var(--rgb-base-900), 0.1);
		transition: all 0.1s ease-out;
		.outline {
			border-color: var(--color-contrast-100);
			opacity: 0.2;
		}
		label {
			opacity: 0;
			font-size: clamp(10px, 0.5em, 24px);
		}
		&:not(.has-placeholder):not(:hover):not(.focused):not(.has-value) {
			label {
				opacity: 0.35;
				font-size: 1em;
			}
			.prefix,
			.suffix {
				opacity: 0;
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&.focused {
			color: var(--color-contrast-700);
			background-color: transparent;
			label {
				opacity: 0.5;
				top: -1.65em;
				padding-block: 0;
			}
			.outline {
				opacity: 0.5;
			}
			&.has-label {
				.left {
					right: var(--notch-padding);
				}
				.right {
					left: calc(var(--label-width) + var(--notch-padding));
				}
			}
		}
		&.focused {
			outline: none;
			color: var(--color-contrast-900);
			.outline {
				--outline-thickness: 1.5px;
				opacity: 0.5;
			}
		}
	}

	// Ghost variant

	// Call-to-action variant
</style>
