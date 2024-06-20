<script lang="ts">
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { Image } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { project }: { project: PageData['result'][number] } = $props();
</script>

<article class="group/card bg-card rounded-card absolute inset-0">
	<!-- <img class="fill object-cover" src="https://picsum.photos/seed/{project.id}/500/500" /> -->
	{#if project.bannerStorageName}
		<img class="fill" src="https://picsum.photos/seed/{project.id}/200/300" />
	{:else}
		<div class="fill opacity-dimmer flex items-center justify-center">
			<Image class="size-[2em] stroke-width-[1]" />
		</div>
	{/if}
	<div class="p-card-padding relative z-1 flex">
		{project.id}
	</div>
	<!-- svelte-ignore a11y_missing_content -->
	<a class="fill" use:ripple {...linkAttributes(`/projects/${project.id}`)}></a>
</article>
