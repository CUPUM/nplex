<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { SuperFormData } from '$lib/crud/validation/forms/types';
	import type { PageData } from './$types';

	export let form: SuperFormData<PageData['form']>['form'];
	export let categorizedInterventions: PageData['categorizedInterventions'];
</script>

<fieldset class="dashboard-subsection" style:grid-column="full">
	<legend class="dashboard-subsection-header">
		<h5 class="h5">
			{m.project_interventions_title()}
		</h5>
		<p class="dashboard-subsection-description">
			{m.project_interventions_description()}
		</p>
	</legend>
	<div class="dashboard-subsection-content-full">
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
		{:else}
			<small>{m.project_interventions_missing_type()}</small>
		{/if}
	</div>
</fieldset>

<style>
	@import '$styles/scoped/dashboard';

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
		opacity: var(--opacity-muted);
	}
</style>
