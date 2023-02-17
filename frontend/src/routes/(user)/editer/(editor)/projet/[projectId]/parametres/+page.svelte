<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
</script>

<EditorFormgroup legend="Visibilité du projet" />
<EditorFormgroup legend="Accès">
	<p class="ui-info">
		Les droits des fiches peuvent être partagés avec d'autres utilisateurs de Nplex. En ajoutant des
		collaborateurs au projet, ceux-ci se verront attribuer des droits d'édition et pourront
		consulter la fiche même si elle n'est pas publiée.
	</p>
</EditorFormgroup>
<EditorFormgroup legend="Supprimer">
	<p class="ui-info">Attention, les projets supprimés ne peuvent pas être récupérés.</p>
	<Button variant="danger" type="submit" formaction="?/delete">
		<Icon name="trash" slot="leading" />Supprimer le projet
	</Button>
</EditorFormgroup>
<fieldset>Visibilité du projet</fieldset>
<fieldset>Partage</fieldset>
<fieldset>Supprimer</fieldset>

<style lang="scss">
</style>
