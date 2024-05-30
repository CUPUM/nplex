<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	let { title, data, children }: { title: string; data: T[]; children: Snippet<[T]> } = $props();
</script>

<section>
	<h2>{title}</h2>
	<div class="variants">
		{#each data as datum}
			<div class="variant">
				{@render children(datum)}
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	h2 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		width: 100%;
		padding-inline: 2rem;
		padding-top: 0.5rem;
		padding-bottom: 2rem;
	}

	.variants {
		font-size: var(--font-size-sm);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-gutter);
		width: 100%;
		padding: 0 2rem 3rem 2rem;
	}

	.variant {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		place-content: center;
		justify-content: center;
		padding: 4rem;
		aspect-ratio: 1.5;
		border: var(--border-width-sm) solid var(--border-color-soft);
		border-radius: var(--radius-lg);
	}
</style>
