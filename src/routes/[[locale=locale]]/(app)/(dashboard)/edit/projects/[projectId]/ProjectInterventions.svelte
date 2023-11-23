<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardFormSection, {
		DASHBOARD_CONTENT_ALIGN,
	} from '$lib/components/DashboardFormSection.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			interventions: 'Interventions du projet',
			selectType: 'Sélectionnez d’abord un type de projet',
			description:
				'Sélectionnez une ou plusieurs intervention réalisées dans le cadre du projet. Assurez-vous de lister uniquement les interventions prises en compte par les autres méta-données de la fiche (e.g.: la fourchette de prix, le calendrier des travaux, la galerie des images, etc.).',
		},
		en: {
			interventions: 'Project interventions',
			selectType: 'Start by selecting a project type',
			description:
				"Select one or more interventions completed in the scope of the project. Make sure to only list interventions accounted for across the rest of this sheet's metadata (ex.: cost range, project timeline, image gallery, etc.).",
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
	export let categorizedInterventions: PageData['categorizedInterventions'];

	console.log(categorizedInterventions);
</script>

<DashboardFormSection title={$t.interventions} align={DASHBOARD_CONTENT_ALIGN.FULL}>
	<svelte:fragment slot="description">{$t.description}</svelte:fragment>
	{#if $form.typeId != null}
		{#each categorizedInterventions as category, i (category.id)}
			{@const filtered = category.interventions.filter(
				// (it) => it.projectTypes && $form.typeId != null && it.projectTypes.includes($form.typeId)
				(it) => true
			)}
			<section>
				<h4 class="h6">{category.title}</h4>
				{#if filtered.length}
					<ul>
						{#each filtered as intervention, i (intervention.id)}
							<label class="chip" use:ripple>
								<input
									type="checkbox"
									class="visually-hidden"
									bind:group={$form.interventionIds}
									value={intervention.id}
								/>
								<span class="chip-label">
									{intervention.title}
								</span>
							</label>
						{/each}
					</ul>
				{:else}
					<small>No interventions found</small>
				{/if}
			</section>
		{/each}
	{:else}
		<small>{$t.selectType}</small>
	{/if}
</DashboardFormSection>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;
		background: color-mix(in srgb, var(--color-neutral-500) 5%, transparent);
		border-radius: var(--radius-md);
	}

	ul {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		gap: var(--base-gutter);
		flex-wrap: wrap;
	}

	small {
		opacity: var(--opacity-dimmer);
	}
</style>
