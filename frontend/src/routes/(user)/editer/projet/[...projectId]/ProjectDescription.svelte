<script lang="ts" context="module">
</script>

<script lang="ts">
	import TextArea from '$components/TextArea.svelte';

	import type { PageData } from './$types';

	export let project: PageData['project'];
</script>

<section>
	<TextArea
		name="description"
		id="project-description"
		placeholder="Description générale"
		value={project?.description ?? ''}
	/>
</section>

<style lang="scss">
	section {
		width: 100%;
	}
</style>
