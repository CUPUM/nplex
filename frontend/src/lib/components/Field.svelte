<!--
	@component
	## Field
	Primitive single-line input field component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'field-context';

	interface FieldContext {
		value: Writable<string | null | undefined>;
		inputRef: Writable<HTMLInputElement>;
	}

	export function getFieldContext() {
		return getContext<FieldContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import Ripple from './Ripple.svelte';

	export let id: string | undefined = undefined;
	export let value: string | null | undefined = '';
	export let prefix: string | null | undefined = '';
	export let suffix: string | null | undefined = '';
	export let name: string | undefined = undefined;
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let variant: 'default' | 'outlined' | 'cta' = 'default';
	export let compact: boolean | undefined = undefined;
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
	export let pattern: RegExp | undefined = undefined; // Figure out how to make work with ozd validators...
	export let dirty: boolean = false;
	export let tabindex: number = 0;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export function focus() {
		inputRef.focus();
	}

	let labelWidth = 0;
	let focused = false;
	let fieldRef: HTMLElement;
	let inputRef: HTMLInputElement;
	const _inputRef = writable<typeof inputRef>();
	$: _inputRef.set(inputRef);

	const _value = writable<typeof value>(value);
	$: value = $_value;
	$: _value.set(value);

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
		// if (format) ev = format(ev);
		value = ev;
	}

	function handleFocus() {
		focused = true;
		invalid = undefined;
		success = undefined;
	}

	function handleClick(e: MouseEvent) {
		if (
			e.target instanceof Element &&
			(e.target === fieldRef || e.target.parentElement === fieldRef)
		) {
			focus();
		}
	}

	function handleBlur(e: FocusEvent) {
		focused = false;
		checkValidity();
	}

	setContext<FieldContext>(CTX_KEY, {
		value: _value,
		inputRef: _inputRef,
	});
</script>

<div
	bind:this={fieldRef}
	class="field nest {variant} {className}"
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
	on:pointerup={handleClick}
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
			{#if required}<span class="star">*</span>{/if}<slot name="label" />
		</label>
	{/if}
	{#if prefix}
		<span class="prefix">{prefix}</span>
	{/if}
	<input
		bind:this={inputRef}
		class="input"
		autocomplete="new-{type}"
		{type}
		{name}
		{placeholder}
		{value}
		{maxlength}
		{minlength}
		{disabled}
		{required}
		{tabindex}
		{readonly}
		pattern={pattern ? pattern.source : undefined}
		use:inputOnReset
		on:input={handleInput}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:focus
		on:blur
		on:input
		on:keypress
		on:keydown
		on:keyup
		on:click
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
	:where(.field) {
		--radius: var(--ui-radius-md);
		--height: calc(var(--ui-height) - 2 * var(--inset-sum));
		--inset: var(--ui-inset);
		--notch-padding: 0.25em;
		--gutter: calc(var(--ui-pad-x) / 3);
		--gutter-out: calc(2 * var(--ui-pad-x) / 3);
		position: relative;
		display: grid;
		grid-template-columns:
			[full-start leading-start]
			minmax(var(--gutter-out), auto)
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
			minmax(var(--gutter-out), auto)
			[trailing-end full-end];
		grid-template-rows: minmax(var(--height), auto);
		gap: 0;
		flex-direction: row;
		align-items: center;
		font-weight: 350;
		font-size: inherit;
		border-radius: calc(var(--radius) - var(--inset-sum));
		cursor: text;
		outline: 0px solid transparent;
		transition: transform 0.15s ease-out;
		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}
		&.readonly {
			cursor: not-allowed;
		}
		&.warning {
			color: red !important;
			background: col(error, 100, 0.1);
		}
		&.invalid {
			color: col(error, 700) !important;
			background: col(error, 100, 0.1) !important;
		}
		&.success {
			color: col(success, 700) !important;
			background: col(success, 100, 0.1) !important;
		}
	}
	.leading,
	.trailing {
		padding: var(--inset) 0;
		margin: 0;
		gap: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
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
		padding-bottom: calc(0.5em - 0.5ex);
		top: 0;
		flex: 0;
		white-space: pre;
		opacity: 0.25;
		transition: all 0.2s var(--ui-ease-out);
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
		font-family: inherit;
		font-weight: inherit;
		font-size: inherit;
		position: relative;
		color: currentColor;
		margin: 0;
		padding: 0;
		padding-bottom: calc(0.5em - 0.5ex);
		grid-column: main;
		display: block;
		top: 0;
		flex: 1;
		white-space: nowrap;
		border: none;
		outline: none;
		background: transparent;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.2s cubic-bezier(0.25, 0, 0, 1);
		&::placeholder {
			color: currentColor;
			opacity: 0.35;
		}
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			transition: background-color 0s 50000s;
		}
	}
	label {
		position: absolute;
		pointer-events: none;
		padding-inline: var(--label-padding);
		padding-bottom: calc(0.5em - 0.5ex);
		grid-column: prefix-start / suffix-end;
		max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		top: 50%;
		transform: translateY(-50%);
		transition: all 0.2s var(--ui-ease-out);
	}
	.left,
	.right,
	.bottom {
		--thickness: 1px;
		pointer-events: none;
		position: absolute;
		height: 50%;
		transition: all 0.15s ease-out;
		border-width: var(--thickness);
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
	.star {
		color: col(primary, 900);
		padding-right: 0.2em;
	}

	// Variants

	:where(.default) {
		color: col(fg, 900);
		background: col(bg, 900, 0.5);
		transition: all 0.15s var(--ui-ease-out);
		.outline {
			display: none;
		}
		label {
			opacity: 0.5;
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
				top: 1.25em;
				font-size: clamp(11px, 0.5em, 24px);
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
		&:hover {
			color: col(fg, 500);
			background: col(bg, 900);
		}
		&.focused {
			color: col(fg, 000);
			background: col(bg, 700);
			input {
				opacity: 1;
			}
		}
	}

	:where(.outlined) {
		--outline-thickness: 1px;
		color: col(fg, 700);
		background: transparent;
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
		.outline {
			border-color: col(fg, 900);
			opacity: 0.2;
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
				opacity: 0.5;
				top: 0em;
				padding-block: 0;
				font-size: clamp(12px, 0.5em, 24px);
			}
			.prefix,
			.suffix {
				opacity: 0.35;
			}
			&.has-label {
				.outline.left {
					right: var(--notch-padding);
				}
				.outline.right {
					left: calc(var(--label-width) + var(--notch-padding));
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&.focused {
			color: col(fg, 300);
			background: transparent;
			.outline {
				opacity: 0.5;
			}
		}
		&.focused {
			outline: none;
			color: col(fg, 100);
			.outline {
				opacity: 1;
			}
			label {
				opacity: 1;
			}
		}
	}

	:where(.cta) {
		color: col(bg, 300);
		background: col(primary, 500);
		box-shadow: 0 0.2em 1em -0.5em col(primary, 500, 0);
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
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
				top: 1.25em;
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
			box-shadow: 0 0.8em 1.5em -1em col(primary, 900, 0.5);
			color: col(bg, 100);
			background: col(primary, 700);
			label {
				opacity: 0.5;
			}
		}
		&.focused {
			box-shadow: 0 0.5em 1em -0.5em col(primary, 900, 0.5);
			color: col(bg, 100);
		}
	}
</style>
