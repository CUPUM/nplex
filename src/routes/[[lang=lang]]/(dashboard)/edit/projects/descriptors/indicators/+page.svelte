<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
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
					{m.project_exemplarity_indicators()} & {m.project_exemplarity_categories().toLowerCase()}
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
			newIndicatorForm={data.newIndicatorForm}
			indicatorForms={data.indicatorForms.filter((f) => f.data.categoryId === categoryForm.data.id)}
		/>
	{/each}
	<NewCategory data={data.newCategoryForm} />
</form>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
