<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.error) {
		// messages.dispatch({
		// 	content: form.error.message,
		// 	type: 'error',
		// });
	}
</script>

<form
	id="profile"
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h2>Profil</h2>
	<input name="id" type="hidden" value={data.profile.id} readonly />
	<Field name="first_name" variant="outlined" value={data.profile.first_name ?? ''} class="field">
		<svelte:fragment slot="label">Prénom</svelte:fragment>
	</Field>
	<Field name="last_name" variant="outlined" value={data.profile.last_name ?? ''} class="field">
		<svelte:fragment slot="label">Nom de famille</svelte:fragment>
	</Field>
	<Field name="public_email" variant="outlined" value={data.profile.public_email ?? ''} class="field">
		<svelte:fragment slot="label">Courriel public</svelte:fragment>
	</Field>
	<Field variant="outlined" readonly value={data.profile.role ?? ''}>
		<svelte:fragment slot="label">Rôle</svelte:fragment>
	</Field>
	<textarea name="about" value={data.profile.about} placeholder="À propos de moi" />
	<Button type="submit">Mettre mon profil à jour</Button>
	<Button type="submit" variant="danger" formaction="?/delete">Supprimer mon profil</Button>
</form>
<form
	id="admin-profile"
	method="POST"
	action="?/update"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<span>Zone admin</span>
	<Button type="submit">Test</Button>
</form>
<article>
	<h2>Mes collections</h2>
</article>
<article>
	<h2>Mes favoris</h2>
</article>

<style lang="scss">
	#profile,
	#admin-profile {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 800px;
		margin: 2rem auto;
		gap: 1em;
		align-items: flex-start;
	}
</style>
