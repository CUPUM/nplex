<script lang="ts">
	import {
		melt,
		type ComboboxElements,
		type ComboboxHelpers,
		type ComboboxOption,
		type SelectElements,
		type SelectHelpers,
		type SelectOption,
	} from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';

	export let option: SelectElements['option'] | ComboboxElements['option'];
	export let isSelected: SelectHelpers['isSelected'] | ComboboxHelpers['isSelected'];
	export let value: SelectOption['value'] | ComboboxOption['value'];
	export let label: SelectOption['label'] | ComboboxOption['label'] | null;
</script>

<div class="option" use:melt={$option({ value, label: label ?? undefined })}>
	{#if $isSelected(value)}
		<Check class="option-icon" />
	{/if}
	<slot />
</div>

<style lang="postcss">
	.option {
		padding: 1rem;

		:global(.option-icon) {
		}
	}
</style>
