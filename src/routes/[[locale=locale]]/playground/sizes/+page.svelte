<script lang="ts">
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'].reverse();
</script>

<section>
	<h1>Text sizes</h1>
	<ol>
		{#each sizes as s}
			<p class="heading {s}">
				Heading {s} Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis consectetur
				at debitis quibusdam asperiores voluptatum aliquid quasi totam quos!
			</p>
		{/each}
	</ol>
	<ol>
		{#each sizes as s}
			<p class="prose {s}">
				Prose {s} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit debitis quibusdam soluta,
				voluptates nisi veritatis sint impedit, facere quaerat atque maiores cum dolores sunt eligendi
				porro culpa fugiat eaque tempore. Blanditiis excepturi sapiente dolor at fuga iure rerum. Eos
				reiciendis eveniet ea. Aliquid doloribus accusamus sint laboriosam est aspernatur error, sapiente
				voluptas eum nemo optio. Repellat illum optio libero accusamus ipsa aliquid consectetur, asperiores
				adipisci, corrupti possimus quod est ut sint eaque perspiciatis dolorum veritatis eveniet dolore
				ad recusandae cumque tempore neque necessitatibus consequatur. Nesciunt atque ipsa non omnis
				unde assumenda? Autem officia delectus cupiditate sequi repellendus aliquam at mollitia.
			</p>
		{/each}
	</ol>
</section>

<style lang="postcss">
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
