<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { projectCardCrossfade } from '$lib/motion/presets';

	let { data } = $props();
</script>

<article
	class="bg-card p-card-padding relative"
	in:projectCardCrossfade.receive|global={{ key: data.project.id }}
>
	<header>
		<h1>
			<OptionalText text={data.project.title} fallback={m.project_untitled()} />
		</h1>
	</header>
</article>
