<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { DECRIPTORS_ALLOWED_ROLES } from '$routes/(authed)/editer/constants';
	import { userHasRole } from '$utils/validation';
	import { writable } from 'svelte/store';
	import { enhanceProjectForm } from '../common';

	export let categoryId: number;

	const formid = `create-indicator-${categoryId}`;
	const creating = writable(false);
</script>

<Modal let:close>
	<svelte:fragment slot="control" let:open>
		<Button
			disabled={!userHasRole($page.data, ...DECRIPTORS_ALLOWED_ROLES)}
			class="text-xs"
			variant="dashed"
			on:click={open}
		>
			<Icon name="plus" slot="leading" />Crééer un indicateur
		</Button>
	</svelte:fragment>
	<svelte:fragment slot="header">Créer un nouvel indicateur d’exemplarité</svelte:fragment>
	<form
		method="POST"
		use:enhanceProjectForm={{
			stateStore: creating,
			afterUpdate: (res) => {
				if (res.type === 'success') close();
			},
		}}
		id={formid}
		class="flex flex-c gap-md"
		action="/editer/descripteurs/projets/indicateurs?/create"
	>
		<input type="hidden" name="new.category" value={categoryId} />
		<Field required name="new.title">
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
		<Field required name="new.short_title">
			<svelte:fragment slot="label">Titre court</svelte:fragment>
		</Field>
		<TextArea name="new.description">
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</form>
	<svelte:fragment slot="footer">
		<Button variant="cta" type="submit" loading={$creating} form={formid}>Confirmer</Button>
	</svelte:fragment>
</Modal>

<style lang="scss">
	form {
		position: relative;
		width: var(--ui-width-md);
		max-width: 100%;
	}
</style>
