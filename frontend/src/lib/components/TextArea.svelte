<!--
	@component
	# Text Area
	Multiline text input component.

-->
<script lang="ts" context="module">
	const CTX_KEY = 'text-area-context';

	interface TextAreaContext {
		value: Writable<string>;
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
	export let value: string = '';
	export let name: string | undefined = undefined;
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
	let class_: string = '';
	export { class_ as class };
	export let style: string | undefined = undefined;
	export function focus() {
		textAreaRef.focus();
	}

	let textAreaRef: HTMLTextAreaElement;
	let focused = false;
	const _textAreaRef = writable<typeof textAreaRef>();
	$: _textAreaRef.set(textAreaRef);

	const _value = writable(value);
	$: value = $_value;
	$: _value.set(value);

	setContext<TextAreaContext>(CTX_KEY, {
		value: _value,
		textAreaRef: _textAreaRef,
	});
</script>

<div
	class="text-area nest {variant} {class_}"
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
		class="input"
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
</div>

<style lang="scss">
	:where(.text-area) {
		position: relative;
		display: grid;
		grid-template-rows:
			[full-start leading-start]
			auto
			[leading-end main-start]
			mimax(var(--ui-height), 1fr)
			[main-end trailing-start]
			auto
			[trailing-end full-end];
		padding: 0;
		margin: 0;
		border-radius: var(--ui-radius);
		background: col(fg, 100, 0.1);
		height: 400px;
		width: 100%;
	}

	.label {
	}

	.input {
		position: relative;
		// grid-row: main;
		font-family: inherit;
		font-size: inherit;
		line-height: 1.2em;
		padding: var(--ui-pad-x);
		background: transparent;
		border: none;
		outline: none;
	}
</style>
