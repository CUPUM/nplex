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
		font-weight: 500;
		font-size: var(--size-small);
		padding: 0.5em;
		color: var(--color-dark-100);
	}

	section {
	}

	div {
		padding: 1em;
		border-radius: 1rem;
		border: 1px solid var(--color-light-700);
	}
</style>
