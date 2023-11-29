<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import DashboardFormSection, {
		DASHBOARD_CONTENT_ALIGN,
	} from '$lib/components/DashboardFormSection.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import type { PageData } from './$types';

	export let form: SuperFormPageData<PageData['form']>['form'];
	export let categorizedInterventions: PageData['categorizedInterventions'];
</script>

<DashboardFormSection
	title={$langKey(m.project_interventions_title())}
	align={DASHBOARD_CONTENT_ALIGN.FULL}
>
	<svelte:fragment slot="description">
		<LangKey>{m.project_interventions_description()}</LangKey>
	</svelte:fragment>
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
		<small><LangKey>{m.project_interventions_missingType()}</LangKey></small>
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
