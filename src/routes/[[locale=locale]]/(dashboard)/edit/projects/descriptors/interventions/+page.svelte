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
			heading: ['Catégories d’intervention', 'types d’intervention'],
			category: {
				title: 'Titre de la catégorie',
				description: 'Description de la catégorie',
			},
			intervention: {
				title: 'Titre d’intervention',
				description: 'Description de l’intervention',
				none: 'Aucune intervention ajoutée',
			},
		},
		en: {
			heading: ['Intervention categories', 'intervention types'],
			category: {
				title: 'Category title',
				description: 'Category description',
			},
			intervention: {
				title: 'Intervention title',
				description: 'Intervention description',
				none: 'No interventions added yet',
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
		{#each $form.interventionCategories as category, i (category.id)}
			{@const filtered = $form.interventions.filter((pi) => pi.categoryId === category.id)}
			<li class="category">
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
								bind:value={$form.interventionCategories[i].translations[locale].title}
							/>
						</label>
						<label class="labeled-group">
							<span class="label with-hover">{$t.category.description}</span>
							<textarea
								class="input resize"
								rows="3"
								bind:value={$form.interventionCategories[i].translations[locale].description}
							/>
						</label>
					</TranslationsCard>
				</div>
				<DescriptorsCardsList sublist>
					{#if filtered.length}
						{#each filtered as intervention, ii (intervention.id)}
							<li
								class="intervention"
								animate:flip={{ duration: 150 }}
								in:fly|global={{ y: -6, delay: ii * 25, easing: expoOut, duration: 350 }}
								out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
							>
								<TranslationsCard
									let:locale
									legend={intervention.id}
									legendMinimized={intervention.translations[$page.data.locale].title}
									deleteFormaction="?/deleteIntervention&interventionId={intervention.id}"
								>
									<label class="labeled-group">
										<span class="label with-hover">{$t.intervention.title}</span>
										<input
											class="input"
											type="text"
											bind:value={$form.interventions[ii].translations[locale].title}
										/>
									</label>
									<label class="labeled-group">
										<span class="label with-hover">{$t.intervention.description}</span>
										<textarea
											class="input resize"
											rows="2"
											bind:value={$form.interventions[ii].translations[locale].description}
										/>
									</label>
								</TranslationsCard>
							</li>
						{/each}
					{:else}
						<p class="sm prose dimmer">{$t.intervention.none}</p>
					{/if}
				</DescriptorsCardsList>
				<menu class="intervention-menu">
					<button
						class="button ghost"
						type="submit"
						{...element(`?/createIntervention&categoryId=${category.id}`)}
					>
						<Plus class="button-icon" />
						Create intervention
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
		align-self: center;
		width: 100%;

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

	.intervention-menu {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
