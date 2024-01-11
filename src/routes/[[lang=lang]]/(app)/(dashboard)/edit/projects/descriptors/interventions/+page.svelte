<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import Category from './Category.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: listSubmitter },
		},
	} = superForm(data.rootForm, {
		dataType: 'json',
	});
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>
				<LangKey>
					{m.project_descriptors_intervention_categories()} & {m.project_descriptors_intervention_types()}
				</LangKey>
			</h2>
			<p class="dim">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
				consequatur amet blanditiis sed alias. Eum, numquam magnam!
			</p>
		</hgroup>
	</header>
	{#each data.categoryForms as category}
		<Category
			{category}
			{listSubmitter}
			newInterventionForm={data.newInterventionForm}
			interventionForms={data.interventionForms.filter(
				(f) => f.data.categoryId === category.data.id
			)}
		/>
	{/each}
	<!-- <NewCategory data={data.newCategoryForm} /> -->
</form>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
