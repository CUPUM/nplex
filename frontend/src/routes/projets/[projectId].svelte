<script context="module" lang="ts">
	import ProjectTimeline from '$components/complexes/ProjectTimeline.svelte';
	import { isExploreArticle } from '$stores/explore';
	import { onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';
</script>

<script lang="ts">
	isExploreArticle.set(true);

	onDestroy(() => {
		isExploreArticle.set(false);
	});
</script>

<article transition:scale={{ start: 0.9 }}>
	<ul>
		<li>Titre du projet</li>
		<li>
			Descripteurs du projet
			<ul>
				<li>Type de projet</li>
				<li>Sous-type de projet</li>
			</ul>
		</li>
		<li>
			LIEU & CONTEXTE
			<ul>
				<li>Propriété du lieu</li>
				<li>
					Usage principal
					<ul>
						<li>Catégorie</li>
						<li>Typologie</li>
					</ul>
				</li>
				<li>
					Usage(s) complémentaire(s)
					<ul>
						<li>Catégorie</li>
						<li>Typologie</li>
					</ul>
				</li>
				<li>
					Emplacement
					<ul>
						<li>Arrondissement</li>
						<li>Quartier</li>
						<li>Localisation (Geojson + carte)</li>
					</ul>
				</li>
				<li>Année de construction (approx. avec "~" ou précise)</li>
				<li>Type de construction (combustible, incombustible)</li>
				<li>Mode d'implantation</li>
				<li>Murs partagés</li>
				<li>Rues adjacentes</li>
				<li>
					Secteurs & règlements particuliers
					<ul>PIIA</ul>
					<ul>Secteur d'intérêt patrimonial</ul>
					<ul>PPU</ul>
					<ul>autres...</ul>
				</li>
			</ul>
		</li>
		<li>
			Contexte / cadre bâti
			<ul>
				<li>Type de projet</li>
				<li>Sous-type de projet</li>
			</ul>
		</li>
		<li>
			Superficies (schema?)
			<ul>
				<li>Superficie du terrain</li>
				<li>Superficie du bâtiment</li>
				<li>Superficie du projet</li>
			</ul>
		</li>
		<li>
			Hauteur de bâtiment
			<ul>
				<li>Mètres</li>
				<li>Nombre d'étages</li>
			</ul>
		</li>
	</ul>
	<ProjectTimeline />
</article>

<style lang="postcss">
	article {
		flex: none;
		width: 100%;
		margin: 0;
		min-height: 100vh;
		display: grid;
		gap: 2rem;
		grid-template-columns:
			[full-start]
			1fr
			[main-start left-start]
			min(90%, 30ch)
			[left-end right-start]
			min(90%, 30ch)
			[right-end main-end]
			1fr
			[full-end];
	}

	section,
	ul {
		grid-column: main;
	}
</style>
