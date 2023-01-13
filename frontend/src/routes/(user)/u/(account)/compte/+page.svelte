<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import FieldTogglePassword from '$components/FieldTogglePassword.svelte';
	import Icon from '$components/Icon.svelte';
	import Select from '$components/Select.svelte';
	import TextArea from '$components/TextArea.svelte';
	import { LOAD_DEPENDENCIES } from '$utils/enums';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form
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
	<h2>Général</h2>
	<input name="id" type="hidden" value={data.profile.id} readonly />
	<Field name="first_name" value={data.profile.first_name} required>
		<svelte:fragment slot="label">Prénom ou pseudonyme</svelte:fragment>
	</Field>
	<Field name="last_name" value={data.profile.last_name}>
		<svelte:fragment slot="label">Nom de famille</svelte:fragment>
	</Field>
	<Field name="public_email" value={data.profile.public_email}>
		<svelte:fragment slot="label">Courriel public</svelte:fragment>
	</Field>
	<TextArea name="about" value={data.profile.about}>
		<svelte:fragment slot="label">À propos</svelte:fragment>
	</TextArea>
	<Button style="align-self: flex-end" type="submit">Sauvegarder</Button>
</form>
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
	<h2>Rôle & permissions</h2>
	<p>Modifiez le rôle associé à votre compte.</p>
	<p class="sub">
		Notez que pour obtenir un rôle qui vous accorde plus de permissions, votre demande devra être
		approuvée par un administrateur.
	</p>
	<Select options={data.roles} let:datum>
		<option value={datum.user_role}>{datum.title}</option>
	</Select>
	<div class="ui-select">
		<span>Test</span>
		<select name="role">
			{#each data.roles as role}
				<option value={role.user_role}>{role.title}: <i>{role.description}</i></option>
			{/each}
		</select>
	</div>
</form>
<form
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
	<input name="id" type="hidden" value={data.profile.id} readonly autocomplete="false" />
	<h2>Sécurité</h2>
	<h3>Modifier mon courriel d'authentification</h3>
	<Field placeholder="Courriel d'authentification" type="email" value={data.session?.user.email} />
	<h3>Modifier mon mot de passe</h3>
	<Field placeholder="Mot de passe actuel" type="password" name="new_password">
		<FieldTogglePassword slot="trailing" />
	</Field>
	<Field placeholder="Nouveau mot de passe" type="password" />
	<h3>Désactivation</h3>
	<Button variant="danger" style="align-self: flex-start"
		><Icon name="warn" slot="leading" />Supprimer mon compte</Button
	>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: var(--ui-gutter);
	}

	h2 {
		font-size: var(--ui-text-xl);
		margin: 0.5em 0;
		font-weight: 600;
	}

	h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		margin: 0.5em 0;

		h2 + & {
			margin-top: 0;
		}
	}
</style>
