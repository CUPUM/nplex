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

	const { inputRef } = getFieldContext();

	function toggle() {
		if (!$inputRef) {
			return;
		}
		$inputRef.setAttribute('type', $inputRef.type === 'password' ? 'text' : 'password');
	}
</script>

<Button {variant} on:click={toggle} equi>
	<Icon name={$inputRef?.type === 'password' ? 'eye-open' : 'eye-cross'} />
</Button>

<style lang="scss">
</style>
