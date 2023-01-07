<!--
	@component
	# Text Area
	Multiline text input component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'text-area-context';

	interface TextAreaContext {
		value: Writable<string | null | undefined>;
		textAreaRef: Writable<HTMLTextAreaElement>;
	}

	export function getTextAreaContext() {
		return getContext<TextAreaContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let id: string | undefined = undefined;
	export let value: string | null | undefined = null;
	export let name: string | undefined = undefined;
	export let variant: 'default' | 'outlined' | 'cta' = 'default';
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
	export let pattern: RegExp | undefined = undefined;
	export let dirty: boolean = false;
	export let tabindex: number = 0;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export function focus() {
		textAreaRef.focus();
	}

	let textAreaRef: HTMLTextAreaElement;
	let focused = false;
	const _textAreaRef = writable<typeof textAreaRef>();
	$: _textAreaRef.set(textAreaRef);

	const _value = writable<typeof value>(value);
	$: value = $_value;
	$: _value.set(value);

	setContext<TextAreaContext>(CTX_KEY, {
		value: _value,
		textAreaRef: _textAreaRef,
	});
</script>

<fieldset
	class="text-area nest {variant} {className}"
	{style}
	class:compact
	class:warning
	class:focused
	{disabled}
	class:readonly
	class:loading
	class:success
	class:invalid
	class:dirty
>
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	{#if $$slots.label}
		<label class="label" for={id}>
			<slot name="label" />
		</label>
	{/if}
	<textarea
		bind:this={textAreaRef}
		{name}
		{id}
		{required}
		{readonly}
		{placeholder}
		{maxlength}
		{minlength}
		{tabindex}
		bind:value
		on:focus={() => (focused = true)}
		on:focus
		on:blur
		on:click
		on:change
		on:input
	/>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
</fieldset>

<style lang="scss">
	:where(.text-area) {
		position: relative;
		display: grid;
		grid-template-rows:
			[full-start leading-start]
			auto
			[leading-end main-start]
			mimax(calc(3 * var(--lh)), 1fr)
			[main-end trailing-start]
			auto
			[trailing-end full-end];
		padding: 0;
		margin: 0;
		border-radius: var(--ui-radius-md);
		background: col(fg, 100, 0.1);
	}

	textarea {
		position: relative;
		grid-row: main;
		font-family: inherit;
		font-size: inherit;
		line-height: 1.5em;
		padding: calc(0.5 * var(--ui-height) - 0.75em) var(--ui-pad-x);
		background: transparent;
		border: none;
		resize: none;
		outline: none;
	}

	.outline {
	}
</style>
