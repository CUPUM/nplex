<script lang="ts">
	export let ordered: boolean = false;
</script>

<svelte:element this={ordered ? 'ol' : 'ul'} class="descriptor-list">
	<slot />
</svelte:element>

<style>
	.descriptor-list {
		display: flex;
		flex-direction: row;
		gap: var(--base-gutter);
		font-size: var(--size-sm);
		flex-wrap: wrap;
		grid-column: full;
		padding: 2rem;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
