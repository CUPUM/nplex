<script lang="ts">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import DialogFormBox from '$lib/components/patterns/dialog-form-box.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Pen } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		data,
	}: {
		data: PageData['projectExemplarityCategoryCreateForm'];
	} = $props();

	const createForm = extendedSuperForm(data, {
		dataType: 'json',
		invalidateAll: true,
		resetForm: true,
	});

	const { form, constraints } = createForm;

	const dialog = new DialogForm(createForm);
</script>

<button
	class="button button-dashed rounded-full"
	type="button"
	{...dialog.triggerAttributes}
	use:ripple
>
	<Pen />
	{m.create()}
</button>

<DialogFormBox {dialog} action="?/createCategory">
	{#snippet title()}
		{m.project_exemplarity_category_create()}
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
</DialogFormBox>
