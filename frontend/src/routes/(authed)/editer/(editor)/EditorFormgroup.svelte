<script lang="ts">
	export let legend: string | undefined = undefined;
	export let maxWith: 'md' | undefined = undefined;
</script>

<fieldset class={maxWith ?? ''}>
	{#if legend}
		<h3 class="heading-md">{legend}</h3>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		// display: flex;
		// flex-direction: column;
		// align-items: flex-start;
		position: relative;
		padding: 3rem;
		background-color: col(bg, 700);
		border: 1px solid col(bg, 900);
		border-radius: var(--ui-radius-xl);
		box-shadow: var(--ui-shadow-md);
		transition: all 0.15s;

		// &.md {
		// 	max-width: var(--ui-width-md);
		// }

		@include laptop {
			padding: 2.5rem;
		}

		@include tablet {
			padding: 1.5rem 1.25rem;
		}
	}

	h3 {
		margin-top: -0.5em;
		margin-bottom: 2rem;
	}
</style>
