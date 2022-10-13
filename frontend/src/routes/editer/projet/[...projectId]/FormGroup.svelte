<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';
	import type { ProjectEditorContext } from './+page.svelte';

	const { formProject, freshProject } = getContext<ProjectEditorContext>(Ctx.ProjectEditor);

	export let legend: string = undefined;
	export let reset: () => void = undefined;
	export let submit: () => void = undefined;
	export let col: 'main' | 'fullpad' | 'full' = 'main';
</script>

<fieldset style:grid-column={col}>
	{#if legend}
		<div>
			<legend>
				{legend}
			</legend>
			<!-- <menu>
				<Button square variant="ghost" on:click={reset}>
					<Icon name="undo" size="1.25em" />
				</Button>
				<Button square variant="ghost" on:click={submit}>
					<Icon name="save" size="1.25em" />
				</Button>
			</menu> -->
		</div>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		position: relative;
		margin: 0;
		padding: 0;
		border: none;

		div {
			width: 100%;
			display: flex;
			flex-direction: row;
			gap: 1em;
			align-items: center;
			justify-content: stretch;
			padding: 2rem 0;
			font-size: 1.5rem;
			max-width: 56ch;
			margin: 0 auto;
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
	}
</style>
