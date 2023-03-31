<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import { dirtyValues } from '$routes/(authed)/editer/common';
	import { interventions, types } from './common';
	import InterventionCard from './InterventionCard.svelte';

	export let data;

	function syncDown() {
		types.set(data.types);
		interventions.set(JSON.parse(JSON.stringify(data.interventions)));
	}
	syncDown();

	$: data, syncDown();
</script>

<Dirty
	sample={data.interventions}
	specimen={$interventions}
	bind:dirty={$dirtyValues.descriptorsInterventions}
/>
<header class="editor-form-header">
	<h1 class="heading-xl">Interventions</h1>
	<p class="text-lg">
		Les interventions constituent des unités de travaux pouvant caractériser en tout ou en partie le
		chantier d'un projet.
	</p>
	<p class="subtle">Information supplémentaire</p>
</header>
{#each data.categories as c}
	<fieldset class="editor-form-group">
		<h3 class="editor-form-group-title">{c.title}</h3>
		<p>{c.description ?? 'Description à venir...'}</p>
		<dl>
			{#each $interventions.filter((it) => it.category === c.id) as intervention, i (intervention.id)}
				<div>
					<InterventionCard bind:intervention />
				</div>
			{/each}
		</dl>
	</fieldset>
{/each}

<style lang="scss">
	dl {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
</style>
