<script lang="ts">
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { Check } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, submitter, enhance, isTainted, tainted } = extendSuperForm(
		superForm(data.form, {
			dataType: 'json',
			invalidateAll: 'force',
		})
	);

	let submitRef = $state<HTMLButtonElement>();
</script>

<form
	use:enhance
	action="?/update"
	method="POST"
	class="gap-inherit flex flex-col"
	id="exemplarity-indicators"
>
	<header class="project-dashboard-section-header">
		<h2 class="dashboard-section-title">
			{m.project_exemplarity_indicators()}
		</h2>
		<p class="text-base-dim">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam facilis ipsum pariatur
			voluptas placeat veniam quod. Voluptates, pariatur nemo. Voluptas voluptates molestias
			molestiae quia at voluptate, doloribus neque quasi obcaecati inventore. Cum, sunt aliquam?
			Animi dicta debitis, atque laboriosam asperiores accusamus aut repellat ratione officia eaque
			dignissimos omnis rem.
		</p>
	</header>
	{#await data.indicatorsByCategories}
		...
	{:then awaitedIndicatorsByCategories}
		{#each awaitedIndicatorsByCategories as category, i (category.id)}
			<section class="dashboard-section">
				<legend class="dashboard-section-title">
					{category.title}
				</legend>
				<div class="dashboard-section-content">
					<ul class="gap-input-gutter flex flex-row flex-wrap items-start justify-start">
						{#if category.indicators}
							{#each category.indicators as indicator}
								<label
									class="has-checked:bg-primary has-checked:text-on-primary user-select-none active:animate-press bg-input px-input-padding h-input gap-input-gutter text-overflow-ellipsis relative flex cursor-pointer flex-row items-center whitespace-nowrap rounded-full font-semibold"
									use:ripple
								>
									<input
										type="checkbox"
										class="sr-only"
										bind:group={$form.indicatorsIds}
										value={indicator.id}
									/>
									<span class="chip-label">
										{indicator.title}
									</span>
								</label>
							{/each}
						{/if}
					</ul>
				</div>
			</section>
		{/each}
	{/await}
	<menu class="dashboard-section-menu" in:fly|global={{ y: 6, duration: 250, easing: expoOut }}>
		<button class="button button-cta" bind:this={submitRef} disabled={!isTainted($tainted)}>
			{m.save()}<IconSpinner icon={Check} busy={submitRef === $submitter} />
		</button>
	</menu>
</form>
