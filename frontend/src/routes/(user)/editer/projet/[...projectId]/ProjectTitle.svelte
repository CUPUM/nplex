<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/Field.svelte';
	import type { PageData } from './$types';

	export let project: PageData['project'];
</script>

<fieldset>
	<Field class="field" variant="outlined" type="text" name="title" id="project-title" value={project?.title ?? ''}>
		<svelte:fragment slot="label">Titre du projet</svelte:fragment>
	</Field>
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;
		width: 100%;
	}

	fieldset > :global(.field) {
		width: 100%;
		max-width: var(--ui-medium);
		margin: 0 auto;
	}
</style>
