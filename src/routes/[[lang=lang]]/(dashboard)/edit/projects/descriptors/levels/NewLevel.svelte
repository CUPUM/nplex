<script lang="ts">
	import * as m from '$i18n/messages';
	import Dialog from '$lib/components/Dialog.svelte';
	import ButtonCreate from '$lib/components/patterns/button-create.svelte';
	import { superFormDialog } from '$lib/crud/validation/forms/super-form';
	import Descriptor from '../../../Descriptor.svelte';
	import DescriptorForm from '../../../DescriptorForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData['newLevelTypeForm'];

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
	} = superFormDialog(data, {
		dataType: 'json',
		taintedMessage: null,
		closeOnSuccess: true,
		resetForm: true,
	});
</script>

<Descriptor {trigger} {submitter} variant="new" />
<Dialog {open} {...restElements}>
	<svelte:fragment slot="title">
		{m.project_type_create()}
	</svelte:fragment>
	<DescriptorForm {enhance} id={data.id} action="?/create">
		<svelte:fragment slot="translation" let:lang>
			<input
				type="text"
				class="input"
				bind:value={$form.translations[lang].title}
				placeholder={m.project_type_title()}
			/>
			<textarea
				class="input"
				bind:value={$form.translations[lang].description}
				placeholder={m.project_type_description()}
			/>
		</svelte:fragment>
	</DescriptorForm>
	<svelte:fragment slot="footer">
		<ButtonCreate form={data.id} type="submit" {submitter} disabled={!$tainted} />
	</svelte:fragment>
</Dialog>

<style>
</style>
