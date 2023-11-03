<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			interventions: 'Interventions',
		},
		en: {
			interventions: 'Interventions',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
	// export let categorizedInterventions: PageData['descriptors']
</script>

<DashboardFormSection>
	{#await data.descriptors.categorizedInterventions}
		<Loading />
	{:then categorizedInterventions}
		{#each categorizedInterventions as category, i (category.id)}
			<h4 class="prose sm dim">{category.title}</h4>
			<ul id="interventions">
				{#if category.interventions}
					{#each category.interventions as intervention}
						<label class="token" use:ripple>
							<input
								type="checkbox"
								class="token-input"
								bind:group={$form.interventionIds}
								value={intervention.id}
							/>
							<span class="token-label">
								{intervention.title}
							</span>
						</label>
					{/each}
				{/if}
			</ul>
		{/each}
	{/await}
</DashboardFormSection>

<style lang="postcss">
</style>
