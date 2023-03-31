<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenIcon from '$components/Token/TokenIcon.svelte';
	import { userHasRole } from '$utils/validation';
	import type { PageData } from './$types';

	export let status: PageData['project']['publication_status'];
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Visibilité du projet</h3>
	<div class="flex flex-w gap-md flex-w align-i-fs">
		<div>
			{#if userHasRole($page.data, 'admin', 'editor')}
				<p>
					Vous pouvez ici contrôler la visibilité <i>souhaitée</i>
					de la fiche. Les fiches non-publiées sont visibles uniquement pour les collaborateurs et les
					administrateurs.
				</p>
			{:else}
				<p>
					Vous pouvez ici contrôler la visibilité <i>souhaitée</i>
					de la fiche. Votre statut d'utilisateur actuel ne vous permet pas de rendre du contenu public
					de manière autonome, mais vous pouvez envoyer une demande de publication. Celle-ci sera prise
					en charge par un administrateur ou un éditeur.
				</p>
				<p class="subtle">
					Les fiches non-publiées sont visibles uniquement pour l'auteur.e, les collaborateur.rice.s
					et les administrateur.rice.s.
				</p>
			{/if}
			<div class="text-sm">
				<Button variant="cta" type="submit" formaction="?/publish">
					{userHasRole($page.data, 'admin', 'editor')
						? 'Publier ce projet'
						: 'Soumettre le projet pour publication'}
					<Icon
						name={userHasRole($page.data, 'admin', 'editor') ? 'upload' : 'announcement'}
						slot="leading"
					/>
				</Button>
			</div>
		</div>
		<div>
			<p class="heading-2xs">Statut actuel</p>
			<Token>
				{status.published
					? 'Publiée'
					: status.requested
					? 'En attente d’approbation'
					: 'Non publiée'}
			</Token>
			{#if status.fulfill}
				<Token state="error">
					<TokenIcon name="warn" />Information requises pour diffusion publique
				</Token>
			{/if}
		</div>
	</div>
</fieldset>

<style lang="scss">
</style>
