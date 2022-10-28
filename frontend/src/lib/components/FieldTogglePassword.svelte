<!--
	@component
	Primitive helper to add a password toggle button to input fields.
 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import { getFieldContext } from './Field.svelte';
	import Icon from './Icon.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';

	const { inputRef } = getFieldContext();

	function toggle() {
		$inputRef.type = $inputRef.type === 'password' ? 'text' : 'password';
	}
</script>

<Button {variant} on:click={toggle} square>
	<Icon name={$inputRef.type === 'password' ? 'eye-open' : 'eye-cross'} />
</Button>

<style lang="scss">
</style>
