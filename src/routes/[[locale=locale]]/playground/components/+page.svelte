<script lang="ts">
	import { Lock, Share, Shield } from 'lucide-svelte';

	const buttonVariants = ['default', 'outlined', 'ghost', 'link', 'cta'];
	const buttonStates = ['normal', 'danger'];
	let buttonState = buttonStates[0];

	const inputVariants = ['default', 'outlined'];
</script>

<article>
	<h1>Button</h1>
	<section>
		State:
		<select class="input" bind:value={buttonState}>
			{#each buttonStates as state}
				<option value={state}>{state}</option>
			{/each}
		</select>
	</section>
	<section>
		{#each buttonVariants as variant}
			<button class="button {variant} {buttonState}">
				<Share class="button-icon" />
				{variant}
			</button>
		{/each}
	</section>
</article>
<article>
	<h1>Input</h1>
	<section>
		{#each inputVariants as variant}
			<input type="text" class="input" />
			<fieldset class="input-group outlined">
				<input type="text" class="input" />
				<div class="input-peer">
					<button class="button">Test bouton</button>
					<button class="button sqaure"><Shield class="button-icon" /></button>
				</div>
				<Lock class="input-icon" />
			</fieldset>
		{/each}
	</section>
</article>
<article>
	<h1>Labeled</h1>
	<section></section>
</article>
<article>
	<h1>Switch</h1>
	<section></section>
</article>
<article>
	<h1>Range</h1>
	<section></section>
</article>

<style lang="postcss">
	article {
		padding: 2rem;
		margin: 1rem;
		margin-bottom: 0;
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-xl);
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		gap: 0.5rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 550;
		margin-inline: 0.2em;
		margin-bottom: 0.5em;
	}

	section {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		padding: 2rem;
		gap: 1rem;
		border-radius: var(--radius-lg);
		background-color: var(--base-bg);
	}
</style>
