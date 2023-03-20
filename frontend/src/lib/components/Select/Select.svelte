<!--
	@component
	# Select
	
-->
<script lang="ts" context="module">
	const CTX_KEY = 'select-context';
	interface SelectContext {}
	export function getSelectContext() {
		return getContext<SelectContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, type ComponentProps } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Field from '../Field/Field.svelte';
	import Icon from '../Icon.svelte';

	type O = $$Generic;

	type $$Props = ComponentProps<Field<O>> & {
		options: O[];
	};

	export let options: $$Props['options'];
	export let variant: ComponentProps<Field<O>>['variant'] = 'default';
	export let id: ComponentProps<Field<O>>['id'] = undefined;
	export let name: ComponentProps<Field<O>>['name'] = undefined;
	export let value: ComponentProps<Field<O>>['value'] = undefined;
	export let placeholder: ComponentProps<Field<O>>['placeholder'] = undefined;
	export let prefix: ComponentProps<Field<O>>['prefix'] = '';
	export let suffix: ComponentProps<Field<O>>['suffix'] = '';
	export let required: ComponentProps<Field<O>>['required'] = undefined;
	export let compact: ComponentProps<Field<O>>['compact'] = undefined;
	export let disabled: ComponentProps<Field<O>>['disabled'] = undefined;
	export let warning: ComponentProps<Field<O>>['warning'] = undefined;
	export let success: ComponentProps<Field<O>>['success'] = undefined;
	export let loading: ComponentProps<Field<O>>['loading'] = undefined;
	export let tabindex: ComponentProps<Field<O>>['tabindex'] = undefined;
	export let style: ComponentProps<Field<O>>['style'] = undefined;
	let className: ComponentProps<Field<O>>['class'] = undefined;
	export { className as class };

	let selectRef: HTMLSelectElement;
	let text: string | null = null;

	function updateText() {
		if (selectRef) {
			text = selectRef.options[selectRef.options.selectedIndex]?.text ?? null;
		} else {
			text = null;
		}
	}

	$: updateText(), value, selectRef;
</script>

<Field
	{style}
	{value}
	{prefix}
	{suffix}
	{id}
	{variant}
	{placeholder}
	{compact}
	{disabled}
	bind:warning
	bind:success
	{loading}
	{tabindex}
	{name}
	{required}
	class={className}
>
	<slot name="leading" slot="leading" />
	<svelte:fragment slot="label">
		{#if $$slots.label}
			<slot name="label" />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="input" let:bindInputRef>
		<input
			type="text"
			value={text}
			{placeholder}
			readonly
			data-field-input
			in:fly={{ y: 6, easing: cubicOut, delay: 250 }}
		/>
		<select
			size="0"
			bind:value
			bind:this={selectRef}
			{id}
			{name}
			{disabled}
			{required}
			{tabindex}
			use:bindInputRef
		>
			<option disabled={required} hidden={required} />
			{#if options.length}
				{#each options as option, i}
					<slot name="option" {option} {i} />
				{/each}
			{/if}
		</select>
	</svelte:fragment>
	<svelte:fragment slot="trailing">
		<button class="select-arrow" type="button" tabindex="-1">
			<Icon class="arrow" name="chevron-down" />
		</button>
		<slot name="trailing" />
	</svelte:fragment>
</Field>

<style lang="scss">
	select {
		cursor: pointer;
		position: absolute;
		border-radius: inherit;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: inherit;
		font-family: inherit;
		outline: none;
	}

	.select-arrow {
		pointer-events: none;
		position: relative;
		display: flex;
		align-self: stretch;
		flex-direction: row;
		align-items: center;
		padding-inline: calc(var(--ui-pad-inline) / 2) var(--ui-pad-inline);
		height: 100%;
		top: -0.15em;
		transition: top 0.25s var(--ui-ease-out);
	}
</style>
