<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/patterns/sidebar-group.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let {
		form,
		constraints,
		submitter,
		tainted,
		isTainted,
		lists,
	}: ExtendedSuperFormData<PageData['filtersForm']> & Pick<PageData, 'lists'> = $props();
</script>

{#await lists.interventionsByCategories then awaitedProjectInterventionsByCategories}
	<SidebarGroup>
		{#snippet legend()}
			{m.project_interventions()}
		{/snippet}
		<ul class="gap-card-padding flex flex-col">
			{#each awaitedProjectInterventionsByCategories as category}
				<li class="flex flex-col gap-[0.5em]">
					<div class="opacity-softer px-[0.5em] text-xs font-semibold">
						{category.title}
					</div>
					<ul class="gap-input-group-gap compact flex flex-row flex-wrap items-start">
						{#each category.interventions as intervention}
							<label
								class="button button-dashed max-w-full flex-none justify-start rounded-full"
								use:ripple
							>
								<span class="truncate">
									{intervention.title}
								</span>
								<input
									type="checkbox"
									class="sr-only"
									name="interventions"
									value={intervention.id}
									bind:group={$form.interventions}
								/>
							</label>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</SidebarGroup>
{/await}
