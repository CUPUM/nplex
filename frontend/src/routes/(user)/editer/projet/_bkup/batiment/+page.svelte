<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form use:enhance method="POST" action="/?update">
	<h2>Détail du bâtiment</h2>
	<fieldset>
		<h3>Mode d'implantation</h3>
		<ul>
			{#each data.descriptors.implantationModes as mode}
				<li>
					<label>
						{mode.title}
						<input
							type="radio"
							name="implantation_mode_id"
							bind:group={data.project.implantation_mode_id}
							value={mode.id}
						/>
					</label>
				</li>
			{/each}
		</ul>
	</fieldset>
	<fieldset>
		<h3>Nombre d'étages</h3>
	</fieldset>
	<fieldset>
		<h3>Année de construction</h3>
	</fieldset>
	<fieldset>
		<h3>Emprise au sol</h3>
	</fieldset>
</form>

<style lang="scss">
</style>
