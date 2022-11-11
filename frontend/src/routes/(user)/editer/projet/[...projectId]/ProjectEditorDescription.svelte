<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { PageData } from './$types';

	export let project: PageData['project'];
</script>

<section>
	<textarea
		name="description"
		id="project-description"
		placeholder="Description générale"
		value={project?.description ?? ''}
	/>
</section>

<style lang="scss">
</style>
