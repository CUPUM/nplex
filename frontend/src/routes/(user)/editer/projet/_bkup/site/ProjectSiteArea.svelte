<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<fieldset>
	<h3>Superficie du terrain</h3>
	<p>
		Note: Vous pouvez utiliser les outils de mesure dans la barre d'outil de la carte pour vous
		aider à évaluer la superficie du site.
	</p>
	<input
		type="number"
		name="site_area"
		placeholder="Superficie"
		bind:value={data.project.site_area}
	/>m<sup>2</sup>
	<input type="range" min="1" max="1000" step="1" bind:value={data.project.site_area} />
</fieldset>

<style lang="scss">
</style>
