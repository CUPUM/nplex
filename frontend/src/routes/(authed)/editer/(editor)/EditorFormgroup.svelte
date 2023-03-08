<script lang="ts">
	export let legend: string | undefined = undefined;
	export let maxWith: 'md' | undefined = undefined;
</script>

<fieldset class={maxWith ?? ''}>
	{#if legend}
		<h3>{legend}</h3>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;
		padding: var(--ui-pad-outer);
		background: col(bg, 700);
		// border: 1px solid col(fg, 000, 0.1);
		border-radius: var(--ui-radius-lg);
		transition: all 0.15s;

		&.md {
			max-width: var(--ui-width-md);
		}

		@include laptop {
			padding: 2.5rem;
		}

		@include tablet {
			padding: 1.5rem 1.25rem;
		}
	}

	h3 {
		font-size: var(--ui-text-lg);
		font-weight: 450;
		margin-bottom: 2rem;
		margin-top: -0.5rem;

		@include tablet {
			font-size: var(--ui-text-md);
		}
	}
</style>
