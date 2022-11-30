<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form action="">
	<h2>Exemplarité du projet et indicateurs</h2>
	<fieldset>
		<h3>Indicateurs d'exemplarité</h3>
		<ul>
			{#each data.descriptors.exemplarityIndicators as i}
				<li>
					<label>
						{i.title}
					</label>
				</li>
			{/each}
		</ul>
	</fieldset>
</form>

<style lang="scss">
</style>
