<script lang="ts">
	import type { StrictHTMLInputTypeAttribute } from '$lib/utils/types';
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

	type $$Generic = {};
	type $$Props = {
		multiline?: boolean;
		variant?: 'outlined' | 'default' | 'ghost';
	} & ($$Generic extends true
		? HTMLTextareaAttributes & { value: HTMLTextareaAttributes['value'] }
		: HTMLInputAttributes & {
				value: HTMLInputAttributes['value'];
				type: StrictHTMLInputTypeAttribute;
		  });

	export let multiline: $$Generic = false;
	export let variant: $$Props['variant'] = 'default';
	export let value: $$Props['value'] = undefined;
</script>

<svelte:element this={multiline ? 'textarea' : 'input'} {...$$restProps} />

<style lang="scss">
</style>
