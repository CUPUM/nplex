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
	import Tooltip from '$components/Tooltip.svelte';
	import { LOAD_DEPENDENCIES } from '$utils/enums';

	export let data;

	let dirtyGeneral = false;
	$: if (data) {
		dirtyGeneral = false;
	}

	$: console.log(dirtyGeneral);

	$: role = data.roles.find((r) => r.role === data.profile.role.role);
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
				variant="default"
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
				variant="default"
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
			variant="default"
			value={data.profile.public_email}
			on:change={() => {
				dirtyGeneral = true;
			}}
		>
			<svelte:fragment slot="label">Courriel public</svelte:fragment>
		</Field>
		<TextArea
			name="about"
			variant="default"
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
	<p class="info">Gérer le rôle associé à mon compte.</p>
	<fieldset id="role">
		<span class="heading-xs">Mon rôle actuel:</span>
		<Tooltip message={role?.description} place="right">
			<Token readonly variant="outlined">
				{role?.title}
			</Token>
		</Tooltip>
	</fieldset>
	<Modal>
		<svelte:fragment slot="control" let:open>
			<Button
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
			<p class="info">
				Notez que pour obtenir un rôle qui vous accorde plus de permissions, votre demande devra
				être approuvée par un administrateur.
			</p>
			<Select options={data.roles} variant="outlined">
				<svelte:fragment slot="label">Rôle désiré</svelte:fragment>
				<option slot="option" let:option value={option.role}>{option.title}</option>
			</Select>
		</form>
	</Modal>
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
	<Field placeholder="Courriel d'authentification" type="email" value={data.session?.user.email}>
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
	<Button variant="cta" state="warning" style="align-self: flex-start">
		<Icon name="warn" slot="leading" />Supprimer mon compte
	</Button>
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
		margin-bottom: 1.5rem;
	}

	h3 {
		margin-block: 2rem 1.5rem;
	}
</style>
