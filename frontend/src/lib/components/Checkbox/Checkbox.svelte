<!--
	@component
	# Checkbox

 -->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import { STATES, VARIANTS, type State, type Variant } from '$utils/enums';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = Pick<
		HTMLInputAttributes,
		'name' | 'tabindex' | 'required' | 'readonly' | 'disabled'
	> & {
		variant?: Variant;
		state?: State;
		group?: V[];
		value?: V;
		checked?: boolean;
	};

	export let variant: Variant = VARIANTS.Default;
	export let state: State = STATES.Normal;
	export let group: V[] | undefined = undefined;
	export let value: V | undefined = undefined;
	export let checked: boolean | undefined = undefined;

	$: group && value != null && updateCheked(group, value);
	$: group && updateGroup(checked, value);

	function updateCheked(g: V[], v: V) {
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

<label class="checkbox {variant} {state}" class:disabled={$$props.disabled}>
	<input
		type="checkbox"
		{value}
		bind:checked
		{...$$restProps}
		on:change
		on:input
		on:focus
		on:blur
	/>
	<div class="checkbox-check">
		<Ripple />
		<!-- <Icon name="cross"></Icon> -->
	</div>
	{#if $$slots.default}
		<span class="toggle-content">
			<slot {checked} />
		</span>
	{/if}
</label>

<style lang="scss">
	@use './Checkbox.scss';
</style>
