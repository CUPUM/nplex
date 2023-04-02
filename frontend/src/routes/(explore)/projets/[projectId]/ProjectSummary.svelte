<script lang="ts">
	import RenderMarkdown from '$components/RenderMarkdown.svelte';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<RenderMarkdown source={project.description} />
</section>

<style lang="scss">
	section {
		// width: 100%;
		// max-width: var(--ui-width-sm);
		align-self: center;
		line-height: 2em;
	}
</style>
