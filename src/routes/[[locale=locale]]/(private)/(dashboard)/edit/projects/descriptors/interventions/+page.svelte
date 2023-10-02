<script lang="ts">
	import { createLoading } from '$lib/actions/loading';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import TranslationsTabs from '$lib/components/TranslationsTabs.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, Pen, Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			heading: 'Catégories d’intervention & types d’intervention',
			category: {
				title: 'Titre de la catégorie',
				description: 'Description de la catégorie',
			},
			intervention: {
				title: 'Titre d’intervention',
				description: 'Description de l’intervention',
			},
		},
		en: {
			heading: 'Intervention categories & intervention types',
			category: {
				title: 'Category title',
				description: 'Category description',
			},
			intervention: {
				title: 'Intervention title',
				description: 'Intervention description',
			},
		},
	});

	export let data;

	const { form, submitting, constraints, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json',
	});

	const {
		action: updatingAction,
		element: updatingElement,
		state: updatingState,
	} = createLoading({ state: submitting });
</script>

<form method="POST" use:enhance>
	<header>
		<h2 class="heading lg">{$t.heading}</h2>
		<p class="prose sm dim">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eius enim error sit fugit
			dolores unde, nulla odio nam ducimus.
		</p>
	</header>
	<ol>
		{#each $form.interventionCategories as category, i (category.id)}
			<li class="category">
				<TranslationsTabs let:locale legend={category.id}>
					<label class="labeled-input">
						<span class="input-label">{$t.category.title}</span>
						<input
							class="input"
							type="text"
							bind:value={$form.interventionCategories[i].translations[locale].title}
						/>
					</label>
					<label class="labeled-input">
						<span class="input-label">{$t.category.description}</span>
						<textarea
							class="input"
							bind:value={$form.interventionCategories[i].translations[locale].description}
						/>
					</label>
				</TranslationsTabs>
				<ol>
					{#each $form.interventions.filter((pi) => pi.categoryId === category.id) as intervention, ii (intervention.id)}
						<li class="intervention" animate:flip>
							<TranslationsTabs
								let:locale
								legend={intervention.id}
								deleteFormaction="?/deleteIntervention&interventionId={intervention.id}"
							>
								<label class="labeled-input">
									<span class="input-label with-hover">{$t.intervention.title}</span>
									<input
										class="input"
										type="text"
										bind:value={$form.interventions[ii].translations[locale].title}
									/>
								</label>
								<label class="labeled-input">
									<span class="input-label with-hover">{$t.intervention.description}</span>
									<textarea
										class="input"
										bind:value={$form.interventions[ii].translations[locale].description}
									/>
								</label>
							</TranslationsTabs>
						</li>
					{/each}
				</ol>
				<menu class="intervention-menu">
					<button
						class="button outlined"
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
		<button class="button outlined" formaction="?/createCategory" type="submit" disabled>
			<Pen class="button-icon" />
			Create
		</button>
		{#if $tainted}
			<button class="button cta" in:fly={{ y: 6 }} type="submit" formaction="?/update">
				<Check class="button-icon" />
				Save
			</button>
		{/if}
	</DashboardMenu>
</form>

<style lang="scss">
	form {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
	}

	header {
		padding: 1rem 2rem;
		padding-top: 0;
	}

	ol {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		// padding: 1rem;
	}

	.category {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: var(--base-border-size) solid var(--color-neutral-200);
		border-radius: var(--radius-2xl);
		@include dark {
			border-color: transparent;
			background-color: var(--color-neutral-900);
		}

		ol {
			max-width: var(--width-md);
			margin: 1rem;
			padding: 1rem;
			border-left: var(--base-border-size) dashed
				color-mix(in srgb, var(--color-neutral-500) 25%, transparent);
		}
	}

	.intervention-menu {
		font-size: var(--size-sm);
	}
</style>
