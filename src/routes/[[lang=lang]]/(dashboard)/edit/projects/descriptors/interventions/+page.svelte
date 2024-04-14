<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import Category from './Category.svelte';
	import NewCategory from './NewCategory.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: listSubmitter },
		},
	} = superForm(data.rootForm, {
		resetForm: true,
	});
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>
				<LangKey>
					{m.project_intervention_categories()} & {m
						.project_intervention_types()
						.toLocaleLowerCase()}
				</LangKey>
			</h2>
			<p class="dim">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
				consequatur amet blanditiis sed alias. Eum, numquam magnam!
			</p>
		</hgroup>
	</header>
	{#each data.categoryForms as categoryForm, i (categoryForm.id)}
		<Category
			{i}
			data={categoryForm}
			{listSubmitter}
			types={data.types}
			newInterventionForm={data.newInterventionForm}
			interventionForms={data.interventionForms.filter(
				(f) => f.data.categoryId === categoryForm.data.id
			)}
		/>
	{/each}
	<NewCategory data={data.newCategoryForm} />
</form>

<style>
	@import '$styles/scoped/dashboard';
</style>
