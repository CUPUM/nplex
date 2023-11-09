<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardFormField from '$lib/components/DashboardFormField.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			interventions: 'Interventions du projet',
		},
		en: {
			interventions: 'Project interventions',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
	export let categorizedInterventions: PageData['categorizedInterventions'];
</script>

<DashboardFormField title={$t.interventions}>
	{#each categorizedInterventions as category, i (category.id)}
		<h4 class="prose sm dim">{category.title}</h4>
		<ul id="interventions">
			<!-- {@const typeInterventions = category.interventions.filter(pi => pi.projectTypes && pi.projectTypes.includes($form.typeId))} -->
			{#each category.interventions as intervention}
				<label class="chip" use:ripple>
					<input
						type="checkbox"
						class="chip-input"
						bind:group={$form.interventionIds}
						value={intervention.id}
					/>
					<span class="chip-label">
						{intervention.title}
					</span>
				</label>
			{/each}
		</ul>
	{/each}
</DashboardFormField>

<style lang="postcss">
</style>
