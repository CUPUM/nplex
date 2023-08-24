<script lang="ts">
	const texts = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
	const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
	const spaces = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
	const radiuses = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
</script>

<section>
	<h1>Text sizes</h1>
	<ol class="text">
		{#each texts as ts}
			<li style:font-size="var(--text-{ts})">Text size {ts}</li>
		{/each}
	</ol>
	<ol class="graph">
		{#each texts as ts}
			<li style:--size="var(--text-{ts})">{ts}</li>
		{/each}
	</ol>
</section>

<style lang="scss">
	section {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.text {
		gap: 0.5rem;
		display: flex;
		flex-direction: column;
	}

	.graph {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;

		li {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: calc(5 * var(--size));
			padding-inline: 0.75rem;
			height: 2rem;
			color: white;
			background-color: black;
			border-radius: var(--radius-full);
		}
	}
</style>
