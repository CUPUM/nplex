<script lang="ts">
	import { page } from '$app/stores';

	export let data;
</script>

<header class="editor-form-header">
	<h1 class="heading-lg">Contributions</h1>
	<p>
		Cette section est destinée à l'identification des collaborateur.rice.s ayant participé d'une
		manière ou d'une autre à la réalisation du projet. Les organisations et intervenant.e.s ajoutés
		ici peuvent être liés directement à des jalons ou à des interventions du projet au niveau de son <a
			class="link-secondary"
			href="/editer/projet/{$page.params.projectId}/calendrier"
		>
			calendrier
		</a>
		. Vous pouvez ainsi établir dans quelle mesure divers individus ou entités on participé aux démarches.
	</p>
</header>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Intervenant.e.s</h3>
</fieldset>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Organisations</h3>
</fieldset>

<style lang="scss">
</style>
