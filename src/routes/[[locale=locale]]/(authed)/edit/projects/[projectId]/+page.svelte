<script lang="ts">
	import TranslationsTabs from '$lib/components/TranslationsTabs.svelte';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { createTranslations } from '$lib/i18n/translate';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, enhance, constraints, errors, delayed, submitting } = superForm(data.form, {
		dataType: 'json',
	});

	const t = createTranslations({
		fr: {
			title: 'Titre',
			summary: 'Sommaire',
			description: 'Description',
			type: 'Type',
			interventions: 'Intervention',
		},
		en: {
			title: 'Title',
			summary: 'Summary',
			description: 'Description',
			type: 'Type',
			interventions: 'Intervention',
		},
	});
</script>

<h1>Général</h1>
<form method="POST" use:enhance>
	<TranslationsTabs let:locale>
		{@const id = `project-title-${locale}`}
		<input type="text" {id} name="{locale}.title" />
	</TranslationsTabs>
	<fieldset>
		<legend>
			{$t.summary}
		</legend>
		{#each LOCALES_ARR as locale}
			{@const id = `project-summary-${locale}`}
			<label for={id}>{LOCALES_DETAILS[locale].label}</label>
			<input type="text" {id} name="summary.{locale}" />
		{/each}
	</fieldset>
	<fieldset>
		<legend>
			{$t.description}
		</legend>
		{#each LOCALES_ARR as locale}
			{@const id = `project-description-${locale}`}
			<label for={id}>{LOCALES_DETAILS[locale].label}</label>
			<input type="text" {id} name="description.{locale}" />
		{/each}
	</fieldset>
	<fieldset>
		<legend>
			{$t.type}
		</legend>
		<select name="" id=""></select>
	</fieldset>
</form>

<style lang="scss">
</style>
