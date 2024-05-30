<script lang="ts">
	import { page } from '$app/stores';
	import Dialog from '$lib/components/Dialog.svelte';
	import ButtonSave from '$lib/components/patterns/ButtonSave.svelte';
	import { superFormDialog, type SuperForm } from '$lib/crud/validation/forms/super-form';
	import DescriptorForm from '../../../DescriptorForm.svelte';
	import DescriptorList from '../../../DescriptorList.svelte';
	import MetaDescriptor from '../../../MetaDescriptor.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import type { PageData } from './$types';
	import Intervention from './Intervention.svelte';
	import NewIntervention from './NewIntervention.svelte';

	export let i: number;
	export let data: PageData['categoryForms'][number];
	export let types: PageData['types'];
	export let interventionForms: PageData['interventionForms'];
	export let newInterventionForm: PageData['newInterventionForm'];
	export let listSubmitter: SuperForm['elements']['submitter']['root'];

	const {
		form,
		elements: {
			trigger,
			submitter: { root: submitter },
			...restElements
		},
		tainted,
		states: { open },
		enhance,
	} = superFormDialog(data, { dataType: 'json', resetForm: false });
</script>

<MetaDescriptor
	{i}
	{trigger}
	{submitter}
	deleteButton={{
		name: 'id',
		formaction: '?/deleteCategory',
		value: $form.id,
	}}
>
	<svetle:fragment slot="title">
		{$form.translations[$page.data.lang].title}
	</svetle:fragment>
	<svelte:fragment slot="description">
		{$form.translations[$page.data.lang].description || 'Aucune description'}
	</svelte:fragment>
	<DescriptorList>
		<li>
			<NewIntervention data={newInterventionForm} categoryId={$form.id} {types} />
		</li>
		{#each interventionForms as interventionForm, i (interventionForm.id)}
			<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
				<Intervention data={interventionForm} {listSubmitter} {types} />
			</li>
		{/each}
	</DescriptorList>
</MetaDescriptor>
<Dialog {open} {...restElements}>
	<svelte:fragment slot="title">Type</svelte:fragment>
	<DescriptorForm {enhance} id={data.id} action="?/updateCategory">
		<svelte:fragment slot="translation" let:lang>
			<input type="text" class="input" bind:value={$form.translations[lang].title} />
			<textarea class="input" bind:value={$form.translations[lang].description} />
		</svelte:fragment>
	</DescriptorForm>
	<svelte:fragment slot="footer">
		<ButtonSave type="submit" form={data.id} {submitter} disabled={!$tainted} />
	</svelte:fragment>
</Dialog>

<style>
</style>
