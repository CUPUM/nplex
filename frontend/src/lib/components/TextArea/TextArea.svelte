<!--
	@component
	# Text Area
	Multiline text input component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'text-area-context';

	interface TextAreaContext {
		value: Writable<string | null | undefined>;
		// textAreaRef: Writable<HTMLTextAreaElement>;
	}

	export function getTextAreaContext() {
		return getContext<TextAreaContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { getContext, setContext } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import Ripple from '../Ripple.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: string | null | undefined = null;
	export let variant: 'default' | 'outlined' | 'cta' = 'default';
	export let direction: 'row' | 'column' = 'column';
	export let resize: boolean | undefined = undefined;
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
	export let dirty: boolean = false;
	export let tabindex: number = 0;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export function focus() {
		textareaRef.focus();
	}
	export function blur() {
		textareaRef.blur();
	}

	let textareaRef: HTMLTextAreaElement;
	let labelWidth = 0;
	$: hasvalue = !!value;
	$: hasplaceholder = placeholder !== '';
	$: haslabel = $$slots.label;

	const _value = writable<typeof value>(value);
	$: value = $_value;
	$: _value.set(value);

	setContext<TextAreaContext>(CTX_KEY, {
		value: _value,
	});
</script>

<fieldset
	class="ui-text-area nest focus-outline-within {variant} {direction} {className}"
	{style}
	{disabled}
	class:compact
	class:warning
	class:readonly
	class:loading
	class:success
	class:invalid
	class:dirty
	class:hasvalue
	class:hasplaceholder
	class:haslabel
	class:required
	style:--text-area-label-width="{labelWidth}px"
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
		<div class="aside leading" on:pointerdown={focus}>
			<slot name="leading" />
		</div>
	{/if}
	<!-- Placing outlines here to allow use of CSS general sibling selector based on .leading -->
	<div class="outline left" />
	<div class="outline right" />
	<div class="outline bottom" />
	{#if $$slots.label}
		<label in:fly={{ y: 6, opacity: 0 }} for={id} bind:clientWidth={labelWidth}>
			<slot {dirty} name="label" />
			<span class="star">*</span>
		</label>
	{/if}
	<textarea
		bind:this={textareaRef}
		bind:value
		disabled={!browser || disabled}
		{name}
		{id}
		{required}
		{readonly}
		{placeholder}
		{maxlength}
		{minlength}
		{tabindex}
		class:resize
		on:focus
		on:blur
		on:change
		on:input
		in:fly={{ y: 6, easing: cubicOut, delay: 250 }}
	/>
	{#if $$slots.trailing}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="aside trailing" on:pointerdown={focus}>
			<slot name="trailing" />
		</div>
	{/if}
</fieldset>

<style lang="scss">
	@use './TextArea.scss';
</style>
