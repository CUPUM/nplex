<script lang="ts">
	export let label: string = undefined;
</script>

<section id="set" {...$$restProps}>
	{#if label}
		<legend>{label}</legend>
	{/if}
	<div>
		<slot />
	</div>
</section>

<style lang="postcss">
	legend {
		font-weight: 400;
		font-size: var(--size-large);
		padding: 0.5em;
		color: var(--color-dark-500);
	}

	section {
		display: block;
	}

	div {
		padding: 1em;
		border-radius: 1rem;
		border: 1px solid var(--color-light-700);
	}
</style>
