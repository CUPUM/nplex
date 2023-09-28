<script lang="ts">
	import TranslationsTabs from '$lib/components/TranslationsTabs.svelte';
	import { Check, Plus, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, submitting, constraints, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json',
	});
</script>

<form method="POST" use:enhance>
	<ol>
		{#each $form.interventionCategories as category, i (category.id)}
			<li class="category">
				<TranslationsTabs let:locale>
					<svelte:fragment slot="legend">
						{category.id}
					</svelte:fragment>
					<input
						class="input"
						type="text"
						bind:value={$form.interventionCategories[i].translations[locale].title}
					/>
					<textarea
						class="input"
						bind:value={$form.interventionCategories[i].translations[locale].description}
					/>
				</TranslationsTabs>
				<ol>
					{#each $form.interventions as intervention, ii (intervention.id)}
						{#if intervention.categoryId === category.id}
							<li class="intervention">
								<TranslationsTabs let:locale>
									<svelte:fragment slot="legend">
										<div contenteditable="true">
											{intervention.id}
										</div>
									</svelte:fragment>
									<svetle:fragment slot="menu">
										<button
											class="button ghost round danger"
											type="submit"
											formaction="?/deleteIntervention&interventionId={intervention.id}"
										>
											<X class="button-icon" />
										</button>
									</svetle:fragment>
									<input
										class="input"
										type="text"
										bind:value={$form.interventions[ii].translations[locale].title}
									/>
									<textarea
										class="input"
										bind:value={$form.interventions[ii].translations[locale].description}
									/>
								</TranslationsTabs>
							</li>
						{/if}
					{/each}
				</ol>
				<menu>
					<button
						class="button"
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
	<menu class="bottom-menu">
		{#if $tainted}
			<button class="button cta" in:fly={{ y: 6 }}>
				<Check class="button-icon" />
				Save
			</button>
		{/if}
	</menu>
</form>

<style lang="scss">
	form {
		padding: 1rem;
	}

	ol {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.category {
		padding: 1rem;
		border: var(--base-border-size) solid var(--color-neutral-100);
		@include dark {
			border: var(--base-border-size) solid var(--color-neutral-700);
		}
	}

	.interventions {
	}

	menu {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		gap: 0.5rem;
		font-size: var(--size-sm);
	}

	.bottom-menu {
		position: sticky;
		bottom: 2rem;
	}
</style>
