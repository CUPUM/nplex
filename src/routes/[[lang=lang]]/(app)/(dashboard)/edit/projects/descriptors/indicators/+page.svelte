<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorsCardsList from '$lib/components/DashboardDescriptorsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { default as TranslationsCard } from '$lib/components/TranslationsCard.svelte';
	import { Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, submitting, constraints, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json',
		jsonChunkSize: 100000,
	});
</script>

<DescriptorsForm action="?/update" {enhance}>
	<svelte:fragment slot="header">
		<h2 class="heading lg">
			<LangKey>
				{m.project_descriptors_examplarity_categories()}
				<span class="dim">&</span>
				{m.project_exemplarity_indicators()}
			</LangKey>
		</h2>
		<p class="prose sm dim">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eius enim error sit fugit
			dolores unde, nulla odio nam ducimus.
		</p>
	</svelte:fragment>
	<ol>
		{#each $form.exemplarityCategories as category, i (category.id)}
			<li class="category" in:fly|global={{ y: -6, delay: i * 25, easing: expoOut, duration: 350 }}>
				<div class="top">
					<TranslationsCard
						let:lang
						legend={category.id}
						legendMinimized={category.translations[$page.data.lang].title}
					>
						<label class="label-group">
							<span class="label with-hover">
								<LangKey>{m.project_descriptors_examplarity_category_title()}</LangKey>
							</span>
							<input
								class="input"
								type="text"
								bind:value={$form.exemplarityCategories[i].translations[lang].title}
							/>
						</label>
						<label class="label-group">
							<span class="label with-hover">
								<LangKey>{m.project_descriptors_examplarity_category_description()}</LangKey>
							</span>
							<textarea
								class="input resize"
								bind:value={$form.exemplarityCategories[i].translations[lang].description}
							/>
						</label>
					</TranslationsCard>
				</div>
				<DescriptorsCardsList sublist>
					{#if category.indicators.length}
						<!-- Stupid temporary workaround for https://github.com/sveltejs/svelte/issues/7209 -->
						{#each category.indicators as indicator, ii (indicator.id)}
							<li
								animate:flip={{ duration: 150 }}
								in:fly|global={{ y: -6, delay: ii * 25, easing: expoOut, duration: 350 }}
								out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
							>
								<TranslationsCard
									let:lang
									legend={indicator.id}
									legendMinimized={$form.exemplarityCategories[i].indicators[ii].translations[
										$page.data.lang
									].title}
									deleteFormaction="?/deleteIndicator&indicatorId={indicator.id}"
								>
									<label class="label-group">
										<span class="label with-hover">
											<LangKey>{m.project_descriptors_examplarityIndicatorTitle()}</LangKey>
										</span>
										<input
											class="input"
											type="text"
											bind:value={$form.exemplarityCategories[i].indicators[ii].translations[lang]
												.title}
										/>
									</label>
									<label class="label-group">
										<span class="label with-hover">
											<LangKey>{m.project_descriptors_examplarityIndicatorDescription()}</LangKey>
										</span>
										<textarea
											class="input resize"
											bind:value={$form.exemplarityCategories[i].indicators[ii].translations[lang]
												.description}
										/>
									</label>
								</TranslationsCard>
							</li>
						{/each}
					{:else}
						<p class="sm prose dimmer">
							<LangKey>{m.project_descriptors_noExamplarityIndicator()}</LangKey>
						</p>
					{/if}
				</DescriptorsCardsList>
				<menu class="indicator-menu">
					<button
						class="button ghost"
						type="submit"
						formaction="?/createIndicator&categoryId={category.id}"
					>
						<Plus class="button-icon" />
						Create indicator
					</button>
				</menu>
			</li>
		{/each}
	</ol>
	<!-- <DashboardMenu>
		<button
			class="button outlined"
			type="submit"
			{...element('?/createCategory')}
			disabled
			use:loading
		>
			<Pen class="button-icon" />
			Create
		</button>
		{#if $tainted}
			<button class="button cta" in:fly={{ y: 6 }} type="submit" {...element()} use:loading>
				<Check class="button-icon" />
				Save
			</button>
		{/if}
	</DashboardMenu> -->
</DescriptorsForm>

<style lang="postcss">
	ol {
		position: relative;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
		max-width: var(--width-md);
		gap: 1rem;
		width: 100%;
		align-self: center;

		@container (width > 1200px) {
			margin-right: var(--dashboard-navbar);
		}
	}

	.category {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border-radius: var(--radius-xl);
		border: 2px solid var(--color-neutral-100);
		:global(:--dark) & {
			border-color: var(--color-neutral-700);
		}
	}

	.top {
		position: sticky;
		z-index: 1;
		top: calc(var(--navbar-height) + 0.5rem);
	}

	.indicator-menu {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
