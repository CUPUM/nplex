<script lang="ts">
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LocaleInput from '$lib/components/LocaleInput.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			presentation: 'Présentation',
			title: 'Titre',
			titlePlaceholder: 'Aucun titre',
			summary: 'Sommaire',
			summaryPlaceholder: 'Aucun sommaire',
			description: 'Description',
			descriptionPlaceholder: 'Aucune description',
		},
		en: {
			presentation: 'Presentation',
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

<DashboardFormSection title={$t.presentation}>
	<h4 class="h6">{$t.title}</h4>
	<LocaleInput let:locale>
		<input
			type="text"
			class="input"
			bind:value={$form.translations[locale].title}
			placeholder={$t.titlePlaceholder}
		/>
	</LocaleInput>
	<h4 class="h6">{$t.summary}</h4>
	<LocaleInput let:locale>
		<textarea
			rows="5"
			class="input resize"
			bind:value={$form.translations[locale].summary}
			placeholder={$t.summaryPlaceholder}
		/>
	</LocaleInput>
	<h4 class="h6">{$t.description}</h4>
	<LocaleInput let:locale>
		<textarea
			rows="10"
			class="input resize"
			bind:value={$form.translations[locale].description}
			placeholder={$t.descriptionPlaceholder}
		/>
	</LocaleInput>
</DashboardFormSection>

<style lang="postcss">
</style>
