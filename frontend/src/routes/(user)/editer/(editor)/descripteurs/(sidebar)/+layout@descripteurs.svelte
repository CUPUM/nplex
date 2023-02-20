<script lang="ts">
	import { onDestroy } from 'svelte';
	import { editorSidebarContent } from '../../EditorSidebar.svelte';
	import EditorSidebarDescriptors from '../EditorSidebarDescriptors.svelte';

	editorSidebarContent.set(EditorSidebarDescriptors);

	onDestroy(() => {
		editorSidebarContent.set(undefined);
	});
</script>

<slot />

<style lang="scss">
</style>
