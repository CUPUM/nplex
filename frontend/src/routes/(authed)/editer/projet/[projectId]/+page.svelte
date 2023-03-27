<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import { dirtyValues } from '../../common';
	import { project } from './common';
	import CostRange from './CostRange.svelte';
	import Interventions from './Interventions.svelte';
	import Ownership from './Ownership.svelte';
	import Summary from './Summary.svelte';
	import Type from './Type.svelte';

	export let data;
</script>

<Dirty sample={data.project.title} specimen={$project.title} bind:dirty={$dirtyValues.title} />
<Dirty
	sample={data.project.description}
	specimen={$project.description}
	bind:dirty={$dirtyValues.description}
/>
<Dirty sample={data.project.type} specimen={$project.type} bind:dirty={$dirtyValues.type} />
<Dirty
	sample={data.project.interventions}
	specimen={$project.interventions}
	bind:dirty={$dirtyValues.interventions}
/>
<Dirty
	sample={data.project.cost_range}
	specimen={$project.cost_range}
	bind:dirty={$dirtyValues.cost_range}
	strictOrder
/>
<Dirty
	sample={data.project.site_ownership}
	specimen={$project.site_ownership}
	bind:dirty={$dirtyValues.site_ownership}
	strictOrder
/>
<header class="editor-form-header">
	<h1 class="heading-lg">Général</h1>
	<p>
		Décrivez les aspects principaux qui caractérisent le projet. Ces champs de données serviront
		entre autres à indexer votre fiche pour des recherches texte ainsi que pour introduire les
		visiteurs à la portée générale du projet.
	</p>
</header>
<Summary />
<Type />
<Interventions />
<CostRange />
<Ownership />

<style lang="scss">
</style>
