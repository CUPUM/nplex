<script lang="ts">
	import { projectCardCrossfade } from '$lib/motion/presets';

	let { data } = $props();
</script>

<article
	in:projectCardCrossfade.receive|global={{ key: data.project.id }}
	class="bg-card p-card-padding relative"
>
	<header><h1>{data.project?.title}</h1></header>
</article>
