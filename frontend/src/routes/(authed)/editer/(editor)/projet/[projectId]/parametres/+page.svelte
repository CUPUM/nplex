<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';

	$: role = $page.data.session?.user.role;
</script>

<EditorFormgroup legend="Visibilité du projet">
	{#if role === 'admin' || role === 'editor'}
		<p class="info">
			Vous pouvez ici contrôler la visibilité de la fiche. Les fiches non-publiées sont visibles
			uniquement pour les collaborateurs et les administrateurs.
		</p>
		<Button variant="cta">
			Publier
			<Icon name="upload" slot="trailing" />
		</Button>
	{:else if role === 'visitor'}
		<p class="info">
			Vous pouvez ici contrôler la visibilité de la fiche. Votre statut d'utilisateur actuel ne vous
			permet pas de rendre du contenu public de manière autonome, mais vous pouvez envoyer une
			demande de publication. Celle-ci sera traitée par un administrateur ou un éditeur.
		</p>
		<p class="info">
			Les fiches non-publiées sont visibles uniquement pour les collaborateurs et les
			administrateurs.
		</p>
		<Button variant="cta">
			Demander à publier le projet
			<Icon name="announcement" slot="trailing" />
		</Button>
	{/if}
</EditorFormgroup>
<EditorFormgroup legend="Accès">
	<p class="info">
		Les droits d'accès aux fiches peuvent être partagés avec d'autres utilisateurs de Nplex. En
		ajoutant des collaborateurs au projet, ceux-ci se verront accorder les permissions nécessaires
		pour consulter la fiche même si elle n'est pas publiée. Il pourront aussi éditer le contenu de
		la fiche, mais ne pourront pas la supprimer.
	</p>
</EditorFormgroup>
<EditorFormgroup legend="Supprimer">
	<p class="info">Attention, les projets supprimés ne peuvent pas être récupérés.</p>
	<fieldset class="delete">
		<Button variant="danger" type="submit" formaction="?/delete">
			<Icon name="trash" slot="leading" />Supprimer le projet
		</Button>
	</fieldset>
</EditorFormgroup>

<style lang="scss">
	.delete {
		font-size: var(--ui-text-sm);
	}
</style>
