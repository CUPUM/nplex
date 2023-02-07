<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Icon from '../Icon.svelte';
	import { getFieldContext } from './Field.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';
	export let defaultValue: any = null;

	const { value, inputRef } = getFieldContext();

	$: show = $value != defaultValue && $value != '';

	function reset() {
		value.set(defaultValue);
	}
</script>

{#if show}
	<Button {variant} equi on:click on:click={reset} tabindex={-1}>
		<Icon name="cross" />
	</Button>
{/if}
