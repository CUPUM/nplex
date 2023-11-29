<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import TranslationsInput from '$lib/components/TranslationsInput.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import type { PageData } from './$types';

	export let form: SuperFormPageData<PageData['form']>['form'];
</script>

<DashboardFormSection title={$langKey(m.presentation())}>
	<h4 class="h6">
		<LangKey>{m.title()}</LangKey>
	</h4>
	<TranslationsInput let:lang>
		<input
			type="text"
			class="input"
			bind:value={$form.translations[lang].title}
			placeholder={$langKey(m.noTitle())}
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
			placeholder={$langKey(m.noSummary())}
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
			placeholder={$langKey(m.noDescription())}
		/>
	</TranslationsInput>
</DashboardFormSection>

<style lang="postcss">
</style>
