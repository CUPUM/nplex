<!--
	@component
	Primitive helper to add a password toggle button to input fields.
 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';
	import Button from './Button_old.svelte';
	import type { FieldContext } from './Field.svelte';

	const { showPassword } = getContext<FieldContext>(Ctx.Field);

	function toggle() {
		$showPassword = !$showPassword;
	}
</script>

<Button variant="ghost" icon={$showPassword ? 'eye-open' : 'eye-cross'} on:click={toggle} />

<style lang="scss">
</style>
