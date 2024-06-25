<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import TranslationsInput from '$lib/components/patterns/translations-input.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let { form, errors, constraints }: ExtendedSuperFormData<PageData['form']> = $props();
</script>

<DashboardSubSection class="items-stretch">
	{#snippet header()}
		<h4>{m.presentation()}</h4>
	{/snippet}
	<div class="field">
		<h4 class="field-label">
			{m.title()}
		</h4>
		<TranslationsInput class="big">
			{#snippet children({ lang })}
				<input
					type="text"
					class="input"
					bind:value={$form.translations[lang].title}
					placeholder={m.no_title(undefined, { languageTag: lang })}
					{...$constraints.translations?.[lang]?.title}
					aria-invalid={$errors.translations?.[lang]?.title ? true : undefined}
				/>
			{/snippet}
		</TranslationsInput>
	</div>
	<div class="field">
		<h4 class="field-label">
			{m.summary()}
		</h4>
		<TranslationsInput>
			{#snippet children({ lang })}
				<textarea
					rows="5"
					class="input"
					bind:value={$form.translations[lang].summary}
					placeholder={m.no_summary(undefined, { languageTag: lang })}
					{...$constraints.translations?.[lang]?.summary}
					aria-invalid={$errors.translations?.[lang]?.summary ? true : undefined}
				></textarea>
			{/snippet}
		</TranslationsInput>
	</div>
	<div class="field">
		<h4 class="field-label">
			{m.description()}
		</h4>
		<TranslationsInput>
			{#snippet children({ lang })}
				<textarea
					rows="10"
					class="input"
					bind:value={$form.translations[lang].description}
					placeholder={m.no_description(undefined, { languageTag: lang })}
					{...$constraints.translations?.[lang]?.description}
					aria-invalid={$errors.translations?.[lang]?.description ? true : undefined}
				></textarea>
			{/snippet}
		</TranslationsInput>
	</div>
</DashboardSubSection>
