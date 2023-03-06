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

	type Option = $$Generic;

	export let variant: ComponentProps<Field>['variant'] = 'default';
	export let id: ComponentProps<Field>['id'] = undefined;
	export let name: ComponentProps<Field>['name'] = undefined;
	export let value: ComponentProps<Field>['value'] = undefined;
	export let options: Option[];
	export let placeholder: ComponentProps<Field>['placeholder'] = undefined;
	export let prefix: ComponentProps<Field>['prefix'] = '';
	export let suffix: ComponentProps<Field>['suffix'] = '';
	export let required: ComponentProps<Field>['required'] = undefined;
	export let compact: ComponentProps<Field>['compact'] = undefined;
	export let disabled: ComponentProps<Field>['disabled'] = undefined;
	export let warning: ComponentProps<Field>['warning'] = undefined;
	export let success: ComponentProps<Field>['success'] = undefined;
	export let loading: ComponentProps<Field>['loading'] = undefined;
	export let tabindex: ComponentProps<Field>['tabindex'] = undefined;
	export let dirty: ComponentProps<Field>['dirty'] = undefined;
	export let style: ComponentProps<Field>['style'] = undefined;
	let className: ComponentProps<Field>['class'] = undefined;
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
	bind:dirty
	class={className}
	nolabel={!$$slots.label}
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
		<button>
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
		z-index: 1;
		font-size: inherit;
		font-family: inherit;
		outline: none;
	}

	button {
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
