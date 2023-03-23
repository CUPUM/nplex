<script lang="ts">
	type ValueMaskSegment = {
		pattern: RegExp;
		placeholder: string | number;
	};

	type V = $$Generic;

	/**
	 * Unmasked, original value.
	 */
	export let value: V;
	/**
	 * Masking pattern and rendered characters Regexp.
	 */
	export let mask: (RegExp | ValueMaskSegment | string | number)[];

	function applyMask() {
		return;
	}

	function removeMask() {}

	function handleInput() {}

	let masked = applyMask();

	$: value, applyMask();
</script>

<slot {masked} {handleInput} />

<style lang="scss">
</style>
