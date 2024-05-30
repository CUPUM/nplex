<script lang="ts" generics="T extends PageData['indicatorForms'][number]">
	import { page } from '$app/stores';
	import Dialog from '$lib/components/Dialog.svelte';
	import ButtonSave from '$lib/components/patterns/ButtonSave.svelte';
	import { superFormDialog, type SuperForm } from '$lib/crud/validation/forms/super-form';
	import Descriptor from '../../../Descriptor.svelte';
	import DescriptorForm from '../../../DescriptorForm.svelte';
	import type { PageData } from './$types';

	export let data: T;
	export let listSubmitter: SuperForm['elements']['submitter']['root'];

	const {
		elements: {
			trigger,
			submitter: { root: submitter },
			...restElements
		},
		states: { open },
		form,
		errors,
		tainted,
		enhance,
	} = superFormDialog(data, { dataType: 'json', resetForm: false });
</script>

<Descriptor
	{trigger}
	submitter={listSubmitter}
	deleteButton={{
		formaction: '?/deleteIndicator',
		value: $form.id,
		name: 'id',
	}}
	label={$form.translations[$page.data.lang].title}
/>
<Dialog {open} {...restElements}>
	<svelte:fragment slot="title">Type</svelte:fragment>
	<DescriptorForm {enhance} id={data.id} action="?/updateIndicator">
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
