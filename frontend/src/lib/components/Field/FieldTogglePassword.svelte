<!--
	@component
	Primitive helper to add a password toggle button to input fields.
 -->
<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import type { ComponentProps } from 'svelte';
	import { getFieldContext } from './Field.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';
	export let hold: boolean = true;

	const { inputRef, type } = getFieldContext();

	function handleDown() {
		if (!hold) {
			$type = $type === 'password' ? 'text' : 'password';
		} else {
			$type = 'text';
		}
	}

	function handleUp() {
		if (hold) {
			$type = 'password';
		}
	}
</script>

<Button
	{variant}
	on:pointerdown={handleDown}
	on:pointercancel={handleUp}
	on:pointerup={handleUp}
	equi
>
	<Icon name={$type === 'password' ? 'eye-open' : 'eye-cross'} />
</Button>

<style lang="scss">
</style>
