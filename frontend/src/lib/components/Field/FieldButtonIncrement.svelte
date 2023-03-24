<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import type { ComponentProps } from 'svelte';
	import { getFieldContext } from './Field.svelte';

	const { value, inputRef } = getFieldContext();
	/**
	 * How many steps to increment by?
	 */
	export let steps = 1;
	export let variant: ComponentProps<Button>['variant'] = 'ghost';
	export let up: true | undefined = undefined;
	export let down: true | undefined = undefined;
	export let equi: boolean = true;

	function increment() {
		if (!$inputRef || !($inputRef instanceof HTMLInputElement) || $inputRef.type !== 'number') {
			return;
		}
		if (up) {
			$inputRef.stepUp(steps);
		} else if (down) {
			$inputRef.stepDown(steps);
		}
		value.set($inputRef.value); // Else svelte is not aware of input update.
	}
</script>

<Button on:pointerdown={increment} {equi} {variant}>
	<slot>
		{#if up || down}
			<Icon name={up ? 'plus' : 'minus'} />
		{/if}
	</slot>
</Button>

<style lang="scss">
</style>
