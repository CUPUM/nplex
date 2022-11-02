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
</style>
