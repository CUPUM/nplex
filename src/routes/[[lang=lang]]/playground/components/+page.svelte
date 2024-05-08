<script lang="ts">
	import { ripple } from '$lib/actions/ripple.svelte';

	const buttons = ['default', 'bordered', 'dashed', 'ghost', 'cta', 'link'];
</script>

<section class="component">
	<h2>Buttons</h2>
	<div class="variants">
		{#each buttons as variant}
			<div class="variant">
				<button
					class="button {variant === 'default' ? '' : `button-${variant}`} capitalize"
					use:ripple
				>
					{variant}
				</button>
			</div>
		{/each}
	</div>
</section>

<section class="component">
	<h2>Inputs</h2>
	<div class="variants">
		{#each buttons as variant}
			<div class="variant">
				<input
					class="input {variant === 'default' ? '' : `input-${variant}`}"
					placeholder="Input"
				/>
			</div>
		{/each}
	</div>
</section>

<style>
	h2 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		padding: 1rem;
	}

	.component {
		padding: var(--spacing-gutter);
		display: flex;
		flex-direction: column;
	}

	.variants {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--spacing-gutter);
	}

	.variant {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem;
		aspect-ratio: 1.5;
		background: var(--color-base-strong);
		border-radius: var(--radius-lg);
	}
</style>
