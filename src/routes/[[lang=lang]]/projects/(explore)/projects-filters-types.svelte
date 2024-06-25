<script lang="ts">
	import * as m from '$i18n/messages';
	import Field from '$lib/components/primitives/field.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';
	let {
		form,
		constraints,
		submitter,
		tainted,
		isTainted,
		projectTypes,
	}: ExtendedSuperFormData<PageData['filtersForm']> & { projectTypes: PageData['projectTypes'] } =
		$props();
</script>

<Field>
	{#snippet label()}
		{m.project_types()}
	{/snippet}
	<fieldset class="gap-menu-gutter flex flex-col items-start">
		{#await projectTypes}
			...
		{:then awaitedProjectTypes}
			{#each awaitedProjectTypes as type}
				<label class="button button-dashed compact rounded-full">
					{type.title}
					<input type="checkbox" class="sr-only" value={type.id} bind:group={$form.projectTypes} />
				</label>
			{/each}
		{/await}
	</fieldset>
</Field>
