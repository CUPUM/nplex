<script lang="ts">
	import Organizations from './organizations.svelte';
	import Projects from './projects.svelte';
	import Splash from './splash.svelte';

	let { data } = $props();
</script>

<Splash {data} />
<Projects {data} />
<Organizations {data} />
