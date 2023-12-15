<script lang="ts" generics="T extends PageData['forms'][number]">
	import { page } from '$app/stores';
	import ButtonSave from '$lib/components/ButtonSave.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import { superFormDialog, type SuperForm } from '$lib/forms/super-form';
	import DescriptorChip2 from '../DescriptorChip2.svelte';
	import DescriptorForm from '../DescriptorForm.svelte';
	import type { PageData } from './$types';

	export let data: T;
	export let submitter: SuperForm['elements']['submitter']['root'];

	const {
		elements: { trigger, ...restElements },
		states: { open },
		form,
		errors,
		tainted,
		enhance,
	} = superFormDialog(data, { dataType: 'json', preventScroll: true });
</script>

<DescriptorChip2
	{trigger}
	{submitter}
	deleteButton={{
		formaction: '?/delete',
		value: $form.id,
		name: 'ownershipId',
	}}
	label={$form.translations[$page.data.lang].title}
/>
<Dialog {open} {...restElements}>
	<svelte:fragment slot="header">Type</svelte:fragment>
	<DescriptorForm {enhance} id={data.id} action="?/update">
		<svelte:fragment slot="translation" let:lang>
			<input type="text" class="input" bind:value={$form.translations[lang].title} />
			<textarea class="input" bind:value={$form.translations[lang].description} />
		</svelte:fragment>
	</DescriptorForm>
	<svelte:fragment slot="footer">
		<ButtonSave type="submit" form={data.id} {submitter} disabled={!$tainted}>Update</ButtonSave>
	</svelte:fragment>
</Dialog>

<style lang="postcss">
</style>
