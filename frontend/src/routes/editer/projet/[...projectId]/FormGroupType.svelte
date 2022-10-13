<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { ProjectEditorContext } from './+page.svelte';
	import FormGroup from './FormGroup.svelte';

	const { descriptors, formProject } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);
</script>

<FormGroup legend="Type">
	{#if $formProject.category_id}
		<ul transition:slide={{}}>
			{#each descriptors.types.filter((t) => t.categories_ids.includes($formProject.category_id)) as t}
				<li>
					<label>
						<input type="radio" bind:group={$formProject.type_id} name="type_id" value={t.id} required />
						{t.title}
					</label>
				</li>
			{/each}
		</ul>
	{:else}
		<div transition:slide={{}}>
			<p>Veuillez d'abord sélectionner une catégorie de projet</p>
		</div>
	{/if}
</FormGroup>

<style lang="scss">
</style>
