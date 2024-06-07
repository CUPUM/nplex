<script lang="ts">
	import FrontpageOrganizations from './frontpage-organizations.svelte';
	import FrontpageProjects from './frontpage-projects.svelte';
	import FrontpageSplash from './frontpage-splash.svelte';

	let { data } = $props();
</script>

<FrontpageSplash {data} />
<FrontpageProjects {data} />
<FrontpageOrganizations {data} />
