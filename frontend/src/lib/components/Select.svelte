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
	import { isObject } from '$utils/object';
	import { getContext, setContext, type ComponentProps } from 'svelte';
	import Field from './Field.svelte';
	import FieldIcon from './FieldIcon.svelte';
	import Popover from './Popover.svelte';

	type Option = $$Generic<
		{ value: any; text: string | number; disabled?: boolean } | string | number
	>;

	export let variant: ComponentProps<Field>['variant'] = 'default';
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let options: Option[];
	export let placeholder: ComponentProps<Field>['placeholder'] = undefined;
	export let compact: ComponentProps<Field>['compact'] = undefined;
	export let disabled: ComponentProps<Field>['disabled'] = undefined;
	export let warning: ComponentProps<Field>['warning'] = undefined;
	export let success: ComponentProps<Field>['success'] = undefined;
	export let loading: ComponentProps<Field>['loading'] = undefined;
	export let tabindex: ComponentProps<Field>['tabindex'] = undefined;
	export let style: ComponentProps<Field>['style'] = undefined;
	let className: ComponentProps<Field>['class'] = undefined;
	export { className as class };

	let _open = false;
	$: text = value;

	function isSelected(option: Option) {
		if (typeof option === 'string' || typeof option === 'number') {
			return value === option;
		}
		return value === option.value;
	}

	function isDisabled(option: Option) {
		if (isObject(option)) {
			return !!option.disabled;
		}
		return false;
	}

	function setValue(option: Option) {
		if (typeof option === 'string' || typeof option === 'number') {
			value = option;
			return;
		}
		value = option.value;
	}

	setContext<SelectContext>(CTX_KEY, {});
</script>

<Popover bind:open={_open} let:open>
	<Field
		slot="control"
		readonly
		select
		{style}
		{variant}
		{placeholder}
		{compact}
		{disabled}
		{warning}
		{success}
		{loading}
		{tabindex}
		class={className}
		on:focus={() => {
			_open = true;
		}}
		on:blur={() => {
			_open = false;
		}}
	>
		<slot name="leading" slot="leading" />
		<svelte:fragment slot="label">
			{#if $$slots.label}
				<slot name="label" />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="trailing">
			<slot name="trailing" />
			<FieldIcon name="chevron-down" />
		</svelte:fragment>
	</Field>
	<svelte:fragment slot="content">
		{#if open}
			<menu>
				{#each options as option}
					{@const selected = isSelected(option)}
					{@const disabled = isDisabled(option)}
					<li
						on:pointerup={() => {
							if (disabled) {
								return;
							}

							_open = false;
						}}
						role="option"
						aria-selected={selected}
						aria-disabled={disabled}
						class:disabled
					>
						<slot {option} {focus} {value} {selected} {disabled} />
					</li>
				{/each}
			</menu>
		{/if}
	</svelte:fragment>
</Popover>

<style lang="scss" src="./Select/Select.scss">
	ul {
		background: black;
	}

	menu {
		display: flex;
		flex-direction: column;
		gap: 0;
		min-width: 100%;
	}

	li {
		cursor: pointer;
	}

	.disabled {
		pointer-events: none;
	}
</style>
