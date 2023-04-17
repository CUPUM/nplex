<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Icon from '../Icon.svelte';
	import { getFieldContext } from './Field.svelte';

	export let variant: ComponentProps<Button<any, any>>['variant'] = 'ghost';
	export let value: any = null;
	export let disabled: boolean | undefined = undefined;

	const { value: fieldValue, inputRef } = getFieldContext();

	$: show = $fieldValue != value && $fieldValue != '' && $fieldValue != null && !disabled;

	function reset() {
		fieldValue.set(value);
	}
</script>

{#if show}
	<Button {variant} equi on:click on:click={reset} tabindex={-1}>
		<Icon name={value == null ? 'cross' : 'undo'} />
	</Button>
{/if}
