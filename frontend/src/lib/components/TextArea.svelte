<script lang="ts" context="module">
	export interface FieldMultilineContext {}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';

	import { cssSize } from '$utils/styles';

	import { Ctx } from '$utils/keys';
	import { setContext } from 'svelte';

	export let value: string = '';
	export let beforeValue: string = '';
	export let afterValue: string = '';
	export let name: string = undefined;
	export let size: string | number = '1em';
	export let required: boolean = undefined;
	export let disabled: boolean = undefined;
	export let warning: boolean = undefined;
	export let success: boolean = undefined;
	export let invalid: boolean = undefined;
	export let maxlength: number = undefined;
	export let minlength: number = undefined;
	export let readonly: boolean = undefined;
	export let placeholder: string = '';
	export let rows: number = 5;
	export let format: (value: string) => string = undefined;
	export let validator = undefined;

	let focused = false;
	let hasPlaceholder = false;

	$: hasPlaceholder = placeholder !== '';

	function setValue(e) {
		value = format ? format(e.target.value) : e.target.value;
	}

	function handleFocus() {
		focused = true;
	}

	function handleBlur() {
		focused = false;
	}

	setContext<FieldMultilineContext>(Ctx.FieldMultiline, {});
</script>

<div class="field" style:--size={cssSize(size)}>
	{#if $$slots.leading}
		<div class="leading"><slot name="leading" /></div>
	{/if}
	<label class="main">
		{#if beforeValue}
			<span class="before-value">{beforeValue}</span>
		{/if}
		<textarea
			class="input"
			{placeholder}
			{value}
			{readonly}
			{maxlength}
			{minlength}
			{rows}
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
		{#if afterValue}
			<span class="after-value">{afterValue}</span>
		{/if}
	</label>
	{#if $$slots.trailing}
		<div class="trailing"><slot name="trailing" /></div>
	{/if}
</div>

<style lang="scss">
	.field {
		--base: 3.2em;
		--border-radius: 1em;
		--padding: 1.5em;
		font-size: var(--size);
		position: relative;
		display: inline-grid;
		grid-template-rows:
			[leading-start]
			auto
			[leading-end main-start]
			auto
			[main-end trailing-start]
			auto
			[trailing-end];
		gap: 0;
		min-height: var(--height);
		line-height: var(--height);
		border-radius: var(--border-radius);
		padding: 0;
		margin: 0;
	}

	textarea {
		font-size: inherit;
		font-family: inherit;
		line-height: 1.4em;
	}
</style>
