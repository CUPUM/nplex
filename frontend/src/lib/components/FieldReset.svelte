<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import { getFieldContext } from './Field.svelte';
	import Icon from './Icon.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';
	export let defaultValue: string | undefined = undefined;

	const { value, inputRef } = getFieldContext();

	$: computedDefaultValue = defaultValue ?? $inputRef?.defaultValue;

	$: show = $value !== computedDefaultValue;

	function reset() {
		value.set(computedDefaultValue);
	}
</script>

{#if show}
	<Button {variant} square on:click on:click={reset} tabindex={-1}>
		<Icon name="cross" />
	</Button>
{/if}
