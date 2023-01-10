<!--
	@component
	# Dirtiness
	Wrapper component to track dirtiness of input value and expose check result through slot prop.
	Useful for styling and showing/hiding buttons related to inputs.
	
 -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let sample:
		| string
		| number
		| boolean
		| Record<string | number | symbol, unknown>
		| Array<unknown>
		| undefined
		| null;
	export let dirty = false;

	const dispatch = createEventDispatcher();

	function check(input: typeof sample | Event) {
		let value: typeof sample;
		if (!(input instanceof Event)) {
			value = input;
		} else {
			if (!input.target || !('value' in input.target)) {
				return;
			}
			if (
				typeof sample === 'boolean' &&
				'checked' in input.target &&
				typeof input.target.checked === 'boolean'
			) {
				value = input.target.checked as boolean;
			} else if (
				'value' in input.target &&
				(typeof input.target.value === 'string' || typeof input.target.value === 'number')
			) {
				value = input.target.value;
			} else {
				return;
			}
		}
		const flag = dirty;
		dirty = value !== sample;
		if (dirty) {
			dispatch('dirty');
		} else if (flag) {
			dispatch('clean');
		}
	}
</script>

<slot {dirty} {check} />

<style lang="scss">
</style>
