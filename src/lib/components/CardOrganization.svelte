<script lang="ts">
	/**
	 * Card link destination.
	 */
	export let href: string | undefined;
	export let hreflang: string | undefined;
	export let disabled: boolean | undefined = undefined;
</script>

<div class="card">
	{#if href}
		<!-- svelte-ignore a11y-missing-content -->
		<a {href} {hreflang} class="card-link" aria-hidden="true" />
	{/if}
	{#if $$slots.image}
		<figure class="card-image">
			<slot name="image" />
		</figure>
	{/if}
	<div class="card-details">
		<span class="card-title"></span>
		<span class="card-description"></span>
		<span class="card-footer"></span>
	</div>
</div>

<style lang="postcss">
	.card {
		border-radius: var(--radius-lg);
	}
</style>
