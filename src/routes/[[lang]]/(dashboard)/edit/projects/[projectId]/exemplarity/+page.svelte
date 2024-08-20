<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSectionMenu from '$lib/components/patterns/dashboard-section-menu.svelte';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Check } from 'lucide-svelte';

	let { data } = $props();

	const { form, submitter, enhance, isTainted, tainted } = extendedSuperForm(data.form, {
		dataType: 'json',
		invalidateAll: 'force',
	});

	let submitRef = $state<HTMLButtonElement>();
</script>

<form
	use:enhance
	action="?/update"
	method="POST"
	class="gap-inherit flex flex-col"
	id="exemplarity-markers"
>
	<DashboardSubHeader>
		<h3>
			{m.project_exemplarity_markers()}
		</h3>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam facilis ipsum pariatur
			voluptas placeat veniam quod. Voluptates, pariatur nemo. Voluptas voluptates molestias
			molestiae quia at voluptate, doloribus neque quasi obcaecati inventore. Cum, sunt aliquam?
			Animi dicta debitis, atque laboriosam asperiores accusamus aut repellat ratione officia eaque
			dignissimos omnis rem.
		</p>
	</DashboardSubHeader>
	<DashboardSubSection>
		<ul class="gap-lg flex flex-col">
			{#await data.markersByCategories then awaitedMarkersByCategories}
				{#each awaitedMarkersByCategories as category, i (category.id)}
					<fieldset class="flex flex-col">
						<legend class="text-lg font-bold">
							{category.title}
						</legend>
						<p class="opacity-softer text-sm">
							<OptionalText text={category.description} fallback={m.no_description()} />
						</p>
						<ul class="gap-input-group-gap pt-md flex flex-row flex-wrap items-start text-xs">
							{#if category.markers}
								{#each category.markers as marker}
									<label class="button button-dashed rounded-full" use:ripple>
										<input
											type="checkbox"
											class="sr-only"
											bind:group={$form.markersIds}
											value={marker.id}
										/>
										<OptionalText text={marker.title} fallback={m.not_defined()} />
									</label>
								{/each}
							{/if}
						</ul>
					</fieldset>
				{/each}
			{/await}
		</ul>
	</DashboardSubSection>
	<DashboardSectionMenu>
		<button class="button button-cta" bind:this={submitRef} disabled={!isTainted($tainted)}>
			{m.save()}<IconSpinner icon={Check} busy={submitRef === $submitter} />
		</button>
	</DashboardSectionMenu>
</form>
