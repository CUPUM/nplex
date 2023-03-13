<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import type { PageData } from './$types';
	import { INDICATOR_LABEL_MAX, INDICATOR_TITLE_MAX } from './common';

	export let categoryId: PageData['metaIndicators'][number]['id'];
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
		maxlength={INDICATOR_TITLE_MAX}
		bind:value={data.title}
	>
		<svelte:fragment slot="leading">
			<FieldIcon style="cursor: grab" name="handle-move-vertical" />
		</svelte:fragment>
		<svelte:fragment slot="trailing">
			<Button
				equi
				on:click={(e) => {
					e.stopPropagation();
					opened = true;
				}}
			>
				<Icon name="parameters" />
			</Button>
			<Button equi variant="ghost" state="warning">
				<Icon name="trash" />
			</Button>
		</svelte:fragment>
	</Field>
	<input type="hidden" name="indicators['{data.id}'].id" readonly value={data.id} />
	<input type="hidden" name="indicators['{data.id}'].category_id" readonly value={categoryId} />
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
		<Field variant="outlined" maxlength={INDICATOR_TITLE_MAX} required bind:value={data.title}>
			<svelte:fragment slot="label">Nom de l'indicateur</svelte:fragment>
		</Field>
		<Field variant="outlined" maxlength={INDICATOR_LABEL_MAX} required bind:value={data.label}>
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
