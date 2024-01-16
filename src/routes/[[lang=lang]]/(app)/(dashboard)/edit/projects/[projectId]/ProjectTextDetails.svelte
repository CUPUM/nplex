<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import TranslationsInput from '$lib/components/TranslationsInput.svelte';
	import type { SuperFormData } from '$lib/forms/types';
	import type { PageData } from './$types';

	export let form: SuperFormData<PageData['form']>['form'];
</script>

<fieldset class="dashboard-subsection">
	<legend class="dashboard-subsection-header h5">
		<LangKey>{m.presentation()}</LangKey>
	</legend>
	<div class="dashboard-subsection-content">
		<h4 class="h6">
			<LangKey>{m.title()}</LangKey>
		</h4>
		<TranslationsInput let:lang>
			<input
				type="text"
				class="input"
				bind:value={$form.translations[lang].title}
				placeholder={$langKey(m.no_title())}
			/>
		</TranslationsInput>
		<h4 class="h6">
			<LangKey>{m.summary()}</LangKey>
		</h4>
		<TranslationsInput let:lang>
			<textarea
				rows="5"
				class="input resize"
				bind:value={$form.translations[lang].summary}
				placeholder={$langKey(m.no_summary())}
			/>
		</TranslationsInput>
		<h4 class="h6">
			<LangKey>{m.description()}</LangKey>
		</h4>
		<TranslationsInput let:lang>
			<textarea
				rows="10"
				class="input resize"
				bind:value={$form.translations[lang].description}
				placeholder={$langKey(m.no_description())}
			/>
		</TranslationsInput>
	</div>
</fieldset>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
