<script context="module" lang="ts">
	/* Kinds */
	export const checkboxKinds = ['normal', 'secondary', 'misc'] as const;
	export type CheckboxKind = typeof checkboxKinds[number];
	/* Sizes */
	export const checkboxSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const;
	export type CheckboxSize = typeof checkboxSizes[number];
	/* Label positions */
	 export const checkboxLabelPositions = ['before', 'after'] as const;
	 export type CheckboxLabelPosition = typeof checkboxLabelPositions[number];
</script>

<script lang="ts">
	export let kind: CheckboxKind = 'normal';
	export let size: CheckboxSize = 'medium';
	export let labelPosition: CheckboxLabelPosition = 'before';
	export let tooltip: string = null;
</script>

<label class="{kind} {size} {labelPosition}">
	{#if $$slots.default}
		<span>
			<slot />
		</span>
	{/if}
	<input type="checkbox" {...$$props.rest} />
</label>

<style lang="postcss">
	label {
		position: relative;
	}

	input[type='checkbox'] {

	}

	span {

	}

	/* Sizes */
	.xsmall {
	}
	.small {
		font-size: var(--size-small);
	}
	.medium {
		font-size: var(--size-medium);
	}
	.large {
		font-weight: 550;
		font-size: var(--size-large);
	}
	.xlarge {
	}

	/* Kinds */
	.normal {
		--color: var(--color-dark-700);
		--background: var(--color-light-500);
	}
	.secondary {
		--color: purple;
		--background: lightblue;
	}
	.cta {
		--color: purple;
		--background: lightblue;
	}
</style>
