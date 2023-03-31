<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import { dirtyValues } from '../../../common';
	import { project } from '../common';

	export let data;
</script>

<Dirty
	sample={data.project.indicators}
	specimen={$project.indicators}
	bind:dirty={$dirtyValues.indicators}
/>
<header class="editor-form-header">
	<h2 class="heading-xl">Indicateurs d'exemplarité</h2>
	<p>
		L’exemplarité d’un projet, en matière de design, est complexe à évaluer en raison du
		chevauchement de plusieurs enjeux, problématiques et besoins dans les villes comme Montréal.
		Plusieurs guides, comme le Système Davos de qualité pour la culture du bâti et l’Agenda
		Montréalais 2030 pour la qualité et l’exemplarité en design et en architecture, ont été produits
		afin de guider professionnels, citoyens et élus vers des projets plus positifs pour la
		communauté, et ont inspiré la rédaction du Guide d’exemplarité des projets de Nplex, qui vise à
		fournir au lecteur des balises spécifiques au territoire montréalais et au type de projet visé
		par la plateforme. Le présent guide explore l’exemplarité des projets en huit volets&nbsp;:
	</p>
	<ol>
		<li>la durabilité;</li>
		<li>la résilience;</li>
		<li>la modération de la consommation énergétique;</li>
		<li>l'optimisation économique;</li>
		<li>l’attractivité et la valorisation culturelle;</li>
		<li>l’innovation;</li>
		<li>l’équité et l’inclusivité;</li>
		<li>le bien-être.</li>
	</ol>
</header>
{#each data.descriptors.exemplarityCategories as category}
	<fieldset class="editor-form-group">
		<h3 class="editor-form-group-title">{category.title}</h3>
		<!-- <AnimateHeight> -->
		<ul>
			{#each category.indicators as indicator}
				<Token name="indicator" value={indicator.id} bind:group={$project.indicators}>
					{indicator.title}
					<TokenButton slot="trailing"><Icon name="question" /></TokenButton>
				</Token>
			{/each}
		</ul>
		<!-- </AnimateHeight> -->
	</fieldset>
{/each}

<!-- {/each} -->
<style lang="scss">
	ul {
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
	}
</style>
