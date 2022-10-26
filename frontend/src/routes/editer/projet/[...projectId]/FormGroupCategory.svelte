<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { getContext } from 'svelte';
	import type { ProjectEditorContext } from './+page.svelte';
	import FormGroup from './FormGroup.svelte';

	const { descriptors, formProject } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);

	const key = 'category_id';
</script>

<FormGroup {key} legend="Catégorie">
	<ul>
		{#each descriptors.categories as c}
			<li>
				<label>
					<input type="radio" bind:group={$formProject[key]} name={key} value={c.id} required />
					{c.title}
				</label>
			</li>
		{/each}
	</ul>
</FormGroup>

<style lang="scss">
</style>
