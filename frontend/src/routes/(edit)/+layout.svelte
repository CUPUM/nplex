<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<slot />
<article id="entries">
	<h2>Fiches éditables</h2>
	<section>
		<h3>Mes fiches de projet</h3>
		<form action="">
			<label
				>Toutes
				<input type="radio" name="projects-filter" id="" />
			</label>
			<label
				>Créées par moi
				<input type="radio" name="projects-filter" id="" />
			</label>
			<label
				>Partagées avec moi
				<input type="radio" name="projects-filter" id="" />
			</label>
		</form>
		<ul>
			{#each data.projects as project}
				<li class="project-card">
					<a href="/editer/projet/{project.id}">
						{project.title}
					</a>
					(créé: {project.created_at}, modifié: {project.updated_at})
				</li>
			{/each}
		</ul>
	</section>
	<section>
		<h3>Mes fiches d'organisation</h3>
		<form action="">
			<label
				>Toutes
				<input type="radio" name="projects-filter" id="" />
			</label>
			<label
				>Créées par moi
				<input type="radio" name="projects-filter" id="" />
			</label>
			<label
				>Partagées avec moi
				<input type="radio" name="projects-filter" id="" />
			</label>
		</form>
	</section>
	<section>
		<h3>Mes fiches d'acteur</h3>
		<form action="">
			<label
				>Toutes
				<input type="radio" name="projects-filter" id="" />
			</label>
			<label
				>Créées par moi
				<input type="radio" name="projects-filter" id="" />
			</label>
			<label
				>Partagées avec moi
				<input type="radio" name="projects-filter" id="" />
			</label>
		</form>
	</section>
</article>

<style lang="scss">
	article {
		width: 100%;
	}

	section {
		padding: 4rem 0;
	}

	h2,
	h3 {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	ul {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.project-card {
		flex: 0;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
		border-radius: 1.5rem;
		border: 1px solid var(--color-base-700);
	}
</style>
