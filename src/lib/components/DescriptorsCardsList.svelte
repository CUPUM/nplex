<script lang="ts">
	export let ordered: boolean = false;
	export let sublist: boolean = false;
</script>

<svelte:element this={ordered ? 'ol' : 'ul'} class="list" class:sublist>
	<slot />
</svelte:element>

<style lang="postcss">
	.list {
		position: relative;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
		align-self: center;
		max-width: var(--width-md);
		padding: 1rem;
		gap: 1rem;
		width: 100%;

		@container (width > 1200px) {
			margin-right: var(--dashboard-navbar);
		}

		&.sublist {
			width: initial;
			align-self: stretch;
			max-width: var(--width-md);
			margin: 1rem 0.5rem;
			padding: 0 1rem;
			border-left: 2px dashed color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
		}
	}
</style>
