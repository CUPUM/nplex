<script lang="ts">
	import { page } from '$app/stores';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import DescriptorsCardsList from '$lib/components/DescriptorsCardsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import { default as TranslationsCard } from '$lib/components/TranslationsCard.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, Pen, Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			heading: ['Catégories d’exemplarité', 'indicateurs d’exemplarité'],
			category: {
				title: 'Titre de la catégorie',
				description: 'Description de la catégorie',
			},
			indicator: {
				title: 'Titre d’indicateur',
				description: 'Description de l’indicateur',
				none: 'Aucun indicateur ajouté',
			},
		},
		en: {
			heading: ['Exemplarity categories', 'exemplarity indicators'],
			category: {
				title: 'Category title',
				description: 'Category description',
			},
			indicator: {
				title: 'Indicator title',
				description: 'Indicator description',
				none: 'No indicator added yet',
			},
		},
	});

	export let data;

	const { form, submitting, constraints, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json',
	});
</script>

<DescriptorsForm action="?/update" {enhance} let:element let:loading>
	<svelte:fragment slot="header">
		<h2 class="heading lg">
			{#each $t.heading as segment, i}
				{segment}
				{#if i < $t.heading.length - 1}
					<span class="prose dimmer">&</span>
					{' '}
				{/if}
			{/each}
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
						let:locale
						legend={category.id}
						legendMinimized={category.translations[$page.data.locale].title}
					>
						<label class="labeled-group">
							<span class="label with-hover">{$t.category.title}</span>
							<input
								class="input"
								type="text"
								bind:value={$form.exemplarityCategories[i].translations[locale].title}
							/>
						</label>
						<label class="labeled-group">
							<span class="label with-hover">{$t.category.description}</span>
							<textarea
								class="input resize"
								bind:value={$form.exemplarityCategories[i].translations[locale].description}
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
									let:locale
									legend={indicator.id}
									legendMinimized={indicator.translations[$page.data.locale].title}
									deleteFormaction="?/deleteIndicator&indicatorId={indicator.id}"
								>
									<label class="labeled-group">
										<span class="label with-hover">{$t.indicator.title}</span>
										<input
											class="input"
											type="text"
											bind:value={$form.exemplarityCategories[i].indicators[ii].translations[locale]
												.title}
										/>
									</label>
									<label class="labeled-group">
										<span class="label with-hover">{$t.indicator.description}</span>
										<textarea
											class="input resize"
											bind:value={$form.exemplarityCategories[i].indicators[ii].translations[locale]
												.description}
										/>
									</label>
								</TranslationsCard>
							</li>
						{/each}
					{:else}
						<p class="sm prose dimmer">{$t.indicator.none}</p>
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
	<DashboardMenu>
		<button
			class="button outlined"
			{...element('?/createCategory')}
			use:loading
			type="submit"
			disabled
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
	</DashboardMenu>
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
		top: var(--navbar-height);
	}

	.indicator-menu {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
