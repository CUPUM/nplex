<script lang="ts">
	import { cssSize } from '$utils/css';
	import { Ctx } from '$utils/enums';
	import { getContext } from 'svelte';

	export let variant: 'default' | 'secondary' | 'misc' = 'default';
	export let size: string | number = undefined;
	export let labelPosition: 'before' | 'after' = 'after';
	export let checked;

	/**
	 * Detect affecting contexts in parents.
	 */
	const fieldCtx = getContext(Ctx.Field);

	/**
	 * Soft auto-determination of component size, where:
	 *
	 * - User-defined size has most precedence and is used if present.
	 * - Fallback size is smaller if the button is contextualised inside a 'button-parent' context
	 *   setter. (Useful for field buttons and other nested uses)
	 */
	$: autoSize = size ? cssSize(size) : fieldCtx ? '0.8em' : '1em';
</script>

<label class="{variant} {labelPosition}" style:font-size={autoSize} {...$$props.rest}>
	{#if $$slots.default}
		<span>
			<slot />
		</span>
	{/if}
	<input type="checkbox" bind:checked />
</label>

<style lang="scss">
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
		font-size: var(--ui-size-small);
	}
	.medium {
		font-size: var(--ui-size-medium);
	}
	.large {
		font-weight: 550;
		font-size: var(--ui-size-large);
	}
	.xlarge {
	}

	/* Kinds */
	.default {
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
