<!--
	@component
	# Token
	A token primitive input akin to a pill-shaped or chip-shaped checkbox.
	
-->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import { STATES, VARIANTS, type State, type Variant } from '$utils/enums';
	import type { HTMLAnchorAttributes, HTMLInputAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = (HTMLInputAttributes | HTMLAnchorAttributes) & {
		variant?: Variant;
		state?: State;
		active?: boolean;
		value?: V;
		group?: V[];
		type?: 'checkbox' | 'radio';
		href?: string;
		disabled?: boolean;
		readonly?: boolean;
	};

	export let variant: $$Props['variant'] = VARIANTS.Default;
	export let state: $$Props['state'] = STATES.Normal;
	export let active: $$Props['active'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let group: $$Props['group'] = undefined;
	export let type: $$Props['type'] = 'checkbox';
	export let href: $$Props['href'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let readonly: $$Props['readonly'] = undefined;

	let element: 'a' | 'label' | 'span';
	$: element = href ? 'a' : value != null || group ? 'label' : 'span';
	$: type === 'radio' && updateRadio(group, value);
	$: type === 'checkbox' && group && value != null && updateCheckbox(group, value);
	$: type === 'checkbox' && group && updateGroup(active, value);

	function updateRadio(g: $$Props['group'], v: $$Props['value']) {
		active = group === value;
	}

	function updateCheckbox(g: NonNullable<$$Props['group']>, v: NonNullable<$$Props['value']>) {
		active = g.indexOf(v) > -1;
	}

	function updateGroup(c?: boolean, v?: V) {
		if (!group || v == null) {
			return;
		}
		const index = group.indexOf(v);
		if (c) {
			if (index < 0) {
				group.push(v);
				group = group;
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1);
				group = group;
			}
		}
	}
</script>

<svelte:element
	this={element}
	class="token {variant} {state}"
	class:readonly
	class:disabled
	class:active
	{href}
	{...element === 'label' ? {} : $$restProps}
>
	{#if !readonly && !disabled}
		<Ripple />
	{/if}
	{#if element === 'label'}
		{#if type === 'checkbox'}
			<input
				type="checkbox"
				{value}
				bind:checked={active}
				{...$$restProps}
				on:change
				on:input
				on:focus
				on:blur
				on:keydown
			/>
		{:else}
			<input
				type="radio"
				{value}
				bind:group
				{...$$restProps}
				on:change
				on:input
				on:focus
				on:blur
				on:keydown
			/>
		{/if}
	{/if}
	{#if $$slots.leading}
		<span class="token-leading">
			<slot name="leading" {active} />
		</span>
	{/if}
	<span class="token-main">
		<slot {active} />
	</span>
	{#if $$slots.trailing}
		<span class="token-trailing">
			<slot name="trailing" {active} />
		</span>
	{/if}
</svelte:element>

<style lang="scss">
	@use './Token.scss';
</style>
