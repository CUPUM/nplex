<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import type { PageData } from './$types';

	export let metaId: PageData['metaIndicators'][number]['id'];
	export let data: PageData['metaIndicators'][number]['indicators'][number];
	export let i: number;
	export let opened = false;
</script>

<fieldset>
	<Field
		variant="outlined"
		style="flex: 1"
		placeholder="Titre"
		name="indicators['{data.id}'].title"
		required
		bind:value={data.title}
	>
		<svelte:fragment slot="trailing">
			<Button
				equi
				on:click={(e) => {
					e.stopPropagation();
					opened = true;
				}}
			>
				<Icon name="plus" />
			</Button>
			<FieldIcon style="cursor: grab" name="handle-move-vertical" />
		</svelte:fragment>
	</Field>
	<input type="hidden" name="indicators['{data.id}'].id" readonly value={data.id} />
	<input
		type="hidden"
		name="indicators['{data.id}'].category_id"
		readonly
		value={data.indicator_category_id}
	/>
	<input type="hidden" name="indicators['{data.id}'].label" readonly value={data.label} />
	<input
		type="hidden"
		name="indicators['{data.id}'].description"
		readonly
		value={data.description}
	/>
</fieldset>
<Modal bind:opened>
	<span slot="header">Détails de l'indicateur</span>
	<ul>
		<Field variant="outlined" required bind:value={data.title}>
			<svelte:fragment slot="label">Nom de l'indicateur</svelte:fragment>
		</Field>
		<Field variant="outlined" required bind:value={data.label}>
			<svelte:fragment slot="label">Nom court</svelte:fragment>
		</Field>
		<TextArea variant="outlined" bind:value={data.description}>
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</ul>
	<svelte:fragment slot="footer" let:close>
		<Button on:click={close}>
			Continuer <Icon name="check" slot="trailing" />
		</Button>
	</svelte:fragment>
</Modal>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: stretch;
		gap: 1em;
		font-size: var(--ui-text-sm);
		// padding: 0.5em;
		// background-color: col(bg, 900);
		border-radius: var(--ui-radius-md);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: var(--ui-width-md);
		max-width: 100%;
	}
</style>
