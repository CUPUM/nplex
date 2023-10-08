<script lang="ts">
	import TranslationsField from '$lib/components/TranslationsField.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { superForm } from 'sveltekit-superforms/client';
	import ProjectForm from './ProjectForm.svelte';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

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

<ProjectForm {enhance} let:element let:loading>
	<svelte:fragment slot="header">General</svelte:fragment>
	<ProjectFormGroup>
		<TranslationsField let:locale>
			<svelte:fragment slot="legend">{$t.title}</svelte:fragment>
			<input type="text" class="input" bind:value={$form.translations[locale].title} />
		</TranslationsField>
		<TranslationsField let:locale>
			<svelte:fragment slot="legend">{$t.description}</svelte:fragment>
			<textarea class="input" bind:value={$form.translations[locale].description} />
		</TranslationsField>
	</ProjectFormGroup>
</ProjectForm>

<style lang="postcss">
</style>
