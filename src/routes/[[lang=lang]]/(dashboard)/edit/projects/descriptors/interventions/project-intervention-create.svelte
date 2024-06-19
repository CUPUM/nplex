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
		projectTypes,
	}: {
		projectTypes: PageData['projectTypes'];
		data: PageData['projectInterventionAndCategoryForms'][number][1];
	} = $props();

	const projectInterventionCreateForm = extendedSuperForm(data, {
		dataType: 'json',
		invalidateAll: true,
		resetForm: true,
	});

	const { form, constraints } = projectInterventionCreateForm;
</script>

<DescriptorFormDialog form={projectInterventionCreateForm} action="?/createIntervention">
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
		{m.project_intervention_create()}
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
		<fieldset class="field">
			<legend class="field-label">{m.project_types()}</legend>
			<ul class="gap-gutter flex flex-row">
				{#await projectTypes}
					...
				{:then awaitedProjectTypes}
					{#each awaitedProjectTypes as projectType}
						<label class="button rounded-full">
							{projectType.title}
							<input
								type="checkbox"
								class="sr-only"
								bind:group={$form.typesIds}
								value={projectType.id}
							/>
						</label>
					{/each}
				{/await}
			</ul>
		</fieldset>
	{/snippet}
</DescriptorFormDialog>
