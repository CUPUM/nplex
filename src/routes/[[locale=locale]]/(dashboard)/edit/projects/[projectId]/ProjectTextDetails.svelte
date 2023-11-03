<script lang="ts">
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import TranslationsField from '$lib/components/TranslationsField.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Titre',
			summary: 'Sommaire',
			description: 'Description',
		},
		en: {
			title: 'Title',
			summary: 'Summary',
			description: 'Description',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
</script>

<DashboardFormSection>
	<TranslationsField let:locale>
		<svelte:fragment slot="legend">{$t.title}</svelte:fragment>
		<input type="text" class="input title" bind:value={$form.translations[locale].title} />
	</TranslationsField>
	<TranslationsField let:locale>
		<svelte:fragment slot="legend">{$t.summary}</svelte:fragment>
		<textarea rows="5" class="input resize" bind:value={$form.translations[locale].summary} />
	</TranslationsField>
	<TranslationsField let:locale>
		<svelte:fragment slot="legend">{$t.description}</svelte:fragment>
		<textarea rows="10" class="input resize" bind:value={$form.translations[locale].description} />
	</TranslationsField>
</DashboardFormSection>

<style lang="postcss">
</style>
