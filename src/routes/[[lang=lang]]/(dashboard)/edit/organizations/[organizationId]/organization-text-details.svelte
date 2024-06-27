<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import TranslationsInput from '$lib/components/patterns/translations-input.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let { form, errors, constraints }: ExtendedSuperFormData<PageData['form']> = $props();
</script>

<DashboardSubSection class="items-stretch">
	{#snippet header()}
		<h3>
			{m.presentation()}
		</h3>
	{/snippet}
	<Field class="text-md mx-auto w-full max-w-md">
		{#snippet label()}
			{m.organization_name()}
		{/snippet}
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
	</Field>
	<Field class="mx-auto w-full max-w-md">
		{#snippet label()}
			{m.summary()}
		{/snippet}
		<TranslationsInput>
			{#snippet children({ lang })}
				<textarea
					rows="3"
					class="input"
					bind:value={$form.translations[lang].summary}
					placeholder={m.no_summary()}
					{...$constraints.translations?.[lang]?.summary}
					aria-invalid={$errors.translations?.[lang]?.summary ? true : undefined}
				></textarea>
			{/snippet}
		</TranslationsInput>
	</Field>
	<Field class="mx-auto w-full max-w-md">
		{#snippet label()}
			{m.description()}
		{/snippet}
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
	</Field>
</DashboardSubSection>
