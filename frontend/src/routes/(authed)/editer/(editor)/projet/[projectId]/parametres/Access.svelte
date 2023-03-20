<script lang="ts">
	import { page } from '$app/stores';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import { browserDb } from '$utils/database/client';
	import { queryStore } from '$utils/store';
	import type { PageData } from './$types';

	$: collaborators = ($page.data as PageData).collaborators;

	const searchUsers = queryStore('', async (s) => {
		if (s.length) {
			return browserDb
				.from('users')
				.select('*')
				.textSearch('first_name', `'${s}'`)
				.then((res) => {
					console.log(res);
					if (res.error) {
						throw res.error;
					}
					return res.data;
				});
		}
		return [];
	});

	$: console.log($searchUsers.data);
</script>

<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Accès</h3>
	<p class="info">
		Les droits d'accès aux fiches peuvent être partagés avec d'autres utilisateurs de Nplex. En
		ajoutant des collaborateurs au projet, ceux-ci se verront accorder les permissions nécessaires
		pour consulter la fiche même si elle n'est pas publiée. Il pourront aussi éditer le contenu de
		la fiche, mais ne pourront pas la supprimer.
	</p>
	<h4 class="heading-sm">Collaborateurs</h4>
	<p class="info">
		Utilisez la barre de recherche ci-dessous pour ajouter des collaborateurs au projet.
	</p>
	<div class="search">
		<Field placeholder="Chercher un utilisateur..." bind:value={$searchUsers.query}>
			<svelte:fragment slot="leading">
				<FieldIcon name="search" />
			</svelte:fragment>
		</Field>
	</div>
	<ul>
		{#if collaborators.length}
			{#each collaborators as c}
				<li>{c.user.first_name}</li>
			{/each}
		{:else}
			<li class="info">Vous êtes présentement l'unique collaborateur sur ce projet.</li>
		{/if}
	</ul>
</fieldset>

<style lang="scss">
	.search {
		margin-block: 1.5rem;
		max-width: var(--ui-width-sm);
	}

	ul {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		border-radius: var(--ui-radius-lg);
		background-color: col(bg, 900);
	}
</style>
