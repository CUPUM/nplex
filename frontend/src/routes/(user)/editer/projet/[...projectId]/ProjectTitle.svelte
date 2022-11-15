<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/Field.svelte';
	import type { PageData } from './$types';

	export let project: PageData['project'];
</script>

<section>
	<Field class="field" variant="outlined" type="text" name="title" id="project-title" value={project?.title ?? ''}>
		<svelte:fragment slot="label">Titre du projet</svelte:fragment>
	</Field>
</section>

<style lang="scss">
	section {
		position: relative;
		width: 100%;
	}

	section > :global(.field) {
		display: grid;
		font-size: var(--size-medium);
		width: 100%;
		max-width: var(--ui-large);
		margin: 0 auto;
	}
</style>
