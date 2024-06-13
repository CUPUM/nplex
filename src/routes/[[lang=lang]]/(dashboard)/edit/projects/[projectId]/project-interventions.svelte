<script lang="ts">
	import * as m from '$i18n/messages';
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

<fieldset class="dashboard-section">
	<legend class="dashboard-section-title">
		{m.project_interventions_title()}
	</legend>
	<div class="dashboard-section-description">
		<p>
			{m.project_interventions_description()}
		</p>
	</div>
	<div class="dashboard-section-content">
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
						<h4 class="h6">{category.title}</h4>
						{#if filtered.length}
							<ul>
								{#each filtered as intervention, i (`${category.id}-${intervention.id}`)}
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
							<small>{m.project_interventions_none()}</small>
						{/if}
					</section>
				{/each}
			{/await}
		{:else}
			<small>{m.project_interventions_missing_type()}</small>
		{/if}
	</div>
</fieldset>
