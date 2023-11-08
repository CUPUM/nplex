<script lang="ts">
	/**
	 * Card link destination.
	 */
	export let href: string | undefined;
</script>

<div>
	{#if href}
		<a {href} class="card-link" />
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
</style>
