<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Popup from '$components/Popup.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<form
	id="edit-project"
	method="POST"
	action="?/upsert"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h2>Général</h2>
	<input type="text" name="title" id="" placeholder="Titre du projet" value={data.project?.title ?? ''} />

	<Button type="submit">{data.project ? 'Mettre à jour' : 'Créer'}</Button>
</form>
<form action="">
	<h2>Visibilité</h2>
	<h3>Partager les droits d'édition</h3>
	<input type="search" />
	<h3>Publier</h3>
	<Popup>
		<input type="checkbox" name="" on:input id="" slot="trigger" />
		Some stuff
	</Popup>
	<h3>Supprimer</h3>
	<Button variant="danger">Supprimer le projet</Button>
</form>

<style lang="scss">
	form {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}
</style>
