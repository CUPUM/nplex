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
<dl>
	{#each data.interventions as intervention, i (intervention.id)}
		<div>
			<InterventionCard bind:intervention />
		</div>
	{/each}
</dl>

<style lang="scss">
	dl {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: var(--ui-pad-md);
		background-color: col(bg, 700);
		border-radius: var(--ui-radius-xl);
	}
</style>
