<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { Ctx } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import { getContext } from 'svelte';
	import type { ProjectEditorContext } from './+page.svelte';
	import FormGroup from './FormGroup.svelte';

	const { formProject, freshProject, trackDirty } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);
</script>

<FormGroup>
	<Field
		name="title"
		size={sizes.large}
		variant="outlined"
		bind:value={$formProject.title}
		on:input={(e) => trackDirty(e.target.value || null, 'title')}
	>
		<svelte:fragment slot="label">Nom du projet</svelte:fragment>
		<svelte:fragment slot="trailing">
			<Button square variant="ghost" disabled>
				<Icon name="undo" size="1.25em" />
			</Button>
			<Button square variant="ghost" disabled>
				<Icon name="save" size="1.25em" />
			</Button>
		</svelte:fragment>
	</Field>
</FormGroup>

<style lang="scss">
</style>
