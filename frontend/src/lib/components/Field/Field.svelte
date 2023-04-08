<!--
	@component
	## Field
	Primitive single-line input field component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'field-context';

	type InputRef =
		| HTMLInputElement
		| HTMLSelectElement
		| HTMLButtonElement
		| HTMLTextAreaElement
		| undefined;

	type InputType =
		| 'text'
		| 'password'
		| 'tel'
		| 'number'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'search'
		| 'time'
		| 'month'
		| 'week'
		| 'url';

	interface FieldContext {
		value: Writable<unknown>;
		inputRef: Writable<InputRef>;
		type: Writable<InputType>;
		min?: number;
		max?: number;
	}

	export function getFieldContext() {
		return getContext<FieldContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import type { ComponentStyleProps } from '$types/utils';
	import { snap } from '$utils/number';
	import { getContext, setContext } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import Ripple from '../Ripple.svelte';

	type V = $$Generic<Value>;

	type $$Props = HTMLInputAttributes &
		ComponentStyleProps<'field', {}> & {
			value?: V;
			prefix?: string | null;
			suffix?: string | null;
			type?: InputType;
			variant?: 'default' | 'cta' | 'outlined' | 'dashed' | 'ghost';
			state?: undefined | 'error' | 'success' | 'warning';
			textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
			compact?: boolean;
			loading?: boolean;
			warning?: boolean;
			success?: boolean;
			rounded?: boolean;
			focus?: () => void;
			blur?: () => void;
		};

	export let id: $$Props['id'] = undefined;
	export let value: any = '';
	export let prefix: $$Props['prefix'] = undefined;
	export let suffix: $$Props['suffix'] = undefined;
	export let type: $$Props['type'] = 'text';
	export let variant: $$Props['variant'] = 'default';
	export let state: $$Props['state'] = undefined;
	export let textAlign: $$Props['textAlign'] = undefined;
	export let compact: $$Props['compact'] = undefined;
	export let required: $$Props['required'] = undefined;
	export let readonly: $$Props['readonly'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let warning: $$Props['warning'] = undefined;
	export let success: $$Props['success'] = undefined;
	export let maxlength: $$Props['minlength'] = undefined;
	export let minlength: $$Props['maxlength'] = undefined;
	export let min: $$Props['min'] = undefined;
	export let max: $$Props['max'] = undefined;
	export let step: $$Props['step'] = undefined;
	export let loading: $$Props['loading'] = undefined;
	export let autocomplete: $$Props['autocomplete'] = 'off';
	export let placeholder: $$Props['placeholder'] = '';
	export let style: $$Props['style'] = undefined;
	export let rounded: boolean | undefined = undefined;
	let className: $$Props['class'] = '';
	export { className as class };
	export function focus() {
		inputRef?.focus({});
	}
	export function blur() {
		inputRef?.blur();
	}

	let inputRef: InputRef;
	let labelWidth: number;

	$: hasvalue = value != null && (value != '' || (typeof value === 'number' && value == 0));
	$: haslabel = $$slots.label;
	$: hasplaceholder = placeholder != null && placeholder !== '';
	$: computedPlaceholder = placeholder ? placeholder + (required ? ' *' : '') : undefined;

	// const dispatch = createEventDispatcher();

	const _type = writable<InputType>(type);
	$: type = $_type;
	$: _type.set(type ?? 'text');

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
				value = e.target.value;
			}
		}
	}

	/**
	 * Format the value when user done interacting (on change or on blur, tbd).
	 */
	function format() {
		if (value == null) {
			return;
		}
		if (typeof value === 'number') {
			if (max != null) {
				value = Math.min(+max, value);
			}
			if (min != null) {
				value = Math.max(+min, value);
			}
			if (step != null) {
				value = snap(value, +step, { origin: +(min ?? 0) });
			}
		}
	}

	/**
	 * Format the value eagerly, in concurrence with user interactions.
	 */
	function eagerFormat(value: unknown) {
		return value;
	}
	$: formattedValue = eagerFormat(value);

	setContext<FieldContext>(CTX_KEY, {
		value: _value,
		inputRef: _inputRef,
		type: _type,
	});

	// onDestroy(() => {
	// 	dispatch('destroy');
	// });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<fieldset
	class="field focus-outline-within {variant} {className}"
	{style}
	{disabled}
	class:compact
	class:warning
	class:readonly
	class:loading
	class:success
	class:hasvalue
	class:hasplaceholder
	class:haslabel
	class:required
	class:rounded
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
			<slot {value} name="leading" />
		</div>
	{/if}
	{#if haslabel}
		<label in:fly={{ y: 6, opacity: 0 }} for={id} bind:clientWidth={labelWidth}>
			<slot {value} name="label" />
			<span class="star">*</span>
		</label>
	{/if}
	<!-- Placing outlines here to allow css dependence on label:empty with sibling selector -->
	<div class="outline left" />
	<div class="outline right" />
	<div class="outline bottom" />
	{#if prefix || $$slots.prefix}
		<span class="affix prefix">
			<slot name="prefix">
				{@html prefix}
			</slot>
		</span>
	{/if}
	<slot
		name="input"
		{autocomplete}
		{placeholder}
		{handleInput}
		{disabled}
		{required}
		{readonly}
		{bindInputRef}
	>
		<input
			in:fly|local={{ y: 6, delay: 250, easing: cubicOut }}
			bind:this={inputRef}
			data-field-input
			class="input"
			style:text-align={textAlign}
			{autocomplete}
			{type}
			placeholder={computedPlaceholder}
			{value}
			{maxlength}
			{minlength}
			{min}
			{max}
			{step}
			disabled={disabled || !browser}
			{required}
			{readonly}
			{...$$restProps}
			on:input={handleInput}
			on:change={format}
			on:focus
			on:blur
			on:input
			on:change
		/>
	</slot>
	{#if suffix || $$slots.suffix}
		<span class="affix suffix">
			<slot name="suffix">
				{@html suffix}
			</slot>
		</span>
	{/if}
	{#if $$slots.trailing}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="aside trailing" on:click|self={focus}>
			<slot {value} name="trailing" />
		</div>
	{/if}
	<!-- For options list and other appended extensions -->
	<slot name="options" />
</fieldset>

<style lang="scss">
	.field {
		--border-thickness: var(--ui-border-size);
		--radius: var(--ui-radius-md);
		--height: var(--ui-block-lg);
		--inset: var(--ui-inset-md);
		--notch-padding: 0.25em;
		--gutter: calc(var(--ui-pad-md) / 3);
		--gutter-out: calc(2 * var(--ui-pad-md) / 3);
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
		&.warning,
		&.hasvalue:has(:out-of-range):not(:focus-within),
		&.hasvalue:has(:invalid):not(:focus-within) {
			--ui-outline-color: #{col(error, 500, 0.5)};
			color: col(error, 700) !important;
			background: col(error, 100, 0.1) !important;

			::placeholder,
			label {
				opacity: 0.5;
			}

			.outline {
				border-color: col(error, 500) !important;
			}
		}
		&.success {
			color: col(success, 700) !important;
			background: col(success, 100, 0.1) !important;
		}
	}

	::placeholder {
		opacity: 0.35;
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
		overflow: hidden;
		transition: all 0.2s cubic-bezier(0.25, 0, 0, 1);
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			transition: background-color 0s 50000s;
		}

		&[type='number'] {
			font-variant-numeric: tabular-nums;
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
		pointer-events: none;
		position: absolute;
		height: 50%;
		transition: all 0.15s ease-out;
		border-width: var(--border-thickness);
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
		// color: col(primary, 900);
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
				top: 1.3em;
				font-size: max(var(--ui-text-xs), 0.65em);
				// font-size: 0.65em;
			}
			.affix {
				opacity: 0.5;
			}
			&.haslabel {
				.affix,
				:global(*[data-field-input]) {
					top: 0.6em;
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(fg, 700);
			// background: col(fg, 500, 0.1);
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
				font-size: max(var(--ui-text-xs), 0.65em);
				// font-size: clamp(12px, 0.5em, 24px);
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
		&:hover:not(.readonly),
		&:focus-within:not(.readonly) {
			color: col(fg, 500);
			background: transparent;
			.outline {
				opacity: 0.75;
			}
			label,
			::placeholder {
				opacity: 0.5;
			}
		}
		&:focus-within {
			outline: none;
			color: col(fg, 700);
			.outline {
				opacity: 1;
				border-color: col(primary, 500);
			}
			label {
				opacity: 1 !important;
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
				font-size: clamp(var(--ui-text-xs), 0.5em, 24px);
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
