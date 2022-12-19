<script lang="ts">
	import type { PageData } from './$types';
	import HomeHeader from './HomeHeader.svelte';
	import ProjectsPreviews from './ProjectsPreviews.svelte';

	export let data: PageData;
</script>

<HomeHeader />
<ProjectsPreviews projects={data.projects} />

<style lang="scss" module>
</style>
