<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let title = '';
</script>

<form
	id="create"
	method="POST"
	action="?/create"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h1>Créer un nouveau projet</h1>
	<p>
		Pour initialiser une fiche de projet, commencez par définir un titre.<br />(Celui-ci pourra
		être modifié ultérieurement.)
	</p>
	<Field name="title" bind:value={title} invalid={Boolean(form?.title?.length)}>
		<svelte:fragment slot="label">Titre du projet</svelte:fragment>
	</Field>
	<Button type="submit" disabled={!title}>
		Créer
		<Icon slot="leading" name="plus" />
	</Button>
</form>

<style lang="scss">
	form {
		width: 100%;
		max-width: var(--ui-size-xl);
		margin: 0 auto;
		padding: 4rem 2rem;
		gap: 2rem;
		// border-radius: var(--ui-radius-lg);
		// background: col(bg, 900);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 600px;
	}
</style>
