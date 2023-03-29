<script lang="ts">
	import { enhance } from '$app/forms';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '$routes/(authed)/editer/constants';
	import { types } from './common';
	import InterventionCard from './InterventionCard.svelte';

	export let data;

	$: types.set(data.types);
</script>

<form class="editor-form" use:enhance method="POST" action={EDITOR_FORM_ACTION} id={EDITOR_FORM_ID}>
	<header class="editor-form-header">
		<h1 class="heading-xl">Interventions</h1>
		<p class="text-lg">
			Les interventions constituent des unités de travaux pouvant caractériser en tout ou en partie
			le chantier d'un projet.
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
</form>

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
