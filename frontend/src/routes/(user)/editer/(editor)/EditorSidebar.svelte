<script lang="ts" context="module">
	import type { ComponentType } from 'svelte';
	import { writable } from 'svelte/store';
	import type EditorSidebarDescriptors from './descripteurs/EditorSidebarDescriptors.svelte';
	import type EditorSidebarProject from './projet/[projectId]/EditorSidebarProject.svelte';

	export const editorSidebarContent = writable<
		ComponentType<EditorSidebarProject | EditorSidebarDescriptors> | undefined
	>(undefined);
</script>

<script lang="ts">
</script>

{#if $editorSidebarContent}
	<div>
		<nav>
			<svelte:component this={$editorSidebarContent} />
		</nav>
	</div>
{/if}

<style lang="scss">
	div {
		position: sticky;
		top: var(--ui-nav-h);
		overflow-y: auto;
		// overflow-x: hidden;
	}

	nav {
		padding: 1.5rem;
		position: relative;
		width: 200px;
		display: flex;
		flex-direction: column;
	}
</style>
