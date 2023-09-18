<script lang="ts">
	import TranslationsTabs from '$lib/components/TranslationsTabs.svelte';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			save: 'Enregistrer',
			create: 'Ajouter un type de projet',
		},
		en: {
			save: 'Save',
			create: 'Create a new project type',
		},
	});

	export let data;

	console.log(data.types);

	// const {form, enhance, submitting, delayed, constraints} = superForm(data.form);
</script>

<form action="?/update">
	<ul>
		{#each data.types as type}
			<li>
				<TranslationsTabs let:locale>
					<svelte:fragment slot="legend">
						<code>
							id: {type.id}
						</code>
					</svelte:fragment>
					<div class="inner">
						<input class="input" type="text" name="{type.id}.{locale}.title" />
						<textarea class="input" />
					</div>
				</TranslationsTabs>
			</li>
		{/each}
	</ul>

	<button class="button outlined">{$t.save}</button>
	<button class="button ghost">{$t.create}</button>
</form>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
