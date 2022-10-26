<script lang="ts">
	export let articles = [
		{
			id: 'selection-des-projets',
			title: 'Guide de sélection des projets',
		},
		...Array(7)
			.fill(null)
			.map((_, i) => ({
				id: Math.round(Math.random() * 200000).toString(16),
				title: "Titre de l'article #" + i,
			})),
	];
</script>

<aside>
	<label for="">
		<span>Chercher:</span>
		<input type="search" name="" id="" />
	</label>
	<h2>Guides</h2>
	<ul>
		{#each articles as article (article.id)}
			<li>
				<a href="/guides/{article.id}">
					{article.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>

<style lang="scss">
	aside {
		width: 400px;
		top: 0;
		position: sticky;
		background-color: var(--color-light-500);
	}
</style>
