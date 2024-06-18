<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorFormDialog from '$lib/components/patterns/descriptor-form-dialog.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import { extendSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	let {
		projectTypesForm,
		projectTypeFormData,
	}: {
		projectTypesForm: ExtendedSuperFormData<PageData['projectTypesForm']>;
		projectTypeFormData: PageData['projectTypeForms'][number];
	} = $props();

	const projectTypeForm = extendSuperForm(superForm(projectTypeFormData, { dataType: 'json' }));

	const { form, enhance } = projectTypeForm;
</script>

<DescriptorFormDialog {...projectTypeForm}>
	{#snippet token(triggerAttributes)}
		<button class="button rounded-full" type="button" {...triggerAttributes}>
			{$form.translations[$page.data.lang].title}
		</button>
	{/snippet}
	{#snippet title()}
		{m.project_type()}
	{/snippet}
	{#snippet body()}
		<form
			class="dialog-section gap-card-gutter flex flex-col"
			use:enhance
			method="POST"
			id={$form.id}
		>
			<TranslationsTabs>
				{#snippet children({ lang })}
					<label class="field">
						<span class="field-label">{m.title()}</span>
						<input type="text" class="input" bind:value={$form.translations[lang].title} />
					</label>
					<label class="field">
						<span class="field-label">{m.description()}</span>
						<textarea class="input" bind:value={$form.translations[lang].description}></textarea>
					</label>
				{/snippet}
			</TranslationsTabs>
		</form>
	{/snippet}
</DescriptorFormDialog>
