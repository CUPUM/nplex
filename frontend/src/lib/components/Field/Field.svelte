<!--
	@component
	## Field
	Primitive single-line input field component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'field-context';

	type Value =
		| string
		| number
		| Record<string | number | symbol, unknown>
		| Array<unknown>
		| undefined
		| null;
	type InputRef =
		| HTMLInputElement
		| HTMLSelectElement
		| HTMLButtonElement
		| HTMLTextAreaElement
		| undefined;

	interface FieldContext {
		value: Writable<Value>;
		inputRef: Writable<InputRef>;
	}

	export function getFieldContext() {
		return getContext<FieldContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import Ripple from '../Ripple.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: Value = '';
	export let sample: Value = value;
	export let prefix: string | null | undefined = '';
	export let suffix: string | null | undefined = '';
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let variant: 'default' | 'outlined' | 'cta' | 'opaque' | 'dashed' = 'default';
	export let textAlign:
		| 'start'
		| 'end'
		| 'left'
		| 'right'
		| 'center'
		| 'justify'
		| 'match-parent'
		| undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let warning: boolean | undefined = undefined;
	export let success: boolean | undefined = undefined;
	/**
	 * Sets a warning state momentarily and unsets it after a 5s timeout.
	 */
	export let invalid: boolean | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let autocomplete: string | undefined = 'off';
	export let placeholder: string = '';
	export let pattern: RegExp | undefined = undefined;
	export let dirty: boolean = false;
	export let tabindex: number = 0;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	/**
	 * Only way to properly prevent label div when passing empty label slot (ex.: Select.svelte)
	 */
	export let nolabel: boolean = false;
	export function focus() {
		inputRef?.focus({});
	}
	export function blur() {
		inputRef?.blur();
	}

	let inputRef: InputRef;
	let labelWidth: number;
	let invalidSample: Value = null;
	let invalidTimer: any = null;
	$: hasvalue = !!value || value === 0;
	$: hasplaceholder = placeholder !== '';
	$: haslabel = $$slots.label && !nolabel;

	$: if (invalid) {
		invalidTimer = setTimeout(() => {
			clearInvalid();
		}, 5000);
	}

	const _inputRef = writable<InputRef>();
	$: _inputRef.set(inputRef);

	const _value = writable<typeof value>(value);
	$: value = $_value;
	$: _value.set(value);

	function bindInputRef(element: NonNullable<InputRef>) {
		inputRef = element;
	}

	function handleInput(e: Event) {
		if (e.target instanceof Element && 'value' in e.target) {
			if (type === 'number') {
				let number = Number(e.target.value);
				value = number;
			} else {
				value = e.target.value as Value;
			}
		}
		if (value !== invalidSample) {
			clearInvalid();
		}
	}

	function clearInvalid() {
		invalid = false;
		clearTimeout(invalidTimer);
		invalidTimer = null;
		invalidSample = null;
	}

	setContext<FieldContext>(CTX_KEY, {
		value: _value,
		inputRef: _inputRef,
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<fieldset
	class="container focus-outline-within {variant} {className}"
	{style}
	{disabled}
	class:compact
	class:warning={warning || invalid}
	class:readonly
	class:loading
	class:success
	class:dirty
	class:hasvalue
	class:hasplaceholder
	class:haslabel
	class:required
	style:--label-width="{labelWidth ?? 0}px"
	on:click|self={focus}
	on:click
	on:pointerdown
	on:pointerup
	on:keypress
	on:keydown
	on:keyup
>
	<Ripple />
	{#if $$slots.leading}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="aside leading" on:click|self={focus}>
			<slot {dirty} {value} name="leading" />
		</div>
	{/if}
	{#if haslabel}
		<label in:fly={{ y: 6, opacity: 0 }} for={id} bind:clientWidth={labelWidth}>
			<slot {dirty} {value} name="label" />
			<span class="star">*</span>
		</label>
	{/if}
	<!-- Placing outlines here to allow css dependence on label:empty with sibling selector -->
	<div class="outline left" />
	<div class="outline right" />
	<div class="outline bottom" />
	{#if prefix}
		<span class="affix prefix">{prefix}</span>
	{/if}
	<slot
		name="input"
		{autocomplete}
		{placeholder}
		{handleInput}
		{disabled}
		{required}
		{tabindex}
		{readonly}
		{pattern}
		{bindInputRef}
	>
		<input
			in:fly|local={{ y: 6, delay: 150, easing: expoOut, duration: 250 }}
			bind:this={inputRef}
			data-field-input
			class="input"
			style:text-align={textAlign}
			{autocomplete}
			{id}
			{type}
			{name}
			{placeholder}
			{value}
			{maxlength}
			{minlength}
			{min}
			{max}
			{step}
			{disabled}
			{required}
			{tabindex}
			{readonly}
			pattern={pattern ? pattern.source : undefined}
			on:input={handleInput}
			on:focus
			on:blur
			on:input
			on:change
		/>
	</slot>
	{#if suffix}
		<span class="affix suffix">{suffix}</span>
	{/if}
	{#if $$slots.trailing}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="aside trailing" on:click|self={focus}>
			<slot {dirty} {value} name="trailing" />
		</div>
	{/if}
</fieldset>

<style lang="scss">
	:where(.container) {
		--radius: var(--ui-radius-md);
		--height: var(--ui-height);
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
		align-items: stretch;
		font-weight: 400;
		font-size: inherit;
		border-radius: var(--radius);
		cursor: text;
		transition: transform 0.15s ease-out;
		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
		&.readonly {
			cursor: default;
		}
		&.warning {
			color: col(error, 700) !important;
			background: col(error, 100, 0.1) !important;

			.outline {
				border-color: col(error, 500) !important;
			}
		}
		&.success {
			color: col(success, 700) !important;
			background: col(success, 100, 0.1) !important;
		}
	}

	.aside {
		padding: var(--inset) 0;
		margin: 0;
		gap: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow-x: auto;
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

	.affix {
		align-self: center;
		position: relative;
		display: inline-block;
		padding-bottom: calc(0.5em - 0.5ex);
		top: 0;
		flex: 0;
		white-space: pre;
		opacity: 0.25;
		transition: all 0.2s var(--ui-ease-out);
		:focus-within &,
		:not(:focus-within):not(.haslabel) & {
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

	fieldset :global(*[data-field-input]) {
		cursor: inherit;
		font-family: inherit;
		font-weight: inherit;
		font-size: inherit;
		color: inherit;
		position: relative;
		padding-bottom: calc(0.5em - 0.5ex);
		grid-column: main;
		top: 0;
		flex: 1;
		white-space: nowrap;
		border: none;
		outline: none;
		background: transparent;
		text-overflow: ellipsis;
		transition: all 0.2s cubic-bezier(0.25, 0, 0, 1);
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			transition: background-color 0s 50000s;
		}
	}

	label {
		opacity: 0.35;
		position: absolute;
		pointer-events: none;
		padding-bottom: calc(0.5em - 0.5ex);
		grid-column: prefix-start / suffix-end;
		max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		top: 50%;
		transform: translateY(-50%);
		transition: all 0.15s var(--ui-ease-out);
	}

	.outline {
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
		display: none;
		color: col(primary, 900);
		padding-left: 0.2em;
		.required & {
			display: inline-block;
		}
	}

	.haslabel {
		.affix {
			opacity: 0;
		}
	}

	// Variants

	.default,
	.opaque {
		color: col(fg, 000);
		background: col(fg, 500, 0.05);
		// background: col(bg, 900);
		transition: color 0.1s ease-out, background 0.1s ease-out;
		.outline {
			display: none;
		}
		&.hasplaceholder,
		&.hasvalue,
		&:focus-within,
		&:has(:-webkit-autofill) {
			label {
				opacity: 0.5;
				top: 1.25em;
				font-size: clamp(11px, 0.5em, 24px);
			}
			.affix {
				opacity: 0.5;
			}
			&.haslabel {
				.affix,
				:global(*[data-field-input]) {
					top: 0.5em;
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(fg, 300);
			background: col(fg, 500, 0.1);
			// background: col(bg, 500);
		}
		&:focus-within {
			color: col(fg, 900);
			background: col(fg, 500, 0.1);
			// background: col(bg, 300);
			:global(*[data-field-input]) {
				opacity: 1;
			}
		}
	}

	.opaque {
		--ui-ripple-color: #{col(primary, 500)};
		color: col(fg, 100);
		background: col(bg, 300);
		box-shadow: 0 0.25rem 1rem -0.5rem transparent;
		transition: color 0.1s ease-out, background 0.1s ease-out, box-shadow 0.25s ease-out;
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(fg, 000);
			background: col(bg, 100);
		}
		&:focus-within {
			color: col(fg, 700);
			background: col(bg, 000);
			// box-shadow: 0 1rem 2rem -1rem rgb(0, 20, 40, 0.5);
			:global(*[data-field-input]) {
				opacity: 1;
			}
		}
	}

	.outlined,
	.dashed {
		color: col(fg, 100);
		background: transparent;
		transition: color 0.1s ease-out, background 0.1s ease-out;
		.outline {
			border-color: col(fg, 000);
			opacity: 0.25;
		}
		&.hasplaceholder,
		&.hasvalue,
		&:focus-within,
		&:has(:-webkit-autofill) {
			label {
				opacity: 0.5;
				top: 0em;
				padding-block: 0;
				font-size: clamp(12px, 0.5em, 24px);
			}
			.affix {
				opacity: 0.35;
			}
			&.haslabel {
				.left {
					right: var(--notch-padding);
				}
				.right {
					left: calc(var(--label-width) + var(--notch-padding));
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&:focus-within {
			color: col(fg, 500);
			background: transparent;
			.outline {
				opacity: 0.75;
			}
			label {
				opacity: 1;
			}
		}
		&:focus-within {
			outline: none;
			color: col(fg, 700);
			.outline {
				--thickness: 1.5px;
				opacity: 1;
				border-color: col(primary, 500);
			}
			label {
				color: col(primary, 500);
			}
		}
	}

	.dashed {
		.outline {
			border-style: dashed !important;
		}
	}

	.cta {
		color: col(bg, 300);
		background: col(primary, 500);
		box-shadow: 0 0.2em 1em -0.5em col(primary, 500, 0);
		transition: color 0.1s ease-out, background 0.1s ease-out, box-shadow 0.25s ease-in-out;
		.outline {
			display: none;
		}
		&.hasplaceholder,
		&.hasvalue,
		&:focus-within,
		&:has(:-webkit-autofill) {
			label {
				opacity: 0.5;
				top: 1.5em;
				font-size: clamp(11px, 0.5em, 24px);
			}
			.affix {
				opacity: 0.5;
			}
			&.haslabel {
				.affix,
				:global(*[data-field-input]) {
					top: 0.45em;
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&:focus-within {
			box-shadow: 0 0.8em 1.5em -1em col(primary, 900, 0.5);
			color: col(bg, 100);
			background: col(primary, 700);
			label {
				opacity: 0.5;
			}
		}
		&:focus-within {
			box-shadow: 0 0.5em 1em -0.5em col(primary, 900, 0.5);
			color: col(bg, 100);
		}
	}
</style>
