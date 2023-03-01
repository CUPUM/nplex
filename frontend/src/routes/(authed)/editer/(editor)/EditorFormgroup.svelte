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
		padding: 3rem;
		background: col(bg, 700);
		border-radius: var(--ui-radius-lg);
		transition: all 0.15s;

		&.md {
			max-width: var(--ui-width-md);
		}

		&:hover {
			border-color: col(fg, 000, 0.1);
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
		margin-bottom: 1em;
		&:first-child {
			margin-top: -0.5rem;
		}

		@include tablet {
			font-size: var(--ui-text-md);
		}
	}
</style>
