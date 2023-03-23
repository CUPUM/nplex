<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import type { PageData } from './$types';

	$: role = ($page.data as PageData).session?.user.role;
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Visibilité du projet</h3>
	{#if role === 'admin' || role === 'editor'}
		<p class="subtle">
			Vous pouvez ici contrôler la visibilité de la fiche. Les fiches non-publiées sont visibles
			uniquement pour les collaborateurs et les administrateurs.
		</p>
		<div class="publish">
			<Button variant="cta">
				Publier
				<Icon name="upload" slot="leading" />
			</Button>
		</div>
	{:else if role === 'visitor'}
		<p class="subtle">
			Vous pouvez ici contrôler la visibilité de la fiche. Votre statut d'utilisateur actuel ne vous
			permet pas de rendre du contenu public de manière autonome, mais vous pouvez envoyer une
			demande de publication. Celle-ci sera prise en charge par un administrateur ou un éditeur.
		</p>
		<p class="subtle">
			Les fiches non-publiées sont visibles uniquement pour les collaborateurs et les
			administrateurs.
		</p>
		<div class="publish">
			<Button variant="cta">
				Demander à publier le projet
				<Icon name="announcement" slot="leading" />
			</Button>
		</div>
	{/if}
</fieldset>

<style lang="scss">
	.publish {
		font-size: var(--ui-text-sm);
	}
</style>
