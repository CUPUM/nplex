<script lang="ts">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import DescriptorCreateFormToken from '$lib/components/patterns/descriptor-create-form-token.svelte';
	import DialogFormBox from '$lib/components/patterns/dialog-form-box.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let {
		data,
		projectTypes,
	}: {
		projectTypes: PageData['projectTypes'];
		data: PageData['projectInterventionAndCategoryForms'][number][1];
	} = $props();

	const createForm = extendedSuperForm(data, {
		dataType: 'json',
		invalidateAll: true,
		resetForm: true,
	});

	const { form, constraints } = createForm;

	const dialog = new DialogForm(createForm);
</script>

<DescriptorCreateFormToken {dialog}>
	{m.create()}
</DescriptorCreateFormToken>

<DialogFormBox {dialog}>
	{#snippet title()}
		{m.project_intervention_create()}
	{/snippet}
	<TranslationsTabs>
		{#snippet tab({ lang, isCurrent })}
			<Field>
				{#snippet label()}
					{m.title()}
				{/snippet}
				<input
					type="text"
					class="input"
					{...$constraints.translations?.[lang]?.description}
					bind:value={$form.translations[lang].title}
				/>
			</Field>
			<Field>
				{#snippet label()}
					{m.description()}
				{/snippet}
				<textarea
					class="input"
					rows="5"
					{...$constraints.translations?.[lang]?.description}
					bind:value={$form.translations[lang].description}
				></textarea>
			</Field>
		{/snippet}
	</TranslationsTabs>
	<Field as="fieldset">
		{#snippet label()}
			{m.project_types()}
		{/snippet}
		<ul class="gap-gap flex flex-row">
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
	</Field>
</DialogFormBox>
