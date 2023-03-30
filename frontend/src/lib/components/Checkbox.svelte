<script lang="ts">
	export let variant: 'default' | 'secondary' | 'misc' = 'default';
	export let size: string | number | undefined = undefined;
	export let labelPosition: 'before' | 'after' = 'after';
	export let checked: boolean = false;
</script>

<label class="{variant} {labelPosition}" {...$$props.rest}>
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
		font-size: var(--ui-block-small);
	}
	.medium {
		font-size: var(--ui-block-medium);
	}
	.large {
		font-weight: 550;
		font-size: var(--ui-block-large);
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
