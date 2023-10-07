<script lang="ts">
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
	<!-- <TranslationsTabs let:locale>
		<svelte:fragment slot="legend">
			{$t.title}
		</svelte:fragment>
		{@const id = `project-title-${locale}`}
		<input class="input" type="text" {id} name="{locale}.title" />
	</TranslationsTabs>
	<TranslationsTabs let:locale>
		<svelte:fragment slot="legend">
			{$t.summary}
		</svelte:fragment>
		{@const id = `project-summary-${locale}`}
		<input class="input" type="text" {id} name="{locale}.summary" />
	</TranslationsTabs>
	<TranslationsTabs let:locale>
		<svelte:fragment slot="legend">
			{$t.description}
		</svelte:fragment>
		{@const id = `project-description-${locale}`}
		<input class="input" type="text" {id} name="{locale}.description" />
	</TranslationsTabs> -->
	<fieldset>
		<legend>
			{$t.type}
		</legend>
		<select class="input" name="" id=""></select>
	</fieldset>
</form>

<style lang="postcss">
	form {
		font-size: var(--size-sm);
	}
</style>
