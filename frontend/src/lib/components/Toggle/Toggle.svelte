<!--
	@component
	# Toggle
	A primitive toggle component with optional slotted content.

	## Group binding
	Uses a makeshift fix for nested group binding based on: https://github.com/sveltejs/svelte/issues/2308#issuecomment-539954299.
-->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import { STATES, type State } from '$utils/enums';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = Pick<
		HTMLInputAttributes,
		'name' | 'tabindex' | 'required' | 'readonly' | 'disabled'
	> & {
		variant?: 'default' | 'dashed' | 'outlined' | 'opaque';
		state?: State;
		group?: V[];
		value?: V;
		checked?: boolean;
		type?: 'checkbox' | 'radio';
	};

	export let variant: $$Props['variant'] = 'default';
	export let state: $$Props['state'] = STATES.Normal;
	export let type: $$Props['type'] = 'checkbox';
	export let group: $$Props['group'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let checked: $$Props['checked'] = undefined;

	$: type === 'radio' && updateRadio(group, value);
	$: type === 'checkbox' && group && value != null && updateCheckbox(group, value);
	$: type === 'checkbox' && group && updateGroup(checked, value);

	function updateRadio(g: $$Props['group'], v: $$Props['value']) {
		checked = group === value;
	}

	function updateCheckbox(g: NonNullable<$$Props['group']>, v: NonNullable<$$Props['value']>) {
		checked = g.indexOf(v) > -1;
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

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<label
	class="toggle {variant} {state}"
	class:disabled={$$props.disabled}
	role="switch"
	aria-checked={checked}
>
	{#if type === 'checkbox'}
		<input
			type="checkbox"
			{value}
			{...$$restProps}
			bind:checked
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
			{...$$restProps}
			bind:group
			on:change
			on:input
			on:focus
			on:blur
			on:keydown
		/>
	{/if}
	<div class="toggle-thumb-container">
		<Ripple />
		<div class="toggle-thumb" />
	</div>
	{#if $$slots.default}
		<span class="toggle-content">
			<slot {checked} />
		</span>
	{/if}
</label>

<style lang="scss">
	@use './Toggle.scss';
</style>
