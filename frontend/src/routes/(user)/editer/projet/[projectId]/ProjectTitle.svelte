<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/Field.svelte';
	import type { PageData } from './$types';

	export let project: PageData['project'];
</script>

<section>
	<h2 class="e-h2">
		{#if project.id}
			<span>Modifiez votre projet</span>
		{:else}
			<span>Nouveau projet</span>
		{/if}
	</h2>
	<Field class="field" type="text" name="title" id="project-title" value={project?.title ?? ''}>
		<svelte:fragment slot="label">Titre du projet</svelte:fragment>
	</Field>
</section>

<style lang="scss" module>
	section {
		// position: sticky;
		// top: 0;
		position: relative;
		width: 100%;
		display: flex;
		padding: var(--ui-space-large) var(--ui-space-small);
		font-size: var(--ui-size-medium);
		background: col(bg, 100);
		border-radius: 1.5rem;
		margin-top: calc(-1 * var(--navbar-height-px));
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	section .field {
		width: 100%;
		max-width: var(--ui-display-medium);
		margin: 0 auto;
	}
</style>
