<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldTogglePassword from '$components/Field/FieldTogglePassword.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import Select from '$components/Select/Select.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import Token from '$components/Token/Token.svelte';
	import { LOAD_DEPENDENCIES } from '$utils/enums';

	export let data;

	let dirtyGeneral = false;
	$: if (data) {
		dirtyGeneral = false;
	}

	let desiredRole = '';
	let confirmDelete = '';
	let validDelete = 'Je désir supprimer ' + data.session?.user.first_name;
</script>

<form
	class="account-formgroup"
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
			if (result.type === 'failure') {
				invalidate(LOAD_DEPENDENCIES.USER_PROFILE);
			}
		};
	}}
>
	<h2 class="account-formgroup-title">Général</h2>
	<input name="id" type="hidden" value={data.profile.id} readonly />
	<fieldset id="general">
		<fieldset id="names">
			<Field
				style="flex: 1; min-width: 350px"
				name="first_name"
				variant="outlined"
				value={data.profile.first_name}
				on:change={() => {
					dirtyGeneral = true;
				}}
				required
			>
				<svelte:fragment slot="label">Prénom ou pseudonyme</svelte:fragment>
			</Field>
			<Field
				style="flex: 1; min-width: 350px"
				name="last_name"
				variant="outlined"
				value={data.profile.last_name}
				on:change={() => {
					dirtyGeneral = true;
				}}
			>
				<svelte:fragment slot="label">Nom de famille</svelte:fragment>
			</Field>
		</fieldset>
		<Field
			name="public_email"
			variant="outlined"
			value={data.profile.public_email}
			on:change={() => {
				dirtyGeneral = true;
			}}
		>
			<svelte:fragment slot="label">Courriel public</svelte:fragment>
		</Field>
		<TextArea
			name="about"
			variant="outlined"
			value={data.profile.about}
			on:change={() => {
				dirtyGeneral = true;
			}}
		>
			<svelte:fragment slot="label">À propos</svelte:fragment>
		</TextArea>
	</fieldset>
	<Button
		disabled={!dirtyGeneral}
		style="align-self: flex-end; font-size: var(--ui-text-sm)"
		type="submit"
	>
		Sauvegarder
	</Button>
</form>
<section class="account-formgroup">
	<h2 class="account-formgroup-title">Rôle & permissions</h2>
	<p class="subtle">Gérer le rôle associé à mon compte.</p>
	<h3 class="heading-sm">Mon rôle actuel</h3>
	<fieldset id="role">
		<section>
			<Token readonly variant="default">
				{data.profile.role_title}
			</Token>
			<p class="subtle">{data.profile.role_description}</p>
		</section>
		<Modal>
			<svelte:fragment slot="control" let:open>
				<Button
					variant="outlined"
					type="button"
					slot="control"
					on:click={open}
					equi={false}
					style="font-size: var(--ui-text-sm);"
				>
					Demander un nouveau rôle
					<Icon name="shield" slot="trailing" />
				</Button>
			</svelte:fragment>
			<svelte:fragment slot="header">Demandez un rôle</svelte:fragment>
			<form
				method="POST"
				action="?/role"
				autocomplete="off"
				use:enhance={({ form, data, action, cancel }) => {
					return async ({ update, result }) => {
						update({ reset: false });
						if (result.type === 'failure') {
							invalidate(LOAD_DEPENDENCIES.USER_PROFILE);
						}
					};
				}}
			>
				<p style="margin-top: 0;">
					Notez que pour obtenir un rôle qui vous accorde plus de permissions, votre demande devra
					être approuvée par un administrateur.
				</p>
				<Select options={data.roles} bind:value={desiredRole} variant="outlined" name="role">
					<svelte:fragment slot="label">Rôle désiré</svelte:fragment>
					<option slot="option" let:option value={option.role}>{option.title}</option>
					<svelte:fragment slot="trailing">
						<Button type="submit" disabled={!desiredRole}>
							Envoyer la demande <Icon slot="trailing" name="arrow-right" />
						</Button>
					</svelte:fragment>
				</Select>
			</form>
		</Modal>
	</fieldset>
</section>
<form
	class="account-formgroup"
	autocomplete="off"
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
			if (result.type === 'failure') {
				invalidate(LOAD_DEPENDENCIES.USER_PROFILE);
			}
		};
	}}
>
	<h2 class="account-formgroup-title">Sécurité</h2>
	<input name="id" type="hidden" value={data.profile.id} readonly autocomplete="false" />
	<h3 class="heading-sm">Modifier mon courriel d'authentification</h3>
	<Field
		readonly
		placeholder="Courriel d'authentification"
		type="email"
		variant="dashed"
		value={data.session?.user.email}
	>
		<svelte:fragment slot="trailing">
			<Button type="submit" disabled><Icon name="lock-close" slot="leading" />Modifier</Button>
		</svelte:fragment>
	</Field>
	<h3 class="heading-sm">Modifier mon mot de passe</h3>
	<Field placeholder="Mot de passe actuel" type="password" name="new_password">
		<FieldTogglePassword slot="trailing" />
	</Field>
	<Field placeholder="Nouveau mot de passe" type="password" />
	<h3 class="heading-sm">Désactivation</h3>
	<p>
		Vous désirez fermer votre compte de manière définitive? Sachez que certaines ressources que vous
		avez créées, telles que les fiches de projet et leur métadonnées, seront conservées malgré la
		désinscription. Si vous désirez effacer ces données, assurez-vous de prévenir vos collaborateurs
		et de supprimer vos fiches avant de compléter la fermeture de votre compte.
	</p>
	<p class="subtle">
		<Icon name="info-circle" />&ensp;La gestion des fiches orphelines sera automatiquement déléguée
		aux administrateurs de la plateforme. Les collaborateurs conserveront leurs accès.
	</p>
	<fieldset id="delete">
		<Modal>
			<svelte:fragment slot="control" let:open>
				<Button variant="cta" state="warning" on:click={open} style="align-self: flex-start">
					<Icon name="warn" slot="leading" />
					Supprimer mon compte
				</Button>
			</svelte:fragment>
			<svelte:fragment slot="header">
				Confirmez la fermeture définitive de votre compte
			</svelte:fragment>
			<form action="?/delete" method="POST" use:enhance id="confirm-delete">
				<p style="margin-top: 0">
					Pour compléter la démarche, veuillez entrer la phrase suivante ci-dessous puis confirmer:
				</p>
				<Field value={validDelete} readonly disabled />
				<Field
					name="confirmation"
					state="warning"
					placeholder="Confirmation requise"
					bind:value={confirmDelete}
				/>
			</form>
			<svelte:fragment slot="footer">
				<Button
					variant="cta"
					state="warning"
					type="submit"
					form="confirm-delete"
					disabled={confirmDelete !== validDelete}
				>
					<Icon slot="leading" name="warn" />Supprimer mon compte
				</Button>
			</svelte:fragment>
		</Modal>
	</fieldset>
</form>

<style lang="scss">
	#general {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: stretch;
		margin-bottom: 1.5rem;
	}

	#names,
	#role {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1.5rem;
		align-items: center;
	}

	#role {
		flex-wrap: wrap;
		align-items: flex-start;

		section {
			flex: 1;
			max-width: 50%;
		}
	}

	#delete {
		font-size: var(--ui-text-sm);
	}

	#confirm-delete {
		display: flex;
		flex-direction: column;
		// align-items: flex-start;
		gap: 1.5rem;
	}

	h3 {
		margin-block: 2rem 1.5rem;
	}
</style>
