<script lang="ts">
	import RenderMarkdown from '$components/RenderMarkdown.svelte';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<RenderMarkdown source={project.description} />

<style lang="scss">
</style>
