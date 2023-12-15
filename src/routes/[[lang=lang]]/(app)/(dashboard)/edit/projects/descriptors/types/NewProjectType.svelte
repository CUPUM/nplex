<script lang="ts" generics="T extends PageData['newForm']">
	import ButtonCreate from '$lib/components/ButtonCreate.svelte';
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
	} = superFormDialog(data, {
		dataType: 'json',
		taintedMessage: null,
		closeOnSuccess: true,
		resetForm: true,
	});
</script>

<DescriptorChip2 {trigger} {submitter} variant="new" />
<Dialog {open} {...restElements}>
	<svelte:fragment slot="header">Type</svelte:fragment>
	<DescriptorForm {enhance} id={data.id} action="?/create">
		<svelte:fragment slot="translation" let:lang>
			<input type="text" class="input" bind:value={$form.translations[lang].title} />
			<textarea class="input" bind:value={$form.translations[lang].description} />
		</svelte:fragment>
	</DescriptorForm>
	<svelte:fragment slot="footer">
		<ButtonCreate form={data.id} type="submit" {submitter} disabled={!$tainted} />
	</svelte:fragment>
</Dialog>

<style lang="postcss">
	.untitled {
		opacity: var(--opacity-dimmer);
		font-style: italic;
		font-weight: 300;
		white-space: nowrap;
	}
</style>
