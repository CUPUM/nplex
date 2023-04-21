<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { project } from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Sommmaire</h3>
	<div id="editor-summary-fields">
		<Field variant="default" name="title" bind:value={$project.title}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
		<TextArea name="summary" variant="default" bind:value={$project.summary} style="height: 150px;">
			<svelte:fragment slot="label">Résumé</svelte:fragment>
		</TextArea>
		<TextArea
			name="description"
			variant="default"
			placeholder="Décrivez votre projet plus en détail"
			bind:value={$project.description}
			style="height: 500px;"
		>
			<svelte:fragment slot="label">Description détaillée</svelte:fragment>
		</TextArea>
	</div>
</fieldset>

<style lang="scss">
	#editor-summary-fields {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: var(--ui-width-md);
	}
</style>
