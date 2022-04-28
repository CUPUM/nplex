<script lang="ts" context="module">
	export const checkboxContextKey = 'input-context';
</script>

<script lang="ts">
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import { sizes } from '$utils/sizes';
	import { getContext } from 'svelte';

	export let variant: 'normal' | 'secondary' | 'misc' = 'normal';
	export let size: number | CssSizeValue = undefined;
	export let labelPosition: 'left' | 'right' = 'right';
	export let tooltip: string = undefined;

	const checkboxContext = getContext(checkboxContextKey);

	/**
	 * Soft auto-determination of component size, where:
	 * - User-defined size has most precedence and is used if present.
	 * - Fallback size is smaller if the button is contextualised inside a 'button-parent' context setter.
	 * (Useful for field buttons and other nested uses)
	 */
	$: autoSize = size ? cssSize(size) : checkboxContext ? '0.8em' : '1em';
</script>

<label class="{variant} {labelPosition}" style:font-size={autoSize}>
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
