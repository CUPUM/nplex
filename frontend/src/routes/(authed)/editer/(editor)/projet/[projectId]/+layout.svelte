<script lang="ts">
	import { descriptors, projectData } from './common';

	export let data;

	$: $descriptors = data.descriptors;

	function syncProjectData() {
		projectData.set(JSON.parse(JSON.stringify(data.project)));
	}
	syncProjectData();
	$: data, syncProjectData();
</script>

<slot />

<style lang="scss">
</style>
