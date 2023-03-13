<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { getFieldContext } from './Field.svelte';

	type O = $$Generic;

	export let options: O[];

	let focused = false;

	$: opened = focused; //&& $$slots.default;

	const { inputRef } = getFieldContext();

	$: if ($inputRef) {
		$inputRef.addEventListener('focus', handleFocus);
		$inputRef.addEventListener('blur', handleBlur);
	}

	/**
	 * Establish size and position of options box depending on viewport.
	 */
	function autoBox() {}

	function handleFocus() {
		focused = true;
	}

	function handleBlur() {
		focused = false;
	}
</script>

{#if opened}
	<ul
		class="field-options"
		in:slide={{ duration: 150, easing: cubicOut }}
		out:slide|local={{ duration: 100, easing: cubicIn }}
	>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
		<slot />
	</ul>
{/if}

<style lang="scss">
	.field-options {
		position: absolute;
		top: 100%;
		width: 100%;
		background: col(bg, 900);
		border-radius: inherit;
		margin-top: 0.5rem;
	}
</style>
