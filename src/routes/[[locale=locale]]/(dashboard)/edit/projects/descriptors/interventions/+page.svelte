<script lang="ts">
	import { page } from '$app/stores';
	import { createLoading } from '$lib/actions/loading';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
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

	const {
		action: updatingAction,
		state: updatingState,
		element: updatingElement,
	} = createLoading({
		state: submitting,
	});
</script>

<form method="POST" use:enhance>
	<header>
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
	</header>
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
				<ol class="interventions">
					{#if filtered.length}
						{#each filtered as intervention, ii (intervention.id)}
							<li
								class="intervention"
								animate:flip={{ duration: 150 }}
								transition:scale={{ start: 0.95, duration: 250, easing: expoOut }}
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
				</ol>
				<menu class="intervention-menu">
					<button
						class="button ghost"
						type="submit"
						formaction="?/createIntervention&categoryId={category.id}"
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
			formaction="?/createCategory"
			{...$updatingElement}
			use:updatingAction
			type="submit"
			disabled
		>
			<Pen class="button-icon" />
			Create
		</button>
		{#if $tainted}
			<button
				class="button cta"
				in:fly={{ y: 6 }}
				type="submit"
				{...$updatingElement}
				use:updatingAction
				formaction="?/update"
			>
				<Check class="button-icon" />
				Save
			</button>
		{/if}
	</DashboardMenu>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		container-type: inline-size;
		padding-bottom: 2rem;
	}

	header {
		padding: 1rem 2rem;
		padding-top: 0;
	}

	ol {
		position: relative;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
		max-width: var(--width-md);
		gap: 1rem;
		width: 100%;

		@container (width > 1000px) {
			align-self: center;
			margin-right: var(--dashboard-navbar);
		}
	}

	.category {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border-radius: var(--radius-xl);
		border: 5px solid var(--color-neutral-100);
		/* background-color: var(--color-neutral-100); */
		:global(:--dark) & {
			border-color: var(--color-neutral-900);
			/* background-color: var(--color-neutral-700); */
		}
	}

	.top {
		position: sticky;
		z-index: 1;
		top: var(--navbar-height);
	}

	.interventions {
		max-width: var(--width-md);
		margin: 1rem 0.5rem;
		padding-inline: 1rem;
		border-left: var(--base-border-size) dashed
			color-mix(in srgb, var(--color-neutral-500) 25%, transparent);
	}

	.intervention-menu {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
