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
		position: relative;
		padding: 3rem;
		background-color: col(bg, 700);
		border-radius: var(--ui-radius-lg);
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
</style>
