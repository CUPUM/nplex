<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSectionMenu from '$lib/components/patterns/dashboard-section-menu.svelte';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Check, MonitorPlay } from 'lucide-svelte';
	import type { Snapshot } from './$types.js';

	let { data } = $props();

	let smallScale = $state(false);

	export const snapshot: Snapshot<{ smallScale: boolean }> = {
		capture() {
			return { smallScale };
		},
		restore(snapshot) {
			smallScale = snapshot.smallScale;
		},
	};

	const projectForm = extendedSuperForm(data.form, {
		dataType: 'json',
		invalidateAll: 'force',
		resetForm: false,
	});

	const { submitter, enhance, isTainted, tainted, form, constraints, errors } = projectForm;

	let submitRef = $state<HTMLButtonElement>();
</script>

<DashboardSubHeader>
	<h3>
		{m.project_general()}
	</h3>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt rem temporibus, eaque
		a atque iste fuga ea minima omnis rerum provident ullam laboriosam perferendis optio,
		blanditiis, quo possimus doloribus sed laudantium repudiandae vitae? Illum aut vel ipsa vero
		facilis possimus consequuntur error ea? Accusamus ab exercitationem obcaecati facere eius?
	</p>
</DashboardSubHeader>
<DashboardSubSection>
	<form
		use:enhance
		action="?/update"
		method="POST"
		class="gap-lg flex w-full flex-col items-center"
	>
		<!-- Text -->
		<TranslationsTabs class="mx-auto w-full max-w-md">
			{#snippet tab({ lang })}
				<label class="gap-sm mt-sm flex flex-col">
					<span class="text-lg font-bold">
						{m.title(undefined, { languageTag: lang })}
					</span>
					<input
						type="text"
						class="input"
						bind:value={$form.translations[lang].title}
						placeholder={m.no_title(undefined, { languageTag: lang })}
						{...$constraints.translations?.[lang]?.title}
						aria-invalid={$errors.translations?.[lang]?.title ? true : undefined}
					/>
				</label>
				<label class="gap-sm mt-sm flex flex-col">
					<span class="text-lg font-bold">
						{m.summary(undefined, { languageTag: lang })}
					</span>
					<textarea
						rows="5"
						class="input"
						bind:value={$form.translations[lang].summary}
						placeholder={m.no_summary(undefined, { languageTag: lang })}
						{...$constraints.translations?.[lang]?.summary}
						aria-invalid={$errors.translations?.[lang]?.summary ? true : undefined}
					></textarea>
				</label>
				<label class="gap-sm mt-sm flex flex-col">
					<span class="text-lg font-bold">
						{m.description(undefined, { languageTag: lang })}
					</span>
					<textarea
						rows="10"
						class="input"
						bind:value={$form.translations[lang].description}
						placeholder={m.no_description(undefined, { languageTag: lang })}
						{...$constraints.translations?.[lang]?.description}
						aria-invalid={$errors.translations?.[lang]?.description ? true : undefined}
					></textarea>
				</label>
			{/snippet}
		</TranslationsTabs>

		<!-- Type -->
		<fieldset class="gap-md flex w-full max-w-md flex-col">
			<legend class="text-lg font-bold">
				{m.project_type()}
			</legend>
			<ul class="gap-input-group-gap flex flex-row flex-wrap">
				{#await data.types then awaitedTypes}
					{#each awaitedTypes as type (type.id)}
						<label class="button button-dashed flex-none rounded-full" use:ripple>
							<input
								type="checkbox"
								name="typeId"
								bind:group={$form.typeId}
								value={type.id}
								class="sr-only"
							/>
							{type.title}
						</label>
					{/each}
				{/await}
			</ul>
		</fieldset>

		<!-- Interventions -->
		<fieldset class="gap-md mx-auto flex w-full max-w-md flex-col">
			<legend class="text-lg font-bold">
				{m.project_interventions_title()}
			</legend>
			<p class="opacity-softer text-sm">
				{m.project_interventions_description()}
			</p>
			{#if $form.typeId != null}
				{#await data.interventionsByCategories then awaitedInterventionsByCategories}
					{#each awaitedInterventionsByCategories as category, i (category.id)}
						{@const filtered = category.interventions.filter(
							(intervention) => $form.typeId && intervention.typeIds.includes($form.typeId)
						)}
						<fieldset class="gap-md flex flex-col">
							<legend class="text-md font-bold">{category.title}</legend>
							<ul class="gap-input-group-gap flex flex-row flex-wrap text-sm">
								{#if filtered.length}
									{#each filtered as intervention, i (`${category.id}-${intervention.id}`)}
										<label class="button button-dashed" use:ripple>
											<input
												type="checkbox"
												class="visually-hidden"
												bind:group={$form.interventionsIds}
												value={intervention.id}
											/>
											{intervention.title}
										</label>
									{/each}
								{:else}
									<span class="opacity-softer italic">{m.project_interventions_none()}</span>
								{/if}
							</ul>
						</fieldset>
					{/each}
				{/await}
			{:else}
				<p class="opacity-softer italic">{m.project_interventions_missing_type()}</p>
			{/if}
		</fieldset>

		<!-- Ownership -->
		<fieldset class="gap-md flex w-full max-w-md flex-col">
			<legend class="text-lg font-bold">
				{m.project_ownership_type()}
			</legend>
			<div class="gap-input-group-gap flex flex-row flex-wrap text-sm">
				{#await data.siteOwnerships then awaitedSiteOwnerships}
					{#each awaitedSiteOwnerships as ownership}
						<label class="button button-ghost rounded-full">
							<input type="radio" bind:group={$form.siteOwnershipId} value={ownership.id} />
							{ownership.title}
						</label>
					{/each}
				{/await}
			</div>
		</fieldset>
	</form>

	<!-- Cost -->
	<section class="gap-md flex w-full max-w-md flex-col">
		<h4 class="text-lg font-bold">{m.project_cost_title()}</h4>
	</section>
</DashboardSubSection>

<DashboardSectionMenu>
	<a href="/projects/{data.id}" class="button">
		<MonitorPlay />
		{m.explore()}
	</a>
	<button class="button button-cta" bind:this={submitRef} disabled={!isTainted($tainted)}>
		{m.save()}<IconSpinner icon={Check} busy={submitRef === $submitter} />
	</button>
</DashboardSectionMenu>
