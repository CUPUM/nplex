<script lang="ts" context="module">
</script>

<script lang="ts">
	let newProjectTitle: string = '';
	let newProjectType: string = '';

	function createProject() {
		// Do submission here
	}
</script>

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

<style lang="scss">
</style>
