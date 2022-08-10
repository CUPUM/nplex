<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';

	let newProjectTitle: string = '';
	let newProjectType: string = '';

	function createProject() {
		// Do submission here
	}
</script>

<section class="pad">
	<h2>Trouvez une fiche existante à laquelle vous avez accès ou soumettez un nouveau projet:</h2>
	<form action="">
		<label>
			<span>Chercher dans mes fiches: </span>
			<input type="search" />
		</label>
	</form>
</section>
<section>
	<ul class="projects-list" use:horizontalScroll={{}}>
		{#each Array(5).fill(null) as item, i}
			<li class="project-card">
				<a href="">
					Projet {i}
				</a>
			</li>
		{/each}
		<li class="submit-card">
			<h3>+ Créer un nouveau projet</h3>
			<form on:submit|preventDefault={createProject}>
				<label>
					<span>Titre du projet: </span>
					<input bind:value={newProjectTitle} name="new-project-title" type="text" required />
				</label>
				<fieldset>
					<legend>Type de projet: </legend>
					<ul>
						<!-- {#each projectTypes as t}
							<li>
								<label>
									<span>{t}</span>
									<input
										type="radio"
										name="new-project-type"
										value={t}
										id="project-type-{t}"
										required
									/>
								</label>
							</li>
						{/each} -->
					</ul>
				</fieldset>
				<button type="submit">Créer la fiche</button>
			</form>
		</li>
	</ul>
</section>

<style lang="scss">
	ul {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: visible;
		padding-block: 3rem;
		padding-inline: 2rem;

		li {
			flex: none;
			position: relative;
			border-radius: 1.5rem;
			padding: 2rem;
			background-color: white;
			box-shadow: 0 1rem 3rem -2rem rgba(var(--rgb-dark-900), 0.25);
			aspect-ratio: 2 / 3;
			display: inline-block;
			width: 33%;
			min-width: 300px;
			max-width: 500px;
		}

		.submit-card {
			background-color: transparent;
			box-shadow: 0 0 0 1px rgba(var(--rgb-dark-500), 0.1);
		}
	}
</style>
