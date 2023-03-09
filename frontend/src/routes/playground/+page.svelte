<script lang="ts">
	const h = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
	const t = ['xl', 'lg', 'md', 'sm', 'xs'];
</script>

<article>
	<h1>Typography system</h1>
	<section>
		<h2>Headings</h2>
		{#each h as size}
			<h3 class="heading-{size}">
				Heading {size}
			</h3>
		{/each}
	</section>
	<section>
		<h2>Text</h2>
		{#each t as size}
			<p class="text-{size}">
				Text {size} Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, officia. Voluptatibus
				doloremque aperiam beatae mollitia dolorum sit optio ut consequatur.
			</p>
		{/each}
	</section>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		width: 100%;
		padding: var(--ui-pad-outer);
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		padding: 3rem;
	}
</style>
