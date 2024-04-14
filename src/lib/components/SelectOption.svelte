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
	import { ChevronLeft } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let option: SelectElements['option'] | ComboboxElements['option'];
	export let isSelected: SelectHelpers['isSelected'] | ComboboxHelpers['isSelected'];
	export let value: SelectOption['value'] | ComboboxOption['value'];
	export let label: SelectOption['label'] | ComboboxOption['label'] | null;
	/**
	 * Allows manually overwritting if description slot should be displayed.
	 */
	export let hasDescription: any = $$slots.description;
</script>

<div class="option" use:melt={$option({ value, label: label ?? undefined })}>
	<div class="option-content">
		<slot />
		{#if $$slots.description && hasDescription}
			<div class="option-description"><slot name="description" /></div>
		{/if}
	</div>
	{#if $isSelected(value)}
		<div transition:scale={{ duration: 150, easing: cubicOut }}></div>
		<ChevronLeft class="option-icon" />
	{/if}
</div>

<style>
	.option {
		cursor: pointer;
		padding: calc(var(--base-inline-padding) - 0.25em) var(--base-inline-padding);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1em;
		transition: all var(--duration-fast) ease-out;
		border-radius: var(--base-radius);

		&:hover {
			background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
			&:not([data-selected]) {
				.option-content {
					transform: translateX(0.25em);
				}
			}
		}

		&[data-selected] {
			font-weight: 450;
			color: var(--color-neutral-800);
			background-color: color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
			:global(:--dark) & {
				color: var(--color-neutral-100);
			}
		}

		:global(.option-icon) {
			width: 0.9em;
			height: 0.9em;
			stroke-width: 3.5;
			stroke-linejoin: round;
			color: var(--color-neutral-700);
			:global(:--dark) & {
				color: var(--color-neutral-300);
			}
		}
	}

	.option-content {
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		flex: 1;
		line-height: 1.5;
		transform: translateX(0);
		transition: all var(--duration-fast) ease-out;
	}

	.option-description {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: max(0.9em, var(--size-xs));
		opacity: 0.5;
		line-height: 1.5;
		font-weight: 350;
		margin-top: 0.5em;
	}
</style>
