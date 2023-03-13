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
	import { STATES, VARIANTS, type State, type Variant } from '$utils/enums';
	import { snap } from '$utils/number';
	import { getContext, setContext } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import Ripple from '../Ripple.svelte';

	type V = $$Generic<Value>;

	type $$Props = HTMLInputAttributes & {
		value?: V;
		prefix?: string | null;
		suffix?: string | null;
		type?: InputType;
		variant?: Variant;
		state?: State;
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
	export let variant: $$Props['variant'] = VARIANTS.Default;
	export let state: $$Props['state'] = STATES.Normal;
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

	$: hasvalue = value != null;
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
	class="ui-field focus-outline-within {variant} {className}"
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
	@use './Field.scss';
</style>
