<script lang="ts">
	import { sizes } from '$utils/sizes';

	export let variant: 'normal' | 'secondary' | 'misc' = 'normal';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let labelPosition: 'left' | 'right' = 'right';
	export let tooltip: string = undefined;
</script>

<label class="{variant} {labelPosition}" style:font-size="{sizes[size]}px">
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
