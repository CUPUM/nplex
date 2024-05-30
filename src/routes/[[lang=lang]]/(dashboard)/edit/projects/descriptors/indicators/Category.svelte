<script
	lang="ts"
	generics="C extends PageData['categoryForms'][number], I extends PageData['indicatorForms'], NI extends PageData['newIndicatorForm']"
>
	import { page } from '$app/stores';
	import Dialog from '$lib/components/Dialog.svelte';
	import ButtonSave from '$lib/components/patterns/ButtonSave.svelte';
	import { superFormDialog, type SuperForm } from '$lib/crud/validation/forms/super-form';
	import DescriptorForm from '../../../DescriptorForm.svelte';
	import DescriptorList from '../../../DescriptorList.svelte';
	import MetaDescriptor from '../../../MetaDescriptor.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import type { PageData } from './$types';
	import Indicator from './Indicator.svelte';
	import NewIndicator from './NewIndicator.svelte';

	export let i: number;
	export let data: C;
	export let indicatorForms: I;
	export let newIndicatorForm: NI;
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
			<NewIndicator data={newIndicatorForm} categoryId={$form.id} />
		</li>
		{#each indicatorForms as interventionForm, i (interventionForm.id)}
			<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
				<Indicator data={interventionForm} {listSubmitter} />
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
