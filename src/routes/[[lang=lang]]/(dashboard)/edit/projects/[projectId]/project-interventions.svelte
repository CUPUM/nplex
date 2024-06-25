<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let {
		interventionsByCategories,
		form,
	}: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'interventionsByCategories'> =
		$props();
</script>

<DashboardSubSection>
	{#snippet header()}
		<h4>
			{m.project_interventions_title()}
		</h4>
		<p>
			{m.project_interventions_description()}
		</p>
	{/snippet}
	{#if $form.typeId != null}
		{#await interventionsByCategories}
			<div>
				<Spinner />
			</div>
		{:then awaitedInterventionsByCategories}
			{#each awaitedInterventionsByCategories as category, i (category.id)}
				{@const filtered = category.interventions.filter(
					(intervention) => $form.typeId && intervention.typeIds.includes($form.typeId)
				)}
				<section>
					<h4>{category.title}</h4>
					{#if filtered.length}
						<ul>
							{#each filtered as intervention, i (`${category.id}-${intervention.id}`)}
								<label class="button button-dashed" use:ripple>
									<input
										type="checkbox"
										class="visually-hidden"
										bind:group={$form.interventionIds}
										value={intervention.id}
									/>
									{intervention.title}
								</label>
							{/each}
						</ul>
					{:else}
						<small>{m.project_interventions_none()}</small>
					{/if}
				</section>
			{/each}
		{/await}
	{:else}
		<p class="opacity-dim italic">{m.project_interventions_missing_type()}</p>
	{/if}
</DashboardSubSection>
