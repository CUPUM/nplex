<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import type { PageData } from './$types';
	import { INDICATORS_KEY_NEW } from './common';

	export let category: PageData['exemplarityCategories'][number]['id'];
	export let opened = false;

	const FORM_ID = 'create-indicator';

	$: if ($page.form?.created) {
		opened = false;
	}
</script>

<Button variant="ghost" style="font-size: var(--ui-text-sm);" on:click={() => (opened = true)}>
	<Icon name="plus" slot="leading" /> Créer un nouvel indicateur
</Button>
<!-- Portaled modal -->
<Modal bind:opened>
	<svelte:fragment slot="header">Créez un nouvel indicateur d'exemplarité</svelte:fragment>
	<form
		id={FORM_ID}
		use:enhance={(a) => {
			return (f) => {
				f.update({ reset: false });
			};
		}}
		method="POST"
		action="?/create"
	>
		<Field variant="outlined" name="{INDICATORS_KEY_NEW}.title" required>
			<svetle:fragment slot="label">Titre du nouvel indicateur</svetle:fragment>
		</Field>
		<Field variant="outlined" name="{INDICATORS_KEY_NEW}.short_title" required>
			<svetle:fragment slot="label">Titre court</svetle:fragment>
		</Field>
		<TextArea variant="outlined" name="{INDICATORS_KEY_NEW}.description">
			<svetle:fragment slot="label">Description</svetle:fragment>
		</TextArea>
		<input type="hidden" name="{INDICATORS_KEY_NEW}.category" readonly value={category} />
	</form>
	<svelte:fragment slot="footer">
		<Button variant="cta" type="submit" form={FORM_ID} formaction="?/create">
			Créer <Icon name="check" slot="trailing" />
		</Button>
	</svelte:fragment>
</Modal>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-block: 0.5rem;
		width: var(--ui-width-md);
		max-width: 100%;
	}
</style>
