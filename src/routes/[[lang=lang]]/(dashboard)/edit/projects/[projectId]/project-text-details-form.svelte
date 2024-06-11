<script lang="ts">
	import * as m from '$i18n/messages';
	import TranslationsInput from '$lib/components/patterns/TranslationsInput.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let { form }: ExtendedSuperFormData<PageData['form']> = $props();

	let test = $derived($form);
</script>

<fieldset class="dashboard-section">
	<legend class="dashboard-section-title">
		{m.presentation()}
	</legend>
	<div class="dashboard-subsection-content">
		<h4 class="h6">
			{m.title()}
		</h4>
		<TranslationsInput>
			{#snippet children({ lang })}
				<input
					type="text"
					class="input"
					bind:value={$form.translations[lang].title}
					placeholder={m.no_title()}
				/>
			{/snippet}
		</TranslationsInput>
		<!-- <h4 class="h6">
			{m.summary()}
		</h4>
		<TranslationsInput let:lang>
			<textarea
				rows="5"
				class="input resize"
				bind:value={$form.translations[lang].summary}
				placeholder={m.no_summary()}
			/>
		</TranslationsInput>
		<h4 class="h6">
			{m.description()}
		</h4>
		<TranslationsInput let:lang>
			<textarea
				rows="10"
				class="input resize"
				bind:value={$form.translations[lang].description}
				placeholder={m.no_description()}
			/>
		</TranslationsInput> -->
	</div>
</fieldset>
