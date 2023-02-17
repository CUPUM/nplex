<script lang="ts">
	export let legend: string | undefined = undefined;
</script>

<fieldset>
	{#if legend}
		<h3>{legend}</h3>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		padding: 3rem;
		width: 100%;
		margin-right: mimax(300px, auto);
		// max-width: calc(var(--ui-width-md) + 3rem);

		@include laptop {
			padding: 2rem;
			// max-width: var(--ui-width-md);
		}

		&:last-of-type {
			padding-bottom: 10rem;
		}

		&:first-of-type {
			padding-top: 6rem;
		}
	}

	h3 {
		font-size: var(--ui-text-lg);
		font-weight: 450;
		margin-bottom: 1em;
	}
</style>
