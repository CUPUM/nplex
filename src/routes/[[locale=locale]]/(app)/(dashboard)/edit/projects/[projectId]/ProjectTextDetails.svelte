<script lang="ts">
	import DashboardFormField from '$lib/components/DashboardFormField.svelte';
	import LocaleInput from '$lib/components/LocaleInput.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Titre',
			titlePlaceholder: 'Aucun titre',
			summary: 'Sommaire',
			summaryPlaceholder: 'Aucun sommaire',
			description: 'Description',
			descriptionPlaceholder: 'Aucune description',
		},
		en: {
			title: 'Title',
			titlePlaceholder: 'No title',
			summary: 'Summary',
			summaryPlaceholder: 'No summary',
			description: 'Description',
			descriptionPlaceholder: 'No description',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
</script>

<DashboardFormField title={$t.title} centered>
	<LocaleInput let:locale>
		<input
			type="text"
			class="input"
			bind:value={$form.translations[locale].title}
			placeholder={$t.titlePlaceholder}
		/>
	</LocaleInput>
</DashboardFormField>
<DashboardFormField title={$t.summary} centered>
	<LocaleInput let:locale>
		<textarea
			rows="5"
			class="input resize"
			bind:value={$form.translations[locale].summary}
			placeholder={$t.summaryPlaceholder}
		/>
	</LocaleInput>
</DashboardFormField>
<DashboardFormField title={$t.description} centered>
	<LocaleInput let:locale>
		<textarea
			rows="10"
			class="input resize"
			bind:value={$form.translations[locale].description}
			placeholder={$t.descriptionPlaceholder}
		/>
	</LocaleInput>
</DashboardFormField>

<style lang="postcss">
</style>
