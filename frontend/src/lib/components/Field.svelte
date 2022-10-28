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

	let leadingWidth = 0;
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
	style:--leading-width="{leadingWidth}px"
	style:--label-width="{labelWidth}px"
	on:pointerup={focus}
>
	<Ripple />
	{#if $$slots.leading}
		<div class="leading" bind:clientWidth={leadingWidth}>
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
	<div class="outline">
		<div class="left" />
		<div class="center" />
		<div class="right" />
	</div>
</div>

<style lang="scss">
	.field {
		--radius: var(--default-radius);
		--inset: var(--default-inset);
		--size: var(--default-size);
		position: relative;
		cursor: text;
		display: grid;
		grid-template-columns:
			[full-start leading-start]
			auto
			[leading-end leading-gutter-start]
			var(--default-padding-inline)
			[leading-gutter-end prefix-start]
			auto
			[prefix-end main-start]
			minmax(0, 1fr)
			[main-end suffix-start]
			auto
			[suffix-end trailing-gutter-start]
			var(--default-padding-inline)
			[trailing-gutter-end trailing-start]
			auto
			[trailing-end full-end];
		gap: 0;
		font-size: 1em;
		line-height: 1em;
		align-items: center;
		height: var(--size);
		border-radius: var(--radius);
		padding: 0;
		margin: 0;
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
		&.focused {
			outline: var(--default-focus-outline);
		}
	}

	.leading,
	.trailing {
		height: 100%;
		position: relative;
		padding: 0;
		margin: 0;
		gap: 0;
		display: flex;
		flex-direction: row;
		flex: 0 1 auto;
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
		flex: 0;
		top: -0.1em;
		white-space: pre;
		display: inline-block;
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
		position: relative;
		grid-column: main;
		top: -0.1em;
		flex: 1;
		font-family: inherit;
		font-size: inherit;
		border: none;
		outline: none;
		background: transparent;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0;
		margin: 0;
		color: currentColor;
		transition: all 0.2s cubic-bezier(0.25, 0, 0, 1);
		&::placeholder {
			color: currentColor;
			opacity: 0.35;
		}
	}
	label {
		pointer-events: none;
		position: absolute;
		padding-inline: var(--label-padding);
		grid-column: prefix-start / suffix-end;
		white-space: nowrap;
		max-width: 100%;
		text-overflow: ellipsis;
		height: 1em;
		top: calc((var(--size) - 1em) / 2 - 0.1em);
		transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
	}
	.outline {
		--thickness: 1px;
		--notch-padding: 0.5em;
		pointer-events: none;
		position: absolute;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: grid;
		border-width: 0px;
		border-style: solid;
		border-color: transparent;
		grid-template-columns:
			[full-start left-start]
			calc(var(--leading-width) + var(--default-padding-inline) - var(--notch-padding))
			[left-end center-start]
			min-content
			[center-end right-start]
			1fr
			[right-end full-end];
		transition: all 0.15s ease-out;
		.left,
		.center,
		.right {
			top: 0;
			border-width: var(--thickness);
			border-style: solid;
			border-color: currentColor;
		}
		.left {
			grid-column: left;
			border-top-left-radius: inherit;
			border-bottom-left-radius: inherit;
			border-right-width: 0;
		}
		.center {
			width: 0px;
			grid-column: center;
			border-width: 0;
			border-bottom-width: var(--thickness);
			transition: width 0.15s ease-out;
		}
		.right {
			grid-column: right;
			border-top-right-radius: inherit;
			border-bottom-right-radius: inherit;
			border-left-width: 0;
		}
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
		&:hover {
			color: var(--color-contrast-700);
			background-color: var(--color-base-900);
			&.has-label {
				.prefix,
				.suffix,
				input {
					top: 0.35em;
				}
				label {
					opacity: 0.35;
					top: 0.35em;
				}
			}
		}
		&.focused {
			color: var(--color-contrast-900);
			background-color: var(--color-base-900);
			&.has-label {
				.prefix,
				.suffix,
				input {
					top: 0.35em;
				}
			}
			label {
				opacity: 0.25;
				top: 0.35em;
			}
		}
	}

	// Outlined variant
	.outlined {
		color: var(--color-contrast-300);
		background-color: rgba(var(--rgb-base-900), 0.1);
		transition: all 0.1s ease-out;
		.outline {
			color: var(--color-contrast-100);
			opacity: 0.2;
		}
		label {
			top: -0.5em;
			opacity: 0;
			font-size: clamp(10px, 0.5em, 24px);
		}
		&:not(.has-placeholder):not(:hover):not(.focused):not(.has-value) {
			label {
				top: calc((var(--size) - 1em) / 2 - 0.1em);
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
				top: -0.8em;
			}
			.outline {
				opacity: 0.5;
			}
			&.has-label {
				.center {
					width: calc(var(--label-width) + 2 * var(--notch-padding));
				}
			}
		}
		&.focused {
			outline: none;
			color: var(--color-contrast-900);
			.outline {
				--thickness: 1.5px;
				opacity: 0.75;
			}
		}
	}

	// Ghost variant

	// Call-to-action variant
</style>
