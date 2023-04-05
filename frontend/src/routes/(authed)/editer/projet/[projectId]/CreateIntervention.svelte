<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import Token from '$components/Token/Token.svelte';
	import { userHasRole } from '$utils/validation';
	import { writable } from 'svelte/store';
	import { enhanceEditor } from '../../common';
	import { DECRIPTORS_ALLOWED_ROLES } from '../../constants';

	export let categoryId: number;

	const formid = `create-intervention-${categoryId}`;

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
			<Icon name="plus" slot="leading" />Créer un type d'intervention
		</Button>
	</svelte:fragment>
	<svelte:fragment slot="header">Créer</svelte:fragment>
	<form
		id={formid}
		action="/editer/descripteurs/projets/interventions?/create"
		method="POST"
		use:enhanceEditor={{
			stateStore: creating,
			afterUpdate: (res) => {
				if (res.type === 'success') close();
			},
		}}
	>
		<Field name="title">
			<!-- asd -->
		</Field>
		<Field name="description">
			<!-- asd -->
		</Field>
		<fieldset class="flex flex-r gap-md align-fs">
			Est-ce que ce type d'intervention demande généralement un permis?
			<Toggle />
		</fieldset>
		<div class="heading-xs">Types de projet applicables</div>
		<fieldset class="flex flex-r gap-sm">
			<!-- {#each  as }
			{/each} -->
			<Token>Type goes here</Token>
		</fieldset>
	</form>
	<svelte:fragment slot="footer">
		<Button type="submit" form={formid} loading={$creating}>
			<Icon name="check" slot="leading" />Créer
		</Button>
	</svelte:fragment>
</Modal>

<style lang="scss">
</style>
