<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { FilePlus } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<a
	{...linkAttributes(`/create/project`)}
	rel="external"
	use:ripple
	in:fly|global={{ y: -6, easing: expoOut, duration: 350 }}
	class="group/button hover:border-base rounded-card border-base/softer relative flex h-full w-full items-center justify-center border border-dashed text-sm transition-all"
>
	<div class="button button-dashed rounded-full">
		<FilePlus />
		{m.project_create_new()}
	</div>
</a>
