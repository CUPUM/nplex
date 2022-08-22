<!--
	@component
	Primitive helper to add a password toggle button to input fields.
 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import type { FieldContext } from './Field.svelte';
	import Icon from './Icon.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';

	const { showPassword } = getContext<FieldContext>(Ctx.Field);

	function toggle() {
		$showPassword = !$showPassword;
	}
</script>

<Button {variant} on:click={toggle} square>
	<Icon name={$showPassword ? 'eye-open' : 'eye-cross'} size="1.5em" />
</Button>

<style lang="scss">
</style>
