<script lang="ts">
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
</script>

<article>
	<h1>Text sizes</h1>

	<ul>
		{#each sizes.reverse() as size}
			<li style:font-size="var(--ui-text-{size})">Text size: {size}</li>
		{/each}
	</ul>
</article>

<style lang="scss">
	ul {
		padding-block: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	li {
		font-weight: 500;
		line-height: 1;
	}
</style>
