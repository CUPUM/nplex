<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';
	import type { LocalProject, ProjectEditorContext } from './+page.svelte';

	export let legend: string = undefined;
	export let key: keyof LocalProject['formDirty'];

	const { localProject } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);

	// $: dirty = $localProject.formDirty.
</script>

<fieldset>
	<div class="banner">
		{#if legend}
			<legend>{legend}</legend>
		{/if}
		<menu>
			<Button variant="ghost" square>
				<Icon name="undo" size="1.25em" />
			</Button>
			<Button variant="ghost" square>
				<Icon name="save" size="1.25em" />
			</Button>
		</menu>
	</div>
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		position: relative;
		grid-column: main;
		margin: 0;
		border: none;
	}

	.banner {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
		justify-content: stretch;
		padding: 2rem 0;
		font-size: 1.5rem;
	}

	legend {
		margin: 0;
		padding: 0;
		flex: 1;
	}

	menu {
		display: flex;
		flex-direction: row;
		font-size: 0.9rem;
		justify-content: flex-end;
		flex: 1;
	}
</style>
