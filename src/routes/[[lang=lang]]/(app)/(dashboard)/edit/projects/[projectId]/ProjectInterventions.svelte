<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import LangKey from '$lib/components/LangKey.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import type { PageData } from './$types';

	export let form: SuperFormPageData<PageData['form']>['form'];
	export let categorizedInterventions: PageData['categorizedInterventions'];
</script>

<fieldset class="dashboard-subsection" style:grid-column="full">
	<legend class="dashboard-subsection-header">
		<h5 class="h5">
			<LangKey>
				{m.project_interventions_title()}
			</LangKey>
		</h5>
		<p class="dashboard-subsection-description">
			<LangKey>{m.project_interventions_description()}</LangKey>
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
						<small><LangKey>{m.project_interventions_none()}</LangKey></small>
					{/if}
				</section>
			{/each}
		{:else}
			<small><LangKey>{m.project_interventions_missing_type()}</LangKey></small>
		{/if}
	</div>
</fieldset>

<style lang="postcss">
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
		opacity: var(--opacity-dimmer);
	}
</style>
