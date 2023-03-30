<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';

	export let data;
</script>

<header class="editor-form-header">
	<h2 class="heading-lg">Membres</h2>
	<p>
		Vous pouvez ici ajouter des membres qui oeuvrent au sein de l'organisation. Les membres
		disponibles correspondent uniquement à des profils d'intervenant.e.s.
	</p>
	<p class="subtle">
		<Icon name="info-circle" style="top: -.1em;" />&emsp;Si vous désirez partager les droit de
		gestion de l'organisation d'autres utilisateur.rice.s qui ne sont pas associés à une fiche
		d'intervenant.e., veuillez ajuster les accès dans la section
		<a href="/editer/organisation/{$page.params.orgId}/parametres">paramètres</a>
		.
	</p>
</header>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Profils</h3>
</fieldset>

<style lang="scss">
</style>
