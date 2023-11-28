<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import LocaleInput from '$lib/components/LocaleInput.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { langKey } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	export let form: SuperFormPageData<PageData['form']>['form'];
</script>

<DashboardFormSection title={$langKey(m.presentation())}>
	<h4 class="h6">
		<LangKey>{m.title()}</LangKey>
	</h4>
	<LocaleInput let:locale>
		<input
			type="text"
			class="input"
			bind:value={$form.translations[locale].title}
			placeholder={$langKey(m.noTitle())}
		/>
	</LocaleInput>
	<h4 class="h6">
		<LangKey>{m.summary()}</LangKey>
	</h4>
	<LocaleInput let:locale>
		<textarea
			rows="5"
			class="input resize"
			bind:value={$form.translations[locale].summary}
			placeholder={$langKey(m.noSummary())}
		/>
	</LocaleInput>
	<h4 class="h6">
		<LangKey>{m.description()}</LangKey>
	</h4>
	<LocaleInput let:locale>
		<textarea
			rows="10"
			class="input resize"
			bind:value={$form.translations[locale].description}
			placeholder={$langKey(m.noDescription())}
		/>
	</LocaleInput>
</DashboardFormSection>

<style lang="postcss">
</style>
