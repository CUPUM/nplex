<script lang="ts">
	import * as m from '$i18n/messages';
	import TranslationsInput from '$lib/components/patterns/translations-input.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let { form, errors, constraints }: ExtendedSuperFormData<PageData['form']> = $props();
</script>

<fieldset class="dashboard-section">
	<legend class="dashboard-section-title">
		{m.presentation()}
	</legend>
	<div class="dashboard-section-content">
		<div class="field">
			<h4 class="field-label">
				{m.title()}
			</h4>
			<TranslationsInput class="big">
				{#snippet children({ lang })}
					<input
						type="text"
						class="input"
						bind:value={$form.translations[lang].name}
						placeholder={m.no_name()}
						{...$constraints.translations?.[lang]?.name}
						aria-invalid={$errors.translations?.[lang]?.name ? true : undefined}
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
						placeholder={m.no_summary()}
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
						placeholder={m.no_description()}
						{...$constraints.translations?.[lang]?.description}
						aria-invalid={$errors.translations?.[lang]?.description ? true : undefined}
					></textarea>
				{/snippet}
			</TranslationsInput>
		</div>
	</div>
</fieldset>
