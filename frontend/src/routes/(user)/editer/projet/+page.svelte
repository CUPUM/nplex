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
	<fieldset>
		<p>
			Pour initialiser une fiche de projet, commencez par définir un titre. Ce titre pourra être
			modifié ultérieurement.
		</p>
		<Field name="title" class="title" bind:value={title} invalid={Boolean(form?.title?.length)}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
		<Button type="submit" disabled={!title}>
			Créer
			<Icon slot="leading" name="plus" />
		</Button>
	</fieldset>
</form>

<style lang="scss">
	form {
		width: 100%;
		padding-block: calc(var(--ui-nav-px) + var(--ui-gutter));
		min-height: 100vh;
		margin: 0 auto;
		margin-top: calc(-1 * var(--ui-nav-px));
		background: col(bg, 500);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	h1 {
		font-size: var(--ui-text-2xl);
		max-width: var(--ui-font-main);
		padding: 0 var(--ui-gutter);
		font-weight: 600;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: var(--ui-width-p);
		padding: 0 var(--ui-gutter);

		:global(.title) {
			width: 100%;
		}
	}
</style>
