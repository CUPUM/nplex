<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import { messages } from '$stores/messages';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.error) {
		messages.dispatch({
			content: form.error.message,
			type: 'error',
		});
	}
</script>

<form id="profile" use:enhance method="post" action="?/update">
	<h2>Mes informations</h2>
	<input name="id" type="hidden" value={data.profile.id} readonly />
	<Field name="first_name" value={form?.first_name ?? data.profile.first_name ?? ''} class="field">
		<svelte:fragment slot="label">Prénom</svelte:fragment>
		<Button slot="trailing" type="submit">Effacer</Button>
	</Field>
	<Field name="last_name" class="field">
		<svelte:fragment slot="label">Nom de famille</svelte:fragment>
	</Field>
	<Button type="submit">Mettre mon profil à jour</Button>
	<Button type="submit" warning formaction="?/delete">Supprimer mon profil</Button>
</form>
<article id="entries">
	<h2>Fiches éditables</h2>
	<section>
		<h3>Mes fiches de projet</h3>
	</section>
	<section>
		<h3>Projets partagés avec moi</h3>
	</section>
	<section>
		<h3>Mes fiches d'organisation</h3>
	</section>
	<section>
		<h3>Organisations partagées avec moi</h3>
	</section>
	<section>
		<h3>Mes fiches d'acteur</h3>
	</section>
	<section>
		<h3>Acteurs partagés avec moi</h3>
	</section>
</article>
<article>
	<h2>Mes collections</h2>
</article>
<article>
	<h2>Mes votes</h2>
</article>

<style lang="scss" module>
	h2 {
		padding: 0;
		margin: 0;
		font-size: 2.5rem;
		font-weight: 500;
	}

	#profile {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 800px;
		margin: 2rem auto;
		gap: 1em;
		align-items: flex-start;
	}

	.field {
		width: 100%;
	}
</style>
