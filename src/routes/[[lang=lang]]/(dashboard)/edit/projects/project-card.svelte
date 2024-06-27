<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { PageData } from './$types';

	let { project }: { project: PageData['results'][number] } = $props();
</script>

<a
	{...linkAttributes(`/edit/projects/${project.id}`)}
	use:ripple
	class="p-card-padding bg-card rounded-card relative flex aspect-square cursor-pointer flex-col"
>
	<div class="font-semibold">
		<OptionalText text={project.title} fallback={m.project_untitled()} />
	</div>
	{project.id}
</a>
