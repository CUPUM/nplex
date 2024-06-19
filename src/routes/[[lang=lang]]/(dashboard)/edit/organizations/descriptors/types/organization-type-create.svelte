<script lang="ts">
	import * as m from '$i18n/messages';
	import DescriptorFormDialog from '$lib/components/patterns/descriptor-form-dialog.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Pen } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		data,
	}: {
		data: PageData['organizationTypeCreateForm'];
	} = $props();

	const organizationTypeCreateForm = extendedSuperForm(data, {
		dataType: 'json',
		invalidateAll: true,
		resetForm: true,
	});

	const { form, constraints } = organizationTypeCreateForm;
</script>

<DescriptorFormDialog form={organizationTypeCreateForm} action="?/create">
	{#snippet root(triggerAttributes)}
		<button
			class="button button-dashed rounded-full"
			type="button"
			{...triggerAttributes}
			use:ripple
		>
			{m.create()}
			<Pen />
		</button>
	{/snippet}
	{#snippet title()}
		{m.organization_type_create()}
	{/snippet}
	{#snippet formBody()}
		<TranslationsTabs>
			{#snippet tab({ lang, isCurrent })}
				<label class="field">
					<span class="field-label">{m.title()}</span>
					<input
						type="text"
						class="input"
						{...$constraints.translations?.[lang]?.description}
						bind:value={$form.translations[lang].title}
					/>
				</label>
				<label class="field">
					<span class="field-label">{m.description()}</span>
					<textarea
						class="input"
						rows="5"
						{...$constraints.translations?.[lang]?.description}
						bind:value={$form.translations[lang].description}
					></textarea>
				</label>
			{/snippet}
		</TranslationsTabs>
	{/snippet}
</DescriptorFormDialog>
